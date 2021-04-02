const client = require("./client");
const cors = require('cors');
const path = require("path");
const multer = require('multer');
const config = require('../multer');

var fs = require('fs');
const express = require("express");

const app = express();
app.use(cors());

app.use(express.json());
app.use("/files", express.static(path.resolve(__dirname,'..','uploads' )))

app.post('/upload', multer(config).single('file'), (req, res) => {
	console.log('ok')
    return res.json(foods)
});

app.get("/menu", (req, res) => {
	client.getAll(null, (err, data) => {
		if (!err) {
			return res.json(data.foods)
		}
	});
});

app.get("/menu/:id", (req, res) => {
	client.get({ index: req.params.id }, (err, data) => {
		if (err) throw err;

		return res.json(data)
	});
});

app.post("/menu/save", (req, res) => {
	let newFood = {
		index: 1,
		name: req.body.name,
		value: req.body.value,
	};

	client.insert(newFood, (err, data) => {
		if (err) throw err;

		console.log("Food created successfully", data);
		return res.json(data)
		// res.redirect("/");
	});
});

app.put("/menu/update", (req, res) => {
	const updateFood = {
		index: req.body.index,
		name: req.body.name,
		value: req.body.value,
	};

	client.update(updateFood, (err, data) => {
		if (err) throw err;

		console.log("Food updated successfully", data);
		return res.json(data)

		// res.redirect("/");
	});
});

app.delete("/menu/remove/:id", (req, res) => {
	client.remove({ index: req.params.id }, (err, _) => {
		if (err) throw err;

		console.log("Customer removed successfully");
		return res.json({ index: req.params.id })
	});
});

//routes to client

app.get("/orders", (req, res) => {
	client.getAllOrder(null, (err, data) => {
		if (!err) {
			return res.json(data.orders)
		}
	});
});

app.get("/order/:id", (req, res) => {
	client.getOrder({ nPedido: req.params.id }, (err, data) => {
		if (err) throw err;
		return res.json(data)
	});
});

app.post("/order/save", (req, res) => {
	let newOrder = {
		nPedido: 1,
		data: req.body.data,
	};

	client.insertOrder(newOrder, (err, data) => {
		if (err) throw err;

		console.log("Order created successfully", data);
		return res.json(data)
		// res.redirect("/");
	});
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server running at port %d", PORT);
});
