/**
 * HTTP Integration Test Suite
 * Tests live Express HTTP endpoints over network socket
 */
import { createApp } from '../../src/app';
import { seedDatabase } from '../../src/config/database';
import http from 'http';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string) {
  if (condition) {
    console.log(`  \x1b[32m✔ PASS\x1b[0m: ${testName}`);
    passed++;
  } else {
    console.error(`  \x1b[31m✘ FAIL\x1b[0m: ${testName}`);
    failed++;
  }
}

async function runHttpTests() {
  console.log('\n========================================');
  console.log('  HTTP API INTEGRATION TEST SUITE');
  console.log('========================================\n');

  await seedDatabase();
  const app = createApp();

  const server = http.createServer(app);
  await new Promise<void>((res) => server.listen(0, res));
  const address = server.address() as { port: number };
  const baseUrl = `http://127.0.0.1:${address.port}/api/v1`;

  try {
    // 1. Health Check
    console.log('\x1b[36m[1/6] GET /health\x1b[0m');
    const healthRes = await fetch(`${baseUrl}/health`);
    const healthJson = await healthRes.json();
    assert(healthRes.status === 200 && healthJson.data.status === 'healthy', 'Health check returns 200 healthy');

    // 2. Auth Login Endpoint
    console.log('\n\x1b[36m[2/6] POST /auth/login\x1b[0m');
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrPhone: 'parent@zooby.demo', password: 'parent123' })
    });
    const loginJson = await loginRes.json();
    assert(loginRes.status === 200 && loginJson.success === true, 'Parent login returns 200 success');
    const parentToken = loginJson.data.accessToken;
    assert(typeof parentToken === 'string', 'Received valid JWT access token');

    // 3. Admin Login & Authorization
    console.log('\n\x1b[36m[3/6] POST /auth/demo-login & Role Guard\x1b[0m');
    const adminLoginRes = await fetch(`${baseUrl}/auth/demo-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'ADMIN' })
    });
    const adminJson = await adminLoginRes.json();
    const adminToken = adminJson.data.accessToken;

    // Try accessing admin route with parent token (should fail with 403)
    const forbiddenRes = await fetch(`${baseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${parentToken}` }
    });
    assert(forbiddenRes.status === 403, 'Access denied (403) when non-admin accesses /admin/users');

    // Access admin route with admin token (should succeed with 200)
    const adminUsersRes = await fetch(`${baseUrl}/admin/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert(adminUsersRes.status === 200, 'Admin accesses /admin/users successfully with 200');

    // 4. Pet CRUD Endpoints
    console.log('\n\x1b[36m[4/6] GET & POST /pets\x1b[0m');
    const petsRes = await fetch(`${baseUrl}/pets`, {
      headers: { Authorization: `Bearer ${parentToken}` }
    });
    const petsJson = await petsRes.json();
    assert(petsRes.status === 200 && Array.isArray(petsJson.data), 'Retrieved user pets list');

    const createPetRes = await fetch(`${baseUrl}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parentToken}`
      },
      body: JSON.stringify({
        name: 'Rocky',
        species: 'Dog',
        breed: 'German Shepherd',
        age: '2 Years',
        weight: '28 kg'
      })
    });
    assert(createPetRes.status === 201, 'Created pet via POST /pets returns 201 Created');

    // 5. Providers Search & Filter
    console.log('\n\x1b[36m[5/6] GET /providers with query parameters\x1b[0m');
    const provRes = await fetch(`${baseUrl}/providers?category=grooming`);
    const provJson = await provRes.json();
    assert(provRes.status === 200 && provJson.data.length > 0, 'Filtered providers by category returns 200');

    // 6. Validation Error Checks
    console.log('\n\x1b[36m[6/6] Validation & Error Handling (400 / 404)\x1b[0m');
    const badPetRes = await fetch(`${baseUrl}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${parentToken}`
      },
      body: JSON.stringify({}) // empty payload
    });
    const badPetJson = await badPetRes.json();
    assert(badPetRes.status === 400 && badPetJson.code === 'BAD_REQUEST', 'Missing fields rejected with 400 Bad Request');
    assert(Array.isArray(badPetJson.errors) && badPetJson.errors.length > 0, 'Detailed validation errors list returned');

    const notFoundRes = await fetch(`${baseUrl}/non-existent-endpoint`);
    assert(notFoundRes.status === 404, 'Unknown endpoint returns 404 Not Found');

  } finally {
    server.close();
  }

  console.log('\n========================================');
  console.log(`  HTTP RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runHttpTests().catch((e) => {
  console.error('HTTP Test runner error:', e);
  process.exit(1);
});
