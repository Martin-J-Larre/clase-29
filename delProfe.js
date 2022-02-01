//*Del Profe
let cluster = require("cluster");
let numCPUs = require('os').cpus().length;
let express = require("express");
let app = express();
let input_data = process.argv.slice(2);
let PORT = 8080;

// const isNum = (element) => !isNaN(element);
// if(input_data.length > 0){
// if(isNum(input_data[0])){
// PORT = input_data[0];
// }
// }
app.get("/", (req, res, next) => {
    res.send(`Todo ok!, Puerto: ${PORT} , PID: ${process.pid}, Hora: ${new Date()}`);
});

if(cluster.isMaster){
    console.log(`Master -> PID: ${process.pid}`);
// Workers
console.log("cpuuus ..", numCPUs );
for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
}
cluster.on('exit', (worker, code, signal)=>{
    console.log(`Murió el subproceso ${worker.process.pid}`);
});
}else{
    app.listen(PORT, ()=>{
        console.log(`Server on http://localhost:${PORT} || Worker ${process.pid} started!, fecha: ${new Date()}`);
    })
}