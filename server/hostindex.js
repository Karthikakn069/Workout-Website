const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT||3001;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({
  origin:['https://freeworkoutgenerator.netlify.app','http://localhost:3000'],
  optionSuccessStatus:200
}
));
require('dotenv').config();


/*const urlDB = `mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}
:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const db = mysql.createConnection(urlDB);*/


const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port:process.env.DB_PORT,
  database:process.env.DB_NAME
})


const tableName = "workouts";

app.listen(port,()=>{
  console.log("Node running on port "+port);
  db.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to database.');
  });
})


//to get entire data
// db.connect((err)=>{
//   const query = `SELECT * FROM ${tableName}`;
//   db.query(query,(err,result,fields)=>{
//     if(err) throw err;
//     else{
//       app.get('/exercises',(req,res)=>{
//         res.send(result);
//       })
//     }
//   })
// })

app.get('/exercises', (req, res) => {
  const query = `SELECT * FROM ${tableName}`;
  console.log("erxercises page")
  db.query(query, (err, result) => {
    if (err) {
      console.error('Failed to execute query:', err.stack);
      res.status(500).send('Failed to get exercises');
    } else {
      res.send(result);
    }
  });
});

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
  const query = `SELECT * FROM ${tableName} WHERE target_muscle_group IN(${musclesString}) AND primary_equipment IN(${equipmentString})`;
  db.query(query,(err,result,field)=>{
    if(err) {
      console.error(err);
      throw err};
    res.send(result);
    console.log("this is working");
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