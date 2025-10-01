const mongoose = require('mongoose');

//Define the person schema
const personSchema = new mongoose.Schema({
    name:{
        type: String,  // define type of data
        required: true // mendatry to enter data
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chief','waiter','manager'], // employee's name
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // data should have to be unique
    },
    address: {
        type: String,
    },
    salary: {
        type: Number,
        required: true
    }
});

// create person data
const Person = mongoose.model('Person', personSchema);
module.exports=Person;