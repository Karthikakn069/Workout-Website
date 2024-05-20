import React from "react";
import {Container , Row} from "react-bootstrap";

function WorkoutCard({workout}){

  if(workout === "break"){
    return (
      <Container>
        <h1>Take a Break</h1>
      </Container>
    )
  }

  const imageId = workout.short_youTube_demonstration.slice(-11);
  return(
    <Container fluid>
      <Row>
        <h1>{workout.exercise}</h1>
      </Row>
      <Row lg="2">
        <iframe width="320" height="315" src={`https://www.youtube.com/embed/${imageId}?autoplay=1&loop=1&mute=1&playlist=${imageId}`} title="YouTube video player"
          frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin" autoplay = "1" allowFullscreen style={{pointerEvents:'none'}}>
        </iframe>
      </Row>
    </Container>
  )
}
export default WorkoutCard;