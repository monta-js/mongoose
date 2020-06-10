const express = require('express');
const mongoose = require('mongoose');
const app = express();
const person = require('./models/person');

mongoose.connect('mongodb+srv://Monta-js:zmonta1824880@cluster0-pme76.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

   
  // Create and Save a Record of a Model
  let people = new person({ name: 'montassar', age : 28, favoriteFoods : ["couscous", "poissons","salade"]  });
  people.save(function (err, people) {
    if (err) console.log(err)
    console.log(people)
  })

  //Create Many Records with model.create()

  let arrayOfPeople = [
    { name: 'montassar', age : 28, favoriteFoods : ["couscous", "poissons","salade"]},
    { name: 'houssem', age : 36, favoriteFoods : ["pizza", "escalope avec sauce blanche","lasagne"]},
    { name: 'pati', age : 24, favoriteFoods : ["couscous", "makloub","Pates"]}
  ];
  
  person.create(arrayOfPeople,function (err, people) {
    if (err) console.log(err)
    console.log(people)
  })

   //Use model.find() to Search Your Database

  person.find( { name: "montassar" },function (err, people) {
    if (err) console.log(err)
    console.log(people)
  })

  //Use model.findOne() to Return a Single Matching Document from Your Database

  person.findOne( { favoriteFoods: { "$in" : ["makloub"]} },function (err, people) {
    if (err) console.log(err)
    console.log(people)
  })

  //Use model.findById() to Search Your Database By _id

  person.findById('',function (err, people) {
    if (err) console.log(err)
      console.log(people)
    })

//Perform Classic Updates by Running Find, Edit, then Save

 /person.findById('',function (err, people) {
    if (err) console.log(err)
    people.favoriteFoods.push('hamburger');
    people.save(function (err, people) {
      if (err) console.log(err)
      console.log(people)
    })
    
  })

//Perform New Updates on a Document Using model.findOneAndUpdate()

const filter = { name: 'montassar' };
const update = { name: 'monta' };
person.findOneAndUpdate(filter, update, { new: true,upsert: true },function (err, people) {
  if (err) console.log(err)
    console.log(people)
  })


// Delete One Document Using model.findByIdAndRemove

person.findByIdAndRemove ('',function (err, people) {
    if (err) console.log(err)
      console.log(people)
  })


//MongoDB and Mongoose - Delete Many Documents with model.remove()

person.remove ({name :"pati"},function (err, people) {
    if (err) console.log(err)
      console.log("delete all peoples having Mary name")
  })

//Chain Search Query Helpers to Narrow Search Results

person.find( { favoriteFoods: { "$in" : ["burrito"]}})
.sort({name:1})
.limit(2)
.select({name:true, favoriteFoods:true})
.exec()
.then (peoples => {console.log(peoples)})
.catch(err => {console.log(err)})