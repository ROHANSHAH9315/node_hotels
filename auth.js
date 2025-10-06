// set up passport with a local authentication strategy, using a Person model for user.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person'); // Adjust the path as needed.

passport.use(new LocalStrategy(async(username,password,done)=>{
  // authentication logic here
  try{
      //console.log('Recived credentials:', USERNAME, password);
      const user = await Person.findOne({username});
      if(!user)
          return done(null, false, {message:'Incorrect username.'});
      
      const isPasswordMatch = await user.comparePassword(password);
      if(isPasswordMatch){
        return done(null, user);
      }else{
        return done(null, false,{ message: 'Incorrect password'});
      }

  }catch(err){
      return done(err);
  }
}))

module.exports = passport; // Export cofigured passport
