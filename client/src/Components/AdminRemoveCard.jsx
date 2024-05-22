import React ,{useState}from "react";
import { Container,Card,Button,Row,Col } from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom"

function AdminRemoveCard({detail}){
  const [removeElement,setRemoveElement] = useState({})

  function RemoveComponent({detail}){
    const navigate = useNavigate();

    const removeHandle = () =>{
      axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete_exercise/${detail.id}`)
      .then((response)=>{
        //console.log(response.data);
        setRemoveElement({});
        navigate(0);
      })
    }


    return(
      <Container className ="final-remove-alert" style={{position:'fixed',border:'2px solid black',top:'30px',left:'500px',width:'550px',padding:'10px 10px 10px 10px'}}>
        <Row><h4>Are you sure that you want to remove this exercise ?</h4></Row>
        <Row className="md-2">
          <Col>{detail.exercise}</Col>
        </Row>
        <Row className="mt-2">
          <Col><Button onClick={removeHandle}>Yes</Button></Col>
          <Col><Button onClick={()=>{setRemoveElement({})}}>No</Button></Col>
        </Row>
      </Container>
    )
  }
  
  return(
    <Container fluid>
      <Card className="p-2">
        <Card.Title style={{minHeight:'85px'}}>{detail.exercise}</Card.Title>
        <Card.Text>
          <h6>id : {detail.id}</h6>
          <h6>Difficulty Level: {detail.difficulty_level}</h6>
          <h6>Target Muscle Group : {detail.target_muscle_group}</h6>
        </Card.Text>
        <Button onClick={()=>{setRemoveElement(detail)}}>Remove</Button>
      </Card>
      {removeElement.id === undefined?<></>:<RemoveComponent detail={detail} />}
    </Container>
  )
}

export default AdminRemoveCard;