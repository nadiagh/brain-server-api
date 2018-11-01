const express=require('express');
const bp=require('body-parser');
const app=express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const register=require('./controllers/register');
const signin=require('./controllers/signin');
const updateEntries=require('./controllers/updateEntries');
const profile=require('./controllers/profile');


app.use(cors());
app.use(bp.json());

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'postgres',
    password : 'ENSI2015',
    database : 'smart_brain'
  }
});

// knex.select('*').from('users').then(data=>console.log(data));





app.post("/signin",(req,res)=>{signin.handleSignin(req,res,knex,bcrypt)})

app.post("/register",(req,res)=>{register.handleRegister(req,res,knex,bcrypt)})

app.post("/imageUrl",(req,res)=>{updateEntries.handleImage(req,res)})

app.put("/image",(req,res)=>{updateEntries.handleEntries(req,res,knex)})

app.get("/profile/:id",(req,res)=>{profile.handleProfile(req,res,knex)})





app.listen(3001,()=>console.log("ok"));