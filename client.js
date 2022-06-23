const PROTO_PATH = __dirname + '/employee.proto';

const grpc        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const protoLoaderConfig = require('./proto-loader-config.js');

let packageDefinition = protoLoader.loadSync(PROTO_PATH, protoLoaderConfig);
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;
/* The Above script loads the employee package into employee_proto variable */

/*
the client has a stub (referred to as just a client in some languages) 
that provides the same methods as the server.

variable is called client but terminology sometimes it is called stub instead of client
*/
let client = new employee_proto.Employee('localhost:4500',
                                       grpc.credentials.createInsecure());
let employeeId = 1;
 client.getDetails({id: employeeId}, (err, response) => {
    if (err) {
        console.log('err', err);
    } else {
        console.log('Employee Details for Employee Id:', employeeId);
        console.log('response.message',response.message);
    }
});