
const Clarifai=require('clarifai');

const app = new Clarifai.App({
 apiKey: 'ffb7e9ed3350497b83142f30fd9dce95'
});

const handleImage=(req,res)=>{
 app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
 .then(data=>res.json(data))
 .catch((err)=>{console.log(err)});
}

const handleEntries=(req,res,knex)=>{

   knex('users').where('id',req.body.id).increment('entries',1)
   .returning('entries')
   .then(data=>res.json(data[0]))
   .catch(err=>res.status(404).json('an error occured'));;


}


module.exports={
	handleEntries:handleEntries,
	handleImage:handleImage
}