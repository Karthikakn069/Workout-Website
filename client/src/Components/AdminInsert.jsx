import React,{useState} from "react";
import {Container,InputGroup,Form,Row,Col,Button} from "react-bootstrap"
import axios from "axios";


function AdminInsert(){

  const [exerciseName,setExerciseName] = useState('');
  const [exeDemo,setExeDemo] = useState('');
  const [exeInDepth,setExeInDepth] = useState('');
  const [exerciseDifficulty,setExerciseDifficulty] = useState('');
  const [targetMuscle,setTargetMuscle] = useState('');
  const [primeMover,setPrimeMover] = useState('');
  const [secMover , setSecMover] = useState('');
  const [terMover,setTerMover] = useState('');
  const [equipNeeded,setEquipNeeded]=useState('');
  const [posture,setPosture] = useState('');
  const [bodyRegion,setBodyRegion] = useState('');
  const [movePattern,setMovePattern] = useState('');
  const [planeOfMotion,setPlaneOfMotion] = useState('');
  const [laterality,setLaterality] = useState('');

  const submitHandler = ()=>{
    if(exerciseName === '') return alert("Enter Exercise Name");
    if(exeDemo === '') return alert("Enter Exercise Link");
    if(exerciseDifficulty === '') return alert("Enter Exercise Difficulty");
    if(targetMuscle === '') return alert("Enter Target Muscle");
    if(primeMover === '') return alert("Enter Prime Mover Muscle");
    if(equipNeeded === '') setEquipNeeded("Bodyweight");
    if(posture === '') return alert("Enter Posture");
    if(bodyRegion === '') return alert("Enter Body Region");
    if(movePattern === '') return alert("Enter Move Pattern");
    if(planeOfMotion === '') return alert("Enter Plane Of Motion");
    if(laterality === '') return alert("Enter Laterality");
    console.log(exerciseName)
    axios.post(`${process.env.REACT_APP_BACKEND_URL}/insert_exercises`,{exerciseName:exerciseName, exeDemo:exeDemo,exeInDepth:exeInDepth,exerciseDifficulty:exerciseDifficulty,
      targetMuscle:targetMuscle, primeMover:primeMover,secMover:secMover,terMover:terMover,equipNeeded:equipNeeded,posture:posture,
      bodyRegion:bodyRegion,movePattern:movePattern,planeOfMotion:planeOfMotion,laterality:laterality
    }).then((response)=>{
      console.log(response);
    })
  }

  return(
    <Container className="mt-4">
      <InputGroup>
        <InputGroup.Text aria-required>Exercise Name</InputGroup.Text>
        <Form.Control placeholder="Exercise name" onChange={(e)=>{setExerciseName(e.target.value);}}/>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Exercise demo link</InputGroup.Text>
        <Form.Control placeholder="Enter the URL of demo video" onChange={(e)=>{setExeDemo(e.target.value)}}/>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Exercise Indepth Video link</InputGroup.Text>
        <Form.Control placeholder="Enter the URL of demo video"onChange={(e)=>{setExeInDepth(e.target.value)}}/>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Exercise Difficulty Level</InputGroup.Text>
        <Form.Control placeholder="Enter the difficulty level" onChange={(e)=>{setExerciseDifficulty(e.target.value)}}/>
      </InputGroup>
      <InputGroup>
        <InputGroup.Text>Exercise Target Muscle group</InputGroup.Text>
        <Form.Control placeholder="Enter the target muscle" onChange={(e)=>{setTargetMuscle(e.target.value)}}/>
      </InputGroup>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text>Prime_mover_muscle</InputGroup.Text>
            <Form.Control placeholder="Enter muscle" onChange={(e)=>{setPrimeMover(e.target.value)}}/>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>Secondary_mover_muscle</InputGroup.Text>
            <Form.Control placeholder="Enter muscle" onChange={(e)=>{setSecMover(e.target.value)}}/>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>Tertiary_mover_muscle</InputGroup.Text>
            <Form.Control placeholder="Enter muscle" onChange={(e)=>{setTerMover(e.target.value)}}/>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text>Equipment Needed</InputGroup.Text>
            <Form.Control placeholder="Enter equipment" onChange={(e)=>{setEquipNeeded(e.target.value)}}/>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>Posture</InputGroup.Text>
            <Form.Control placeholder="Enter posture" onChange={(e)=>{setPosture(e.target.value)}} />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>Body Region</InputGroup.Text>
            <Form.Control placeholder="Enter body region" onChange={(e)=>{setBodyRegion(e.target.value)}} />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <InputGroup>
            <InputGroup.Text>Movement Pattern</InputGroup.Text>
            <Form.Control placeholder="Enter movement pattern" onChange={(e)=>{setMovePattern(e.target.value)}}/>
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>Plane of Motion</InputGroup.Text>
            <Form.Control placeholder="Enter plane of motion" onChange={(e)=>{setPlaneOfMotion(e.target.value)}} />
          </InputGroup>
        </Col>
        <Col>
          <InputGroup>
            <InputGroup.Text>Laterality</InputGroup.Text>
            <Form.Control placeholder="Enter laterality" onChange={(e)=>{setLaterality(e.target.value)}} />
          </InputGroup>
        </Col>
      </Row>
      <Button className="mt-2" onClick={submitHandler}>Add Exercise</Button>
    </Container>
  )
}
export default AdminInsert;
