// const express = require('express');
// const app = express();
// const port= 3000;

// app.listen(port, ()=>{
//     console.log(`app is running on port ${port}`);
// });

const express = require('express');
const app = express();
const db = require("./db");
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(express.json()); // bodyParae take data an convert it into object then store data in (req.body).
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) =>{
  res.send('welcome to our hotel')
})

// import the router files
const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes');

// use the routes.
app.use('/person',personRoutes);
app.use('/menu',MenuItemRoutes);


// app.get('/chicken', (req,res)=>{
//   res.send('sure sir , i would love to serve chiken')
// })

// app.post('/items', (req, res)=>{
//   res.send('data is saved');
//   console.log("data is saved");
// })

// app.get('/rohan', (req,res)=>{
//   var customized_samosa={
//     name: 'alu samosa',
//     price: '10rs',
//     is_chatni: true,
//     is_red_sos:false 
//   }
//   res.send(customized_samosa)
// })
app.listen(PORT,()=>{
  console.log('surver is activated(3000)')
}); 