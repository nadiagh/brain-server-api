const handleSignin=(req,res,knex,bcrypt)=>{

 if(!req.body.email  || !req.body.password){
    return res.status(400).json('incorrect form submission');
  }

  knex.select('email', 'hash').from('login')
    .where('email', '=', req.body.email)
    .then(data => {
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if (isValid) {
        return knex.select('*').from('users')
          .where('email', '=', req.body.email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'));
}
    
    //  knex('login').where('email', req.body.email).then(

    // (data)=>{


        
    //   if( bcrypt.compareSync(req.body.password,data[0].hash))
    //   	{
    //       return knex('users').where('email', req.body.email).then(user=>res.json(user[0])).catch(err=>res.status(404).json("unable to get the user"));
    //     }
    //   else
    //   	return res.status(404).json("wrong credentials");
    //    })


    // .catch(err=>res.status(400).json('you should register first'));

	
// })


module.exports={
  handleSignin:handleSignin
}