/* eslint-disable */
// adapted based on rackt/history (MIT)
// Node 0.10+
var execSync = require('child_process').execSync;
var stat = require('fs').stat;

// Node 0.10 check
if (!execSync) {
  execSync = require('sync-exec');
}

function exec(command) {
  execSync(command, {
    stdio: [0, 1, 2]
  });
}

stat('node_modules/lerna', function(error, stat) {
  // Skip building on Travis
  if (process.env.TRAVIS) {
    return;
  }

  if (error || !stat.isDirectory()) {
    exec('npm i lerna@2.0.0-beta.30'); // Install lerna
    exec('npm run bootstrap'); // Bootstrap the project
  }
});
