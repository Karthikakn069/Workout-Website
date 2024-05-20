const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config();


var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
  database:process.env.DB_NAME
})

const tableName = "workouts";

app.listen(port,()=>{
  //console.log("Node running on port "+port);
})


//to get entire data
db.connect((err)=>{
  const query = `SELECT * FROM ${tableName}`;
  db.query(query,(err,result,fields)=>{
    if(err) throw err;
    else{
      app.get('/exercises',(req,res)=>{
        res.send(result);
      })
    }
  })
})

app.post('/get_workouts',(req,res)=>{
  const muscles = req.body.muscleGroup;
  const equipment = req.body.equipmentsGroup;
  let musclesString = `'${muscles[0]}'` , equipmentString = `'${equipment[0]}'`;
  for(var i = 1;i<muscles.length;i++){
    musclesString = musclesString+','+`'${muscles[i]}'`;
  }
  for(var i = 1;i<equipment.length;i++){
    equipmentString = equipmentString+','+`'${equipment[i]}'`;
  }
  const query = `SELECT * FROM exercises.workouts WHERE target_muscle_group IN(${musclesString}) AND primary_equipment IN(${equipmentString})`;
  db.query(query,(err,result,field)=>{
    if(err) throw err;
    res.send(result);
  })
  //console.log(musclesString,equipmentString);
  //res.send(muscles,equipment);
})


//to get the specific exercise
app.get('/get_exercises/:id',(req,res)=>{
  const id = req.params.id;
  const query = `SELECT * FROM ${tableName} WHERE id = '${id}'`;
  db.query(query,(err,result,fields)=>{
    if(err) throw err;
    else res.send(result);
  })
  //res.send(req.params)
})





app.get('/' ,(req,res)=>{
  res.send("Hi the backend is working");
})