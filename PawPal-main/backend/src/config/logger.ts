import { env } from './env';

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

function formatEntry(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
  return {
    level,
    message,
    timestamp: new Date().toISOString(),
    ...meta,
  };
}

function output(entry: LogEntry): void {
  if (env.isProduction) {
    // Structured JSON for log aggregators
    process.stdout.write(JSON.stringify(entry) + '\n');
  } else {
    const colors: Record<LogLevel, string> = {
      info:  '\x1b[36m',  // cyan
      warn:  '\x1b[33m',  // yellow
      error: '\x1b[31m',  // red
      debug: '\x1b[35m',  // magenta
    };
    const reset = '\x1b[0m';
    const color = colors[entry.level];
    const meta = Object.keys(entry).filter(k => !['level','message','timestamp'].includes(k));
    const metaStr = meta.length ? ' ' + JSON.stringify(Object.fromEntries(meta.map(k => [k, entry[k]]))) : '';
    console.log(`${color}[${entry.timestamp}] ${entry.level.toUpperCase()} ${entry.message}${metaStr}${reset}`);
  }
}

export const logger = {
  info:  (message: string, meta?: Record<string, unknown>) => output(formatEntry('info',  message, meta)),
  warn:  (message: string, meta?: Record<string, unknown>) => output(formatEntry('warn',  message, meta)),
  error: (message: string, meta?: Record<string, unknown>) => output(formatEntry('error', message, meta)),
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (!env.isProduction) output(formatEntry('debug', message, meta));
  },
};
