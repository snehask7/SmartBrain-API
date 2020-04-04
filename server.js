const express=require('express');
const bodyParser = require('body-parser');
const app=express();
const knex=require('knex');
var cors = require('cors');

const register = require('./controllers/register');
const SignIn = require('./controllers/SignIn');
const Profile = require('./controllers/Profile');
const image = require('./controllers/image');
const db = knex({
	client: 'pg',
	connection: {
		connectionString: 'postgresql-globular-12791',
		ssl: true
	}
});

app.use(cors());
 
const bcrypt= require('bcrypt-nodejs');	

app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.send('it is working!');
})

app.post('/signin',(req,res)=>{SignIn.handleSignIn(req,res,db,bcrypt)})
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res)=>{Profile.handleProfile(req,res,db)})
app.put('/image',(req,res)=>{image.handleimage(req,res,db)})

app.listen(process.env.PORT || 3000,()=>{
	console.log('app is running on port ${process.env.PORT}');
})

