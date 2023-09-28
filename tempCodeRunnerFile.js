// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use('tech-stack-tracker');

// Create a new document in the collection.
db.getCollection("users").insertOne({
  email: "pm0931@srmist.edu.in",
  password: "$2a$10$2pmEMOcyaQSVJyTJVLq7Ueu7Gwmb/eYfExIonDLSeiVm3ah4rz5Iu",
});
