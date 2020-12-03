const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("please provide a password");
  process.exist(1);
}

const password = process.argv[2];

const url = `mongodb+srv://ennui:${password}@cluster0.jn5rm.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
} else {
  const names = process.argv[3];
  const numbers = process.argv[4];
  const person = new Person({
    name: names,
    number: numbers
  });
  person.save().then((result) => {
    console.log(`added ${names} number ${numbers} to phonebook`);
    mongoose.connection.close();
  });
}
