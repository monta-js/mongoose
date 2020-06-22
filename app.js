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

    // const CreatePerson = new Person({name: 'montassar', age: 28, favouriteFoods: ["couscous", "poissons","salade"]})
    // CreatePerson.save()
    //    .then (data => { console.log(data)}) 
    //    .catch(err => { console.error(err)})  
   

  //Create Many Records with model.create()
  
  // const people = [
  //   { name: 'montassar', age : 28, favoriteFoods : ["couscous", "poissons","salade"]},
  //   { name: 'houssem', age : 27, favoriteFoods : ["pizza", "escalope avec sauce blanche","lasagne"]},
  //   { name: 'pati', age : 28, favoriteFoods : ["couscous", "makloub","Pates"]}
  // ]
  // Person.create(people)
  //     .then (data => { console.log(data)}) 
  //     .catch(err => { console.error(err)})

//Use model.find() to Search Your Database

// Person.find({name : { $exists: true }})
//    .then (doc => { console.log(doc)}) 
//    .catch(err => { console.error(err)})

  //Use model.findOne() to Return a Single Matching Document from Your Database

  // Person.findOne({favoriteFoods : {$in : ["pizza"]}})
  //    .then (data => { console.log(data)}) 
  //    .catch(err => { console.error(err)})


  //Use model.findById() to Search Your Database By _id

  // Person.findById("5ef0d3b0227bac23accea9bc")
  //    .then (data => { console.log(data)}) 
  //    .catch(err => { console.error(err)})


//Perform Classic Updates by Running Find, Edit, then Save

// Person.findById('5ef0d3b0227bac23accea9bc')
//    .then(data=>{data.favoriteFoods.push("Humburger");
//     data.save()})
//     .catch(err => { console.error(err)})

//Perform New Updates on a Document Using model.findOneAndUpdate()

// Person.findOneAndUpdate({name : "houssem"}, {age : 20}, {new:true})
//    .then (data => { console.log(data)}) 
//    .catch(err => { console.error(err)})



// Delete One Document Using model.findByIdAndRemove

// Person.findByIdAndRemove('5ef0d72bd90c924d98254bec')
//    .then (data => { console.log(data)}) 
//    .catch(err => { console.error(err)})


//MongoDB and Mongoose - Delete Many Documents with model.remove()

// Person.remove({name:"houssem"})
//    .then (() => { console.log("delete all peoples having houssem name")}) 
//    .catch(err => { console.error(err)})


//Chain Search Query Helpers to Narrow Search Results

// Person.find({ favoriteFoods: { $in: ["couscous"] } })
//   .sort({ name: 1 })
//   .select("-age")
//   .limit(2)
//   .exec()
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.error(err);
//   });

module.exports = app;