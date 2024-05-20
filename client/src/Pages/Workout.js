import React , {useState} from "react";
import { Form ,Container,Row,Col,Button} from "react-bootstrap";
import axios from "axios";
import WorkoutGenerated from "../Components/WorkoutGenerated.jsx"

function WorkOut(){
  const [duration,setDuration] = useState(10);
  const [generatedWorkout,setGeneratedWorkout] = useState([]);
  const submitHandler = () =>{
    let tMuscleGroup = [] , tEquipmentGroup = [] , count = 0;
    if(document.getElementById("abs-group").checked === true){
      tMuscleGroup.push("Abdominals");
      tMuscleGroup.push("Abductors");
      tMuscleGroup.push("Adductors");
      tMuscleGroup.push("Hip Flexors");
      count++;
    }
    if(document.getElementById("chest-group").checked === true){
      tMuscleGroup.push("Chest");
      tMuscleGroup.push("Trapezius");
      count++;
    }
    if(document.getElementById("arms-group").checked === true){
      tMuscleGroup.push("Biceps");
      tMuscleGroup.push("Triceps");
      tMuscleGroup.push("Forearms");
      count++;
    }
    if(document.getElementById("back-group").checked === true){
      tMuscleGroup.push("Back");
      tMuscleGroup.push("Shoulders");
      count++;
    }
    if(document.getElementById("legs-group").checked === true){
      tMuscleGroup.push("Quadriceps");
      tMuscleGroup.push("Hamstrings");
      tMuscleGroup.push("Glutes");
      count++;
    }
    if(count < 2){
      return alert("Select atleast two muscle group");
    }
    tEquipmentGroup.push("Bodyweight");
    if(document.getElementById("eqi-barbell").checked){
      tEquipmentGroup.push("Barbell");
    }
    if(document.getElementById("eqi-plate").checked){
      tEquipmentGroup.push("Weight Plate");
    }
    if(document.getElementById("eqi-band").checked){
      tEquipmentGroup.push("Barbell");
    }
    if(document.getElementById("eqi-ball").checked){
      tEquipmentGroup.push("Superband");
      tEquipmentGroup.push("Resistance Band")
    }
    if(document.getElementById("eqi-cable").checked){
      tEquipmentGroup.push("Cable");
    }
    axios.post("http://localhost:3001/get_workouts",{muscleGroup:tMuscleGroup,equipmentsGroup:tEquipmentGroup})
    .then((response)=>{
      setGeneratedWorkout(response.data);
      //console.log(response.data);
    });
  }

  if(generatedWorkout.length !== 0){
    return(
      <Container>
        <WorkoutGenerated workouts={generatedWorkout} duration={duration} />
        <Button onClick={()=>{setGeneratedWorkout([])}} id="workout-button" >Back</Button>
      </Container>
    )
  }

  return (
    <Container>
      <h2 style={{textAlign:'center'}}>Workout Generator</h2>
      <Form> 
        <Form.Group className="target-muscle-group">
          <Form.Label>Select the target muscle</Form.Label>
          <Row lg="6">
            <Col lg="1"><Form.Check label="Abs" value="abs" id="abs-group"/></Col>
            <Col lg="1"><Form.Check label="Chest" value="chest" id="chest-group"/></Col>
            <Col lg="1"><Form.Check label="Arms" value="arms" id="arms-group"/></Col>
            <Col lg="1"><Form.Check label="Back" value="back" id="back-group"/></Col>
            <Col lg="1"><Form.Check label="Legs" value="legs" id="legs-group"/></Col>
          </Row>
        </Form.Group>
        <Form.Group className="equipment-group mt-2">
          <Form.Label>Select the Equipment you have</Form.Label>
          <Row lg="8">
            <Col lg="2"><Form.Check label="Barbell" id="eqi-barbell"/></Col>
            <Col lg="2"><Form.Check label="Weight Plate" id="eqi-plate"/></Col>
            <Col lg="2"><Form.Check label="Resistance Band" id="eqi-band"/></Col>
            <Col lg="2"><Form.Check label="Stability Ball" id="eqi-ball"/></Col>
            <Col lg="2"><Form.Check label="Cable" id="eqi-cable"/></Col>
          </Row>
        </Form.Group>
        <Form.Group className="time-group mt-2">
          <Form.Label>Select the duration of your workout</Form.Label>
          <Form.Select aria-label="time-select" style={{width:'200px'}} onChange={(e)=>{setDuration(e.target.value)}}>
            <option value={10}>10 minutes</option>
            <option value={15}>15 minutes</option>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
          </Form.Select>
        </Form.Group>
        <Button className="mt-2" onClick={submitHandler}>Generate Workout</Button>
      </Form>
    </Container>
  )
}
export default WorkOut;