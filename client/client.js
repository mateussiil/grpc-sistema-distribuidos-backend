const PROTO_PATH = "../customers.proto";

const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

const RestaurantService = grpc.loadPackageDefinition(packageDefinition).RestaurantService;
const client = new RestaurantService(
	"localhost:30043",
	grpc.credentials.createInsecure()
);

module.exports = client;
