const express = require('express');
const router = express.Router();
const Person = require('./../models/Person');
const {jwtAuthMiddleware, generateToken}=require('./../jwt')

// post method to get person
router.post('/signup', async(req, res) =>{
  try {
    const data = req.body; // Assuming the request body contains the person data.

    // Create a new person detail document using the mongoose model
    const newPerson = new Person(data);

    // Save the person to the database
    const response = await newPerson.save();
    console.log('data saved');

    // payload 
    const payload = {
      id: response.id,
      username: response.username
    }
    console.log(JSON.stringify(payload));
    
    // generate token's
    const token = generateToken(payload);
    console.log("Token is : ", token);

    res.status(200).json({response: response, token: token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Login Route
router.post('/login', async(req, res)=>{
  try{
      // Extract username and password from request body
      const {username, password} = req.body;

      // find the user by username
      const user = await Person.findOne({username: username});

      // if user does not exist or password does not match, return error
      if( !user || !(await user.comparePassword(password))){
        return res.status(401).json({erro: 'Invaid username or password'});
      }

      //generate Token
      const payload = {
        id: user.id,
        username: user.username
      }
      const Token= generateToken(payload);

      // resturn token as reponse
      res.json({Token})
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Token Server Error' });
  }
})

// Profile route
router.get('/profile',jwtAuthMiddleware, async(req, res) =>{
  try{
      const userData = req.user;
      console.log("User Data: ", userData);

      const userId = userData.id;
      const user = await Person.findById(userId);

      res.status(200).json({user});
  }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Token Server Error' });
  }
})



// get method to get person
router.get('/', jwtAuthMiddleware,async (req, res)=>{
  try{
      const data = await Person.find();
      console.log('data fatched');
      res.status(200).json(data);
  }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

// gat person's workType for db.
router.get('/:workType',async(req,res) =>{
    try{
        const workType = req.params.workType; //Extract the work type from the URL parameter
        if(workType == 'chief' || workType == 'manager' || workType == 'waiter'){

            const response = await Person.find({work: workType});
            console.log('response patched');
            res.status(200).json(response);
        }else{
            req.status(404).json({error:'Invalied work type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

// update methode using put.
router.put('/:id', async(req, res) =>{
  try{
      const personId = req.params.id; // Extract thr id from the URL parameter.
      const updatedPersonData = req.body; // Update data for the person.

      const response = await Person.findByIdAndUpdate(personId, updatedPersonData,{
        new: true, // Return the update document
        runValidators: true // Run Mongoose validation
      })

      // if response send null then 404 show on display.
      if(!response){
        return res.status(404).json({error: "Person not found"});
      }

      console.log('data updated');
      res.status(200).json(response);
  }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})


// delete method using.
router.delete('/:id', async(req, res) =>{
  try{
       const personId = req.params.id; // Extract thr id from the URL parameter.

       // Assuming you have a person model
       const response = await Person.findByIdAndRemove(personId);
       if(!response){
        return res.status(404).json({error: "Person not found"});
      }
      console.log('data deleted');
      res.status(200).json({message: 'person Deleted succesfully'});
  }catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = router;