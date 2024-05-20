import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";

function ExerciseCard({exercise}){
  const navigate = useNavigate();
  //console.log(exercise)
  const img = exercise.short_youTube_demonstration;
  let imageId ;
  if(img !== null)
    imageId = img.slice(-11);
  else {
    imageId = "null";
  }
  const imageSrc = `https://i.ytimg.com/vi/${imageId}/maxresdefault.jpg`
  //console.log(imageId);
  return(
    <Card>
      <Card.Body>
        <Card.Img variant="top" src={imageSrc} style={{height:'150px'}} />
        <Card.Title style={{marginTop:'10px'}}>{exercise.exercise}</Card.Title>
        <Card.Text>
          <h6>Exercise Classification : {exercise.exercise_classification}</h6>
          <h6>Taget Muscle : {exercise.target_muscle_group}</h6>
          <h6>Equipment : {exercise.primary_equipment}</h6>
          <h6>Difficulty: {exercise.difficulty_level}</h6>
        </Card.Text>
        <Button onClick = {()=>{navigate(`/exercise_details/${exercise.id}`)}}>View Details</Button>
      </Card.Body>
    </Card>
  )
}
export default ExerciseCard;