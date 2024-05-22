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
console.log(port)


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
  //console.log("exercises page")
  db.query(query, (err, result) => {
    if (err) {
      //console.error('Failed to execute query:', err.stack);
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
    //console.log("this is working");
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
});

app.post('/insert_exercises',(req,res)=>{
  const exerciseName = req.body.exerciseName;
  const exeDemo = req.body.exeDemo;
  const exeInDepth = req.body.exeInDepth;
  const exerciseDifficulty = req.body.exerciseDifficulty;
  const targetMuscle = req.body.targetMuscle;
  const primeMover = req.body.primeMover;
  const secMover = req.body.secMover;
  const terMover = req.body.terMover;
  const equipNeeded = req.body.equipNeeded;
  const posture = req.body.posture;
  const bodyRegion = req.body.bodyRegion;
  const movePattern = req.body.movePattern;
  const planeOfMotion = req.body.planeOfMotion;
  const laterality = req.body.laterality;
  //console.log("put request");
  //console.log(exerciseName)

  const sqlQuery = `INSERT INTO ${tableName} (exercise,short_youTube_demonstration,indepth_youtube_explanation,difficulty_level,target_muscle_group,prime_mover_muscle,secondary_muscle,tertiary_muscle,primary_equipment,posture,body_region,movement_pattern_1,plane_of_motion_1,laterality) VALUES ('${exerciseName}','${exeDemo}','${exeInDepth}','${exerciseDifficulty}','${targetMuscle}','${primeMover}', '${secMover}', '${terMover}', '${equipNeeded}', '${posture}','${bodyRegion}','${movePattern}','${planeOfMotion}','${laterality}')`;
  db.query(sqlQuery,(err,result,fields)=>{
    if(err){
      console.log(err);
      throw err;
    }
    //console.log(result);
    res.send(result);
  })
});

app.get('/get_list/:selectOption/:searchValue',(req,res)=>{
  const selectOption = req.params.selectOption;
  const searchValue = req.params.searchValue;
  //console.log(selectOption,searchValue);
  const sqlQuery = `SELECT * FROM ${tableName} WHERE ${selectOption} LIKE '%${searchValue}%';`;
  db.query(sqlQuery,(err,result,fields)=>{
    if(err){
      console.log(err);
      throw err;
    }
    else{
      res.send(result);
    }
  })
})

app.delete('/delete_exercise/:id',(req,res)=>{
  const id = req.params.id;
  const sqlQuery = `DELETE FROM ${tableName} WHERE id = ${id}`
  db.query(sqlQuery,(err,result,fields)=>{
    if(err){
      console.log(err);
    }
    res.send(result);
  })
})





app.get('/' ,(req,res)=>{
  res.send("Hi the backend is working");
})