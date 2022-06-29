const PROTO_PATH = __dirname + '/employee.proto';

const grpc        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const protoLoaderConfig = require('./proto-loader-config.js');

let packageDefinition = protoLoader.loadSync(PROTO_PATH, protoLoaderConfig);
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;
/* use the employee_proto generated code to create stubs */

let stub = new employee_proto.Employee('localhost:4500', grpc.credentials.createInsecure());
// creates a tcp connection (channel) to the grpc server on a specified host and port.
// each stub wraps a Channel

let employeeId = 1;
stub.getDetails({id: employeeId}, (err, response) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log('Employee Details for Employee Id:', employeeId);
        console.log('response.message',response.message);
    }
});