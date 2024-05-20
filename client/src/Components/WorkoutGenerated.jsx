import React, {useEffect, useState } from "react";
import { Container , Row , Col , Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import WorkoutDisplay from "./WorkoutDisplay.jsx";
 
function WorkoutGenerated({workouts,duration}){
  const [noOfWorkouts,setNoOfWorkouts] = useState(0);
  const [timeperWorkout , setTimePerWorkout] = useState(0);
  const [breakTime,setBreakTime] = useState(0);
  const [bigBreakTime , setBigBreakTime] = useState(0);
  const [noOfSets,setNoOfSets] = useState(0);
  const [generateWorkouts , setGenerateWorkouts] = useState([]);
  const [dupWorkuts , setDupWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
  let armWorkouts = [] , shoulderWorkouts = [] , chestWorkouts = [] , absWorkout = [] , legsWorkouts = [] , visitedId = [];
    let generatedWorkouts = [];
    let maxCount = 0 , count = 0 , l =workouts.length;
    if(duration === 10){
      maxCount = 6;
      setNoOfWorkouts(6);
      setNoOfSets(2);
      setTimePerWorkout(30);
      setBreakTime(15);
      setBigBreakTime(60);
    }
    else if(duration === 15){
      maxCount = 7;
      setNoOfWorkouts(7);
      setNoOfSets(2);
      setTimePerWorkout(45);
      setBreakTime(15);
      setBigBreakTime(60);
    }
    else if(duration === 30) {
      maxCount = 9;
      setNoOfWorkouts(9);
      setNoOfSets(3);
      setTimePerWorkout(45);
      setBreakTime(15);
      setBigBreakTime(60);
    }
    else{
      maxCount = 9;
      setNoOfWorkouts(9);
      setNoOfSets(3);
      setTimePerWorkout(60);
      setBreakTime(30);
      setBigBreakTime(90);
    }
    // if(duration === 30){
      
    // }
    // if(duration === 45){
    // }
    while(count < maxCount){
      let t = count;
      for(let i = 0;i<l && count<maxCount;i++){
        let musgrp = workouts[i]['target_muscle_group'];
        if(musgrp === "Forearms" || musgrp === "Biceps" || musgrp === "Triceps"){
          if(visitedId.includes(workouts[i]['id']) === false){
            armWorkouts.push(workouts[i]);
            //generatedWorkouts.push(workouts[i]);
            visitedId.push(workouts[i]['id']);
            count++;
            break;
          }
        }
      }
      for(let i = 0;i<l && count<maxCount;i++){
        let musgrp = workouts[i]['target_muscle_group'];
        if(musgrp === "Shoulders"){
          if(visitedId.includes(workouts[i]['id']) === false){
            shoulderWorkouts.push(workouts[i]);
            //generatedWorkouts.push(workouts[i]);
            visitedId.push(workouts[i]['id']);
            count++;
            break;
          }
        }
      }
      for(let i = 0;i<l && count<maxCount;i++){
        let musgrp = workouts[i]['target_muscle_group'];
        if(musgrp === "Chest" || musgrp === "Trapezius"){
          if(visitedId.includes(workouts[i]['id']) === false){
            chestWorkouts.push(workouts[i]);
            //generatedWorkouts.push(workouts[i]);
            visitedId.push(workouts[i]['id']);
            count++;
            break;
          }
        }
      }
      for(let i = 0;i<l && count<maxCount;i++){
        let musgrp = workouts[i]['target_muscle_group'];
        if(musgrp === "Abdominals" || musgrp === "Abductors" || musgrp ==="Adductors" || musgrp ==="Hip Flexors"){
          if(visitedId.includes(workouts[i]['id']) === false){
            absWorkout.push(workouts[i]);
            //generatedWorkouts.push(workouts[i]);
            visitedId.push(workouts[i]['id']);
            count++;
            break;
          }
        }
      }
      for(let i = 0;i<l && count<maxCount;i++){
        let musgrp = workouts[i]['target_muscle_group'];
        if(musgrp === "Back"){
          if(visitedId.includes(workouts[i]['id']) === false){
            shoulderWorkouts.push(workouts[i]);
            //generatedWorkouts.push(workouts[i]);
            visitedId.push(workouts[i]['id']);
            count++;
            break;
          }
        }
      }
      for(let i = 0;i<l && count<maxCount;i++){
        let musgrp = workouts[i]['target_muscle_group'];
        if(musgrp === "Quadriceps" || musgrp === "Hamstrings" || musgrp ==="Glutes"){
          if(visitedId.includes(workouts[i]['id']) === false){
            legsWorkouts.push(workouts[i]);
            //generatedWorkouts.push(workouts[i]);
            visitedId.push(workouts[i]['id']);
            count++;
            break;
          }
        }
      }
      if(count === t){
        break;
      } 
    }
    //console.log(armWorkouts,shoulderWorkouts,chestWorkouts,absWorkout,legsWorkouts);
    generatedWorkouts=[...generatedWorkouts,...armWorkouts];
    generatedWorkouts=[...generatedWorkouts,...shoulderWorkouts];
    generatedWorkouts=[...generatedWorkouts,...chestWorkouts];
    generatedWorkouts=[...generatedWorkouts,...absWorkout];
    generatedWorkouts=[...generatedWorkouts,...legsWorkouts];
    setGenerateWorkouts(generatedWorkouts);
    //console.log(generatedWorkouts)
  },[workouts,duration]);

  function RowCard({item}){
    const musgrp = item['target_muscle_group'];
    let grp = '';
    if(musgrp === "Quadriceps" || musgrp === "Hamstrings" || musgrp ==="Glutes"){
      grp = 'Legs';
    }
    else if(musgrp === "Back" || musgrp === "Shoulders"){
      grp = 'Shoulders and Back';
    }
    else if(musgrp === "Abdominals" || musgrp === "Abductors" || musgrp ==="Adductors" || musgrp ==="Hip Flexors"){
      grp = "Abs";
    }
    else if(musgrp === "Chest" || musgrp === "Trapezius"){
      grp = "Chest";
    }
    else{
      grp = "Arms";
    }
    return(
      <Row className="text-bg-light p-2 mt-3 " key = {item['id']}>
        <Col sx="4">{item['exercise']}</Col>
        <Col>Target Muscle Group: {grp}</Col>
        <Col sx="1"><Button onClick={()=>{navigate(`/exercise_details/${item['id']}`)}}>Details</Button></Col>
      </Row>
    )
  }
  
  /*function FloatExerciseDetails(){
    return (
      <Container>
        <ExerciseDetails ide={exerciseDetails}/>
      </Container>
    )
  }*/

  if(dupWorkuts.length !== 0){
    return (
      <Container>
        <WorkoutDisplay workouts={dupWorkuts} breakTime = {breakTime} bigBreakTime={bigBreakTime} timeperWorkout={timeperWorkout} noOfSets={noOfSets} noOfWorkouts={noOfWorkouts} />
        <Button onClick={()=>{setDupWorkouts([])}} className = "mt-2">Back</Button>
      </Container>
    )
  }


  return(
    <Container>
      {/*exerciseDetails !== -1?<FloatExerciseDetails/>:<></>*/}
      <Row>
        <Col>
          <h6 className="text-center">Duration of Workout : </h6>
          <p className="text-center">{duration}</p>
        </Col>
        <Col>
          <h6 className="text-center">Number Of Workouts : </h6>
          <p className="text-center">{noOfWorkouts}</p>
        </Col>
        <Col>
          <h6 className="text-center">Number Of Sets : </h6>
          <p className="text-center">{noOfSets}</p>
        </Col>
        <Col>
          <h6 className="text-center">Time for each workout : </h6>
          <p className="text-center">{timeperWorkout} seconds</p>
        </Col>
        <Col>
          <h6 className="text-center">Break time between sets : </h6>
          <p className="text-center">{bigBreakTime} seconds</p>
        </Col>
      </Row>
      <Row>
        <Col><h4>Workouts generated for you :</h4></Col>
      </Row>
      <Row>
        {generateWorkouts.map((item)=>{
          return <RowCard item={item}/>
        })}
      </Row>
      <Row className="mt-2 d-flex justify-content-center">
        <Button className = "w-25" onClick={()=>{setDupWorkouts(generateWorkouts)}}>Begin Workout</Button>
      </Row>
    </Container>
  )
}

export default WorkoutGenerated;