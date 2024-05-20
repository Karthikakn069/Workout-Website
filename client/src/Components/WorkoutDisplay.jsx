import React, { useEffect ,useState} from "react";
import { Container,Button , Row , Col } from "react-bootstrap";
import WorkoutCard from "./WorkoutCard.jsx";

function WorkoutDisplay(props){
  const [curTimer,setCurTimer] = useState(5);
  const [curTimerIndex , setCurTimerIndex] = useState(0);
  const [timerArray,setTimerArray] = useState([]);
  const [workoutsArray , setWorkoutsArray] = useState([]);
  const [curPosIndex , setCurPosIndex] = useState(0);
  //const[curSet , setCurSet] = useState(0); 
  useEffect(()=>{
    document.getElementById("workout-button").style.display = "none";
    let timerSet = [] , arraySet = ["break"];
    for(let j = 0;j<props.noOfSets;j++){
      for(let i = 0;i<props.noOfWorkouts;i++){
        timerSet.push(props.timeperWorkout)
        arraySet.push(props.workouts[i])
        if(i !== props.noOfWorkouts-1){
          arraySet.push("break")
          timerSet.push(props.breakTime);
        }
      }
      arraySet.push("break");
      timerSet.push(props.bigBreakTime);
    }
    setTimerArray(timerSet);
    setWorkoutsArray(arraySet);
  },[props.bigBreakTime,props.breakTime,props.noOfSets,props.noOfWorkouts,props.timeperWorkout,props.workouts])

  // useEffect(()=>{
  //   curTimer > 0 && setTimeout(()=>{setCurTimer(curTimer-1)},1000);
  // },[curTimer])
  useEffect(()=>{
    const decreTimer = setInterval(()=>{
      setCurTimer(curTimer-1);
    },1000)
    if(curTimer <= 0){
      clearInterval(decreTimer);
      if(curTimerIndex < timerArray.length){
        setCurTimerIndex(curTimerIndex+1)
        setCurTimer(timerArray[curTimerIndex]);
        setCurPosIndex(curPosIndex+1);
      }
    }
    return ()=>clearInterval(decreTimer);
  },[curTimer,curPosIndex,curTimerIndex,timerArray])


  const previousHandle =()=>{
    setCurPosIndex(curPosIndex-1);
    setCurTimerIndex(curTimerIndex-1);
    setCurTimer(timerArray[curTimerIndex]);
  }

  const nextHandle = () =>{
    setCurPosIndex(curPosIndex+1);
    setCurTimerIndex(curTimerIndex+1);
    setCurTimer(timerArray[curTimerIndex]);
  }

  if(curTimerIndex >= timerArray.length){
    return(
      <Container>
        <h1>Congratulations You have completed your workout</h1>
      </Container>
    )
  }
  return(
    <Container>
      <Row>
        <Col lg="10"><WorkoutCard workout={workoutsArray[curPosIndex]}/></Col>
        <Col>
          <Row className="text-align-center"><h3>Time Left</h3></Row>
          <Row className="text-align-center"><h3>{curTimer}</h3></Row>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg="2"><Button onClick={previousHandle} disabled={curPosIndex===0}>Previous Workout</Button></Col>
        <Col><Button onClick={nextHandle} disabled={curPosIndex===workoutsArray.length}>Next Workout</Button></Col>
      </Row>
    </Container>
  )
}
export default WorkoutDisplay;