import {React} from 'react';
import {Row,Col,Container} from "react-bootstrap"
function Home(){
  return (
    <Container className="d-flex justify-content-center align-items-center flex-column">
      <Row lg="12" className = "mt-lg-5 mt-3">
        <Col><h1 className="text-center">Welcome to the Workout Website</h1></Col>
      </Row>
      <Row lg="12" className = "mt-lg-5 mt-3">
        <Row><h5 className='text-center'>This website provides over thousands of exercise to pratice and learn</h5></Row>
      </Row>
      <Row className = "mt-lg-5 mt-3">
        <Row><h5 className='text-center'>Workout Generator can also be used to create a workout for your needs</h5></Row>
      </Row>
    </Container>
  )
}
export default Home;