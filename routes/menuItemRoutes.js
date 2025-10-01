const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// post method to get MenuItem.
router.post('/',async (req,res) =>{
  try{
    const data = req.body;

    const newMenuItem = new MenuItem(data);

    const response = await newMenuItem.save();
    console.log('data saved');
    res.status(200).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
 
})


//get methon to get MenuItem.
router.get('/',async (req,res) =>{
  try{
  const data = await MenuItem.find();
  console.log('data fatched');
  res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/:tasteType',async (req,res) =>{
  try{
    const tasteType = req.params.tasteType;
     if(tasteType == 'Sweet' || tasteType == 'Spicy' || tasteType == 'Sour'){

            const response = await MenuItem.find({taste: tasteType});
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

//Update method using put.
router.put('/:id', async(req, res) =>{
  try{
      const menuItemId = req.params.id; // Extract thr id from the URL parameter.
      const updatedMenuItemData = req.body; // Update data for the person.

      const response = await MenuItem.findByIdAndUpdate(menuItemId , updatedMenuItemData,{
        new: true, // Return the update document
        runValidators: true // Run Mongoose validation
      })

      // if response send null then 404 show on display.
      if(!response){
        return res.status(404).json({error: "MenuItem not found"});
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
       const menuItemId = req.params.id; // Extract thr id from the URL parameter.

       // Assuming you have a person model
       const response = await MenuItem.findByIdAndDelete(menuItemId);
       if(!response){
        return res.status(404).json({error: "MenuItem not found"});
      }
      console.log('data deleted');
      res.status(200).json({message: 'MenuItem Deleted succesfully'});
  }catch(err){
      console.log(err);
      res.status(500).json({ error: 'MenuItem Server Error' });
  }
})

module.exports = router;