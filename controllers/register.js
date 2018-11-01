



const handleRegister=(req,res,knex,bcrypt)=>{

  if(!req.body.email || !req.body.name || !req.body.password){
    return res.status(400).json('incorrect form submission');
  }

 console.log(req.body);

var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.password, salt);


 knex.transaction(trx=>{
  trx.insert({
    hash:hash,
    email:req.body.email,
  })
  .into('login')
  .returning('email')
  .then(email=>{
    return trx('users')
    .returning('*') 
    .insert({
      name:req.body.name,
      email:email[0],
      entries:0,
      joined:new Date()
    })
    .then(user=>{res.json(user[0])})

  })
 
  .then(trx.commit)
  .catch(trx.rollback)
})


.catch(err=>res.status(400).json('unable to join'));
}

 // .then(()=>knex.select().from('users').then(data=>res.send(data)));
    
module.exports={
  handleRegister:handleRegister
}