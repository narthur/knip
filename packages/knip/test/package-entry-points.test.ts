import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { main } from '../src/index.js';
import { join, resolve } from '../src/util/path.js';
import baseArguments from './helpers/baseArguments.js';
import baseCounters from './helpers/baseCounters.js';

const cwd = resolve('fixtures/package-entry-points');

test('Resolve package entry points to files', async () => {
  const { issues, counters } = await main({
    ...baseArguments,
    cwd,
  });

  assert(issues.exports['feature/internal/system/used.ts'].unused);
  assert(issues.files.has(join(cwd, 'feature/internal/system/unused.ts')));

  assert.deepEqual(counters, {
    ...baseCounters,
    exports: 1,
    files: 1,
    processed: 8,
    total: 8,
  });
});
