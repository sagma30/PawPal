/**
 * Zooby Automated Backend Test Suite
 * Tests Auth, Pets, Bookings, Health Events, Admin, Validation, and Security Rules.
 */
import { createApp } from '../src/app';
import { seedDatabase } from '../src/config/database';
import { authService } from '../src/services/auth.service';
import { petService } from '../src/services/pet.service';
import { bookingService } from '../src/services/booking.service';
import { adminService } from '../src/services/admin.service';
import { aiService } from '../src/services/ai.service';
import { userRepository } from '../src/repositories/user.repository';
import { petRepository } from '../src/repositories/pet.repository';
import { bookingRepository } from '../src/repositories/booking.repository';
import { ROLES } from '../src/constants/roles';

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

async function runTests() {
  console.log('\n========================================');
  console.log('  ZOOBY BACKEND AUTOMATED TEST SUITE');
  console.log('========================================\n');

  // Initialize DB
  await seedDatabase();

  // 1. Auth Tests
  console.log('\x1b[36m[1/7] Testing Authentication & Tokens\x1b[0m');
  try {
    const parentLogin = await authService.login('parent@zooby.demo', 'parent123');
    assert(parentLogin.user.role === 'PET_PARENT', 'Demo parent login succeeds with correct role');
    assert(typeof parentLogin.accessToken === 'string' && parentLogin.accessToken.length > 20, 'JWT token issued');

    const demoAdmin = await authService.demoLogin('ADMIN');
    assert(demoAdmin.user.role === 'ADMIN', 'Demo admin login succeeds');

    const googleAuth = await authService.googleAuth({ name: 'Test Google User', email: 'google.test@zooby.app' });
    assert(googleAuth.user.email === 'google.test@zooby.app', 'Google OAuth user creation succeeds');

    const signup = await authService.signup({
      name: 'Dr. New Provider',
      email: 'new.provider@zooby.app',
      role: 'PROVIDER',
      businessName: 'New Vet Clinic',
      serviceCategory: 'vet_consult'
    });
    assert(signup.user.role === 'PROVIDER' && signup.user.isVerified === false, 'New provider starts as unverified (BR-002)');
  } catch (err: any) {
    assert(false, `Auth suite threw error: ${err.message}`);
  }

  // 2. Pet Service Tests
  console.log('\n\x1b[36m[2/7] Testing Pet CRUD & Ownership Isolation (BR-004)\x1b[0m');
  try {
    const pets = await petService.getPetsForUser('usr-parent-demo', 'PET_PARENT');
    assert(pets.length >= 3, 'Found seeded pets for demo user');

    const newPet = await petService.createPet('usr-parent-demo', {
      name: 'Milo',
      species: 'Dog',
      breed: 'Beagle',
      age: '1 Year',
      weight: '10 kg'
    });
    assert(newPet.id.startsWith('pet-') && newPet.name === 'Milo', 'Pet created successfully');

    const updated = await petService.updatePet(newPet.id, 'usr-parent-demo', 'PET_PARENT', {
      weight: '11 kg'
    });
    assert(updated.weight === '11 kg', 'Pet updated successfully');

    // Ownership check: user B should not access user A's pet
    let blocked = false;
    try {
      await petService.updatePet(newPet.id, 'usr-parent-vikram', 'PET_PARENT', { name: 'Hacked' });
    } catch (e: any) {
      blocked = e.statusCode === 403;
    }
    assert(blocked, 'Prevented unauthorized user from updating another user pet (BR-004)');
  } catch (err: any) {
    assert(false, `Pet suite threw error: ${err.message}`);
  }

  // 3. Booking Lifecycle Tests (BR-005)
  console.log('\n\x1b[36m[3/7] Testing Booking State Machine & References (BR-005)\x1b[0m');
  try {
    const newBooking = await bookingService.createBooking('usr-parent-demo', {
      petId: 'pet-bruno',
      providerId: 'prov-1',
      serviceCategory: 'grooming',
      serviceTitle: 'Spa Grooming',
      date: 'Tomorrow, 2:00 PM',
      timeSlot: '02:00 PM',
      price: 1299
    });
    assert(newBooking.bookingRef.startsWith('PW-'), 'Booking ref follows PW-XXXXXX format');
    assert(newBooking.status === 'Confirmed', 'New booking starts as Confirmed');

    const completed = await bookingService.updateBookingStatus(
      newBooking.id,
      'Completed',
      'usr-parent-demo',
      'PET_PARENT'
    );
    assert(completed.status === 'Completed', 'Booking transitioned to Completed');

    // Terminal state protection: cannot cancel completed booking
    let terminalBlocked = false;
    try {
      await bookingService.updateBookingStatus(
        newBooking.id,
        'Cancelled',
        'usr-parent-demo',
        'PET_PARENT'
      );
    } catch (e: any) {
      terminalBlocked = e.statusCode === 422;
    }
    assert(terminalBlocked, 'Terminal state protection enforced: completed booking cannot transition');
  } catch (err: any) {
    assert(false, `Booking suite threw error: ${err.message}`);
  }

  // 4. Admin Governance Tests (BR-001, BR-003)
  console.log('\n\x1b[36m[4/7] Testing Admin Oversight & Account Suspension (BR-003)\x1b[0m');
  try {
    const allUsers = await adminService.getAllUsers();
    assert(allUsers.length >= 4, 'Admin retrieved all platform users');

    const suspended = await adminService.updateUserStatus('usr-parent-demo', 'Suspended');
    assert(suspended.status === 'Suspended', 'Admin successfully suspended user account');

    // Verify suspended user cannot login or do sensitive actions
    let suspendedBlocked = false;
    try {
      await authService.login('parent@zooby.demo', 'parent123');
    } catch (e: any) {
      suspendedBlocked = e.statusCode === 403;
    }
    assert(suspendedBlocked, 'Suspended account prevented from logging in (BR-003)');

    // Restore account
    await adminService.updateUserStatus('usr-parent-demo', 'Active');
    const restored = await authService.login('parent@zooby.demo', 'parent123');
    assert(restored.user.status === 'Active', 'Restored account logs in normally');
  } catch (err: any) {
    assert(false, `Admin suite threw error: ${err.message}`);
  }

  // 5. Provider Verification Workflow Tests (REQ-009)
  console.log('\n\x1b[36m[5/7] Testing Provider Verification Workflow (REQ-009)\x1b[0m');
  try {
    const verifs = await adminService.getVerifications();
    assert(verifs.length > 0, 'Found provider verification items');

    const reviewed = await adminService.reviewVerification('v-1', 'Approved', 'Credentials checked');
    assert(reviewed.status === 'Approved' && reviewed.reviewNotes === 'Credentials checked', 'Verification approved');
  } catch (err: any) {
    assert(false, `Verification suite threw error: ${err.message}`);
  }

  // 6. Platform Analytics Telemetry Tests (REQ-010)
  console.log('\n\x1b[36m[6/7] Testing Analytics Telemetry (REQ-010)\x1b[0m');
  try {
    const analytics = await adminService.getPlatformAnalytics();
    assert(analytics.overview.totalUsers > 0, 'Analytics totalUsers aggregated');
    assert(analytics.overview.totalRevenue > 0, 'Analytics revenue aggregated');
    assert(Array.isArray(analytics.monthlyRevenue), 'Monthly revenue chart array present');
  } catch (err: any) {
    assert(false, `Analytics suite threw error: ${err.message}`);
  }

  // 7. Server-Side AI Care Advisor Tests (REQ-011)
  console.log('\n\x1b[36m[7/7] Testing Server-Side AI Pet Care Advisor (REQ-011)\x1b[0m');
  try {
    const aiConsult = await aiService.consult('My Golden Retriever has an itchy ear.', {
      species: 'Dog',
      breed: 'Golden Retriever',
      age: '3 Years'
    });
    assert(typeof aiConsult.advice === 'string' && aiConsult.advice.length > 20, 'AI generated advice');
    assert(aiConsult.urgency === 'Low' || aiConsult.urgency === 'Medium', 'AI categorized urgency');
    assert(typeof aiConsult.recommendedAction === 'string', 'AI recommended action provided');
  } catch (err: any) {
    assert(false, `AI suite threw error: ${err.message}`);
  }

  console.log('\n========================================');
  console.log(`  RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((e) => {
  console.error('Test runner encountered fatal error:', e);
  process.exit(1);
});
