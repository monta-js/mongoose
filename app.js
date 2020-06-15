const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Person = require('./models/person');

mongoose.connect('mongodb://localhost:27017/Person-list',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  // Create and Save a Record of a Model
  var createAndSavePerson = function(done) {
    var person = new Person({name: 'montassar', age: 28, favouriteFoods: ["couscous", "poissons","salade"]})
    person.save((err, data)=>{
     if (err) console.log(err)
     return done(null, data)
    })
   }  

  //Create Many Records with model.create()

  let arrayOfPeople = [
    { name: 'montassar', age : 28, favoriteFoods : ["couscous", "poissons","salade"]},
    { name: 'houssem', age : 36, favoriteFoods : ["pizza", "escalope avec sauce blanche","lasagne"]},
    { name: 'pati', age : 24, favoriteFoods : ["couscous", "makloub","Pates"]}
  ];

  //Create Many Records with model.create()

   var createManyPeople = function(arrayOfPeople, done) {
    Model.create(arrayOfPeople, (err, data) => {
      if(err) {
         done(err); 
      }
    done(null, data);
    }) 
};

//Use model.find() to Search Your Database

let personName = 'montassar'
var findPeopleByName = function(personName, done) {
  Person.find(personName, function (err, data) {
  if(err){
    return done(err);
  }
  return done(null, data);
  })
};

  //Use model.findOne() to Return a Single Matching Document from Your Database
  let food = "makloub"
  var findOneByFood = function(food, done) {
    Person.find({favoriteFoods:food},(err,data)=>{
      if(err) return done(err)
       done(null,data)
    }); 
  };

  //Use model.findById() to Search Your Database By _id

  var findPersonById = function(personId, done) {   
    Person.findById(personId, function(err, data){
       if(err) { done(err); }
       else { done(null,data); }
  })  
  };

//Perform Classic Updates by Running Find, Edit, then Save

var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById(personId, function(err, data) {
    this.favoriteFoods.push(foodToAdd).save();
    if (err) {
      return done(err);
    }
    else {
      done(null, data);
    }
  });
};

//Perform New Updates on a Document Using model.findOneAndUpdate()

var findAndUpdate = function(personName, done) {
  var ageToSet = 20;
  Person.findOneAndUpdate(
    {"name": personName},
    {$set: {"age":ageToSet}},{returnNewDocument : true}, 
    function(err, doc){
                    if(err){
                        console.log("Something wrong when updating record!");
                    }
                    console.log(doc);
})};


// Delete One Document Using model.findByIdAndRemove

var removeById = function(personId, done) {
  Model.findByIdAndRemove(personId, (err, data) => err ? done(err) : done(null, data));
  };


//MongoDB and Mongoose - Delete Many Documents with model.remove()

var removeManyPeople = function(done) {
  var nameToRemove = "pati";
  Person.deleteMany(
  {name: nameToRemove},
  (err, data) => {
  if (err) {
  done(err);
  }
  done(null, data);
  }
  )
  };

//Chain Search Query Helpers to Narrow Search Results

var queryChain = function(done) {
  var foodToSearch = "burrito";
  person.find( { favoriteFoods: { "$in" : ["burrito"]}})
        .sort({name:1})
        .limit(2)
        .select({name:true, favoriteFoods:true}).exec((err, data) => {
     if(err)
       done(err);
    done(null, data);
  })
};

module.exports = app;