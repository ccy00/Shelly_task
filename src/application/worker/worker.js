import { pool } from 'workerpool'; 
const workerPool  = pool({ maxWorkers: 4 });

export function callWekhook(url) {
    workerPool.exec(mockCall, [url]);
}

function mockCall(url) { 
    console.log(`workpool call ${url} - Process ID: ${process.pid}`);
}