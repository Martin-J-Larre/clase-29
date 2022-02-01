let cluster = require('cluster');
let numCPUs = require('os').cpus().length;
const express = require('express')
const app = express()
let input_data = process.argv.slice(2);

const PORT = 8000;

// const isNum = (element) => !isNaN(element);
//     if (input_data.length > 0) {
//         if (isNum(input_data[0])) {
//             PORT = input_data[0]
//         }
//     }

app.get('/', (req, res) => {
    res.send( `Todo ok!! Puerto:${PORT}, PID: ${process.pid}, Hora: ${new Date()}`);
    // process.exit()
    cluster.worker.kill();
});

if (cluster.isMaster) {
    console.log(`Master ----> PID:${process.pid}`);
    //Workers
    console.log("CPUS...", numCPUs);
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    cluster.on('exit',(worker, code, signal) =>{
        console.log(`Murió el subproceso ${worker.process.pid}`);
        // cluster.fork()
    });
}else{
    app.listen(PORT, () => {
        console.log(`Server is Listening on http://localhost:${PORT} || worker ${process.pid} started!, fecha: ${new Date()}`)
    })
}

