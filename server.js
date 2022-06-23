const grpc        = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const _           = require('lodash');
/*
Next we need to load the .proto file. 
This is done using the protoLoader libary loadSync method
*/
const PROTO_PATH  = __dirname + '/employee.proto';
const protoLoaderConfig = require('./proto-loader-config.js');
let packageDefinition = protoLoader.loadSync(PROTO_PATH, protoLoaderConfig);

/* Load the proto file package definition */
let employee_proto = grpc.loadPackageDefinition(packageDefinition).employee;

let { employees } = require('./data.js');

function getDetails(call, callback) {
  callback(null, 
    {
       message: _.find(employees, { id: call.request.id })
    });
}

function main() {
  // create a new GRPC Server
  let server = new grpc.Server();

  // add the getDetails implementatio9n here
  server.addService(employee_proto.Employee.service, { getDetails: getDetails });

  // start a new grpc server
  server.bindAsync('0.0.0.0:4500', grpc.ServerCredentials.createInsecure(), () => {
    console.log('grpc server is running');
    server.start();
  });
}

main();
