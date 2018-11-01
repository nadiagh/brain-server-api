const handleProfile=(req,res,knex)=>{

   knex('users').where('id',req.params.id).then(data=>{
   if(data.length) res.json(data);
   else res.status(404).json('not found');
   }).catch(err=>res.status(404).json('not found'));



}



module.exports={
	handleProfile:handleProfile
}