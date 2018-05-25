var express = require("express");
var path = require("path");
var bodyParser = require("bodyParser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var WORDS_COLLECTIONS = "words";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

//Create a database variable outside of the database connection callback to reuse  the connection pool in your app
var db;

//Connect to the database before starting application server
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database){
	if (err) {
		console.log(err);
		process.exit(1);
	}

	db = database;
	console.log("Database connection ready");

	var server = app.listen(process.env.PORT || 8080, function () {
		var port = server.address().port;
		console.log("App now running on port", port);
	});
});

// WORDS API ROUTES BELOW

//Generic error handler used by all endpoints
function handleError(res, reason, message, code) {
	console.log("ERROR: " +  reason);
	res.status(code || 500).json({"error": message});
}

/*  "/words"
 *    GET: returns all word objects
 *    POST: creates a new word
 */

app.get("/words", function(req, res) {

});

app.post("/words", function(req, res) {
	var newWord = req.body;
	newWord.createDate = new Date();

	if (!(req.body.string && req.body.definition)) {
		handleError(res, "Invalid input", "Must provide a word and definition.", 400);
	}

	db.collection(WORDS_COLLECTIONS).insertOne(newWord, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Failed to create new word.");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	});

});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("", function(req, res) {

});

app.put("", function(req, res) {

});

app.delete("", function(req, res) {

});
















