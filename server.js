const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 8000;
const app = express();
const User = require('./models/User');

app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/userData');

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
	User.create(
		{...req.body.newData}
		/*{
			name: req.body.newData.name,
			email: req.body.newData.email,
			password: req.body.newData.password
		}*/,
		(err, data)=>{
			if(err)
				res.json({success: false, message:err})
			else if(!data)
				res.json({success: false, message:"Not found"})
			else
				res.json({success: true, data: data})
		}

	)
})

function sendResponse(res, err, data) {
	(err, data)=>{
		if(err)
			res.json({success: false, message:err})
		else if(!data)
			res.json({success: false, message:"Not found"})
		else
			res.json({success: true, data: data})
	}
}



app.route('/users/:id')
// READ
.get((req,res)=>{
	User.findById(req.params.id, (err,data)=>{sendResponse(res,err,data)})
})
// UPDATE
.put((req,res)=>{
	User.findByIdAndUpdate(
		req.params.id,
		/*{
			name: req.body.newData.name,
			email: req.body.newData.email,
			password: req.body.newData.password
		}*/
		{...req.body.newData}
		,
		{
			new: true
		},
		
		(err, data)=>{sendResponse(res,err,data)}
	)
})
// DELETE
.delete((req,res)=>{
	User.findByIdAndDelete(
		req.params.id,
		(err, data)=>{sendResponse(res,err,data)}
	)
})
