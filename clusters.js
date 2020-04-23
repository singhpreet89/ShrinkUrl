const cluster = require('cluster');
const os = require('os');

const numberOfCPUs = os.cpus();

if (cluster.isMaster) {
    console.log(`INFO ==> Master: ${process.pid} is running`);

    numberOfCPUs.forEach(() => {
        cluster.fork()
    });

    /* Optional Events */
    // cluster.on('listening', (worker) => {
    //     console.log(`INFO ==> Worker: ${worker.process.pid} connected`);
    // });

    // cluster.on('disconnect', (worker) => {
    //     console.log(`INFO ==> Worker: ${worker.process.pid} disconnected`);
    // });

    // cluster.on('exit', (worker, code, signal) => {
    //     console.log(`INFO ==> Worker: ${worker.process.pid} died`);
        // Making sure a new cluster starts if an old cluster dies for some reason
        // cluster.fork();
    // });

} else {
    require("./server.js");
}