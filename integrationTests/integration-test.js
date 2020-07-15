// @noflow

const os = require('os');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const { describe, it } = require('mocha');

function exec(command, options = {}) {
  return childProcess.execSync(command, {
    stdio: 'inherit',
    ...options,
  });
}

describe('Integration Tests', () => {
  const tmpDir = path.join(os.tmpdir(), 'graphql-relay-integrationTmp');
  fs.rmdirSync(tmpDir, { recursive: true });
  fs.mkdirSync(tmpDir);

  const distDir = path.resolve('./dist');
  exec(`npm pack ${distDir} && cp graphql-relay-*.tgz graphql-relay.tgz`, {
    cwd: tmpDir,
  });

  it('Should compile with all supported TS versions', () => {
    exec(`cp -R ${path.join(__dirname, 'ts')} ${tmpDir}`);

    const cwd = path.join(tmpDir, 'ts');
    exec('npm install', { cwd });
    exec('npm test', { cwd });
  }).timeout(40000);
});
