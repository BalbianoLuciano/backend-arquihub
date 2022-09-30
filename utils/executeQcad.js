const { spawn } = require('node:child_process');

const bat = spawn('cmd.exe', ['/c', "cd C:\Program Files\QCAD"], );

bat.stdout.on('data', (data) => {
  console.log(data.toString());
});

bat.stderr.on('data', (data) => {
  console.error(data.toString());
});

bat.on('exit', (code) => {
  console.log(`Child exited with code ${code}`);
});