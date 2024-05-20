import React , {useEffect,useState} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {Row,Col,Container} from "react-bootstrap";

function ExerciseDetails({ide}){
  const {id} = useParams() || ide;
  const [data,setData] = useState({});
  const [imageId,setImageId] = useState();
  useEffect(()=>{
    axios.get(`http://localhost:3001/get_exercises/${id}`).then((response)=>{
      setData(response.data);
      console.log(response.data)
      if(response.data[0]['indepth_youtube_explanation'] !== null)
        setImageId(response.data[0]['indepth_youtube_explanation'].slice(-11));
    })
  },[id])
  if(data[0] === undefined) {
    return (
      <Container></Container>
    )
  }
  else{
    let targetMuscle = data[0]['target_muscle_group'] , exerciseName = data[0]['exercise'] , targetRegion = data[0]['body_region'];
    let targetArea = '' , equipment = data[0]['primary_equipment'];
    if(data[0]['prime_mover_muscle'] !== null) targetArea += data[0]['prime_mover_muscle'];
    if(data[0]['secondary_muscle'] !== null) targetArea = targetArea+','+data[0]['secondary_muscle'];
    if(data[0]['tertiary_muscle'] !== null) targetArea = targetArea+','+data[0]['tertiary_muscle'];
    let difficultyLevel = data[0]['difficulty_level'] , posture = data[0]['posture'];
    let movementPattern = data[0]['movement_pattern_1'] , planeOfMotion = data[0]['plane_of_motion_1'] , laterality = data[0]['laterality'];
    return(
      <Container>
        <Row><h1>{exerciseName}</h1></Row>
        <Row>
          <Col>
            <iframe width="560" height="315" style={{borderRadius:'25px'}}
              src={`https://www.youtube.com/embed/${imageId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullscreen>
            </iframe>
          </Col>
          <Col>
            <Row>
              <Col lg="4"><h5>Description:</h5></Col>
              <Col><p>{exerciseName} is an exercise that targets the {targetRegion} of the body particularly the {targetArea}.
              {equipment ==='Bodyweight'?<>You don't need any equipments to do this exercise.</>:<>You need {equipment} to do this exercise.</>}
              It is used to improve strength at {targetMuscle} muscle.
              </p></Col>
            </Row>
            <Row>
              <Col lg="4"><h5>Difficuty Level :</h5></Col>
              <Col>{difficultyLevel}</Col>
            </Row>
            <Row>
              <Col lg="4"><h5>Posture :</h5></Col>
              <Col>{posture}</Col>
            </Row>
            <Row>
              <Col lg="4"><h5>Movement Pattern :</h5></Col>
              <Col>{movementPattern}</Col>
            </Row>
            <Row>
              <Col lg="4"><h5>Plane of motion:</h5></Col>
              <Col>{planeOfMotion}</Col>
            </Row>
            <Row>
              <Col lg="4"><h5>Laterality:</h5></Col>
              <Col>{laterality}</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }

}
export default ExerciseDetails;