const PROTO_PATH = "./customers.proto";

var fs = require('fs');
var grpc = require("grpc");
var protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
	keepCase: true,
	longs: String,
	enums: String,
	arrays: true
});

var customersProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

const rawdata = fs.readFileSync('./foods.json');
const foods = JSON.parse(rawdata);

const orderdata = fs.readFileSync('./order.json');
const orders = JSON.parse(orderdata);

server.addService(customersProto.RestaurantService.service, {
	getAll: (_, callback) => {
		callback(null, { foods });
	},

	get: (call, callback) => {
		let food = foods.find(n => n.index == call.request.index);
		if (food) {
			callback(null, food);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
	},

	insert: (call, callback) => {
		let food = call.request;
		food.index = foods.length + 1

		foods.push({ ...food })

		const jsonString = JSON.stringify(foods)

		fs.writeFile('./foods.json', jsonString, err => {
			if (err) {
				console.log('Error writing file', err)
			} else {
				console.log('Successfully wrote file')
			}
		})

		callback(null, food);
	},

	update: (call, callback) => {
		let existingFood = foods.find(n => n.index == call.request.index);

		if (existingFood) {
			existingFood.name = call.request.name;
			existingFood.value = call.request.value;

			const jsonString = JSON.stringify(foods)

			fs.writeFile('./foods.json', jsonString, err => {
				if (err) {
					console.log('Error writing file', err)
				} else {
					console.log('Successfully wrote file')
				}
			})

			callback(null, existingFood);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
	},

	remove: (call, callback) => {
		console.log(call.request.index)

		let existingFoodIndex = foods.findIndex(
			n => n.index == call.request.index
		);

		if (existingFoodIndex != -1) {
			foods.splice(existingFoodIndex, 1);
			console.log(foods)
			const jsonString = JSON.stringify(foods)

			fs.writeFile('./foods.json', jsonString, err => {
				if (err) {
					console.log('Error writing file', err)
				} else {
					console.log('Successfully wrote file')
				}
			})

			callback(null, {});
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
	},

	getAllOrder: (_, callback) => {
		callback(null, { orders });
	},

	getOrder: (call, callback) => {
		let order = orders.find(n => n.nPedido == call.request.nPedido);
		
		if (order) {
			callback(null, order);
		} else {
			callback({
				code: grpc.status.NOT_FOUND,
				details: "Not found"
			});
		}
	},

	insertOrder: (call, callback) => {
		let order = call.request;
		order.nPedido = orders.length + 1

		orders.push({ ...order })

		const jsonString = JSON.stringify(orders)

		fs.writeFile('./order.json', jsonString, err => {
			if (err) {
				console.log('Error writing file', err)
			} else {
				console.log('Successfully wrote file')
			}
		})

		callback(null, order);
	},
});

server.bind("127.0.0.1:30043", grpc.ServerCredentials.createInsecure());
console.log("Server running at http://127.0.0.1:30043");
server.start();
