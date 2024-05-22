import React , {useState} from "react";
import { Container,Row,Form,Col,InputGroup,Button} from "react-bootstrap";
import AdminInsert from "../Components/AdminInsert.jsx"
import AdminRemove from "../Components/AdminRemove.jsx";

function Admin(){

  const [typeSwitch,setTypeSwitch] = useState(true);//def = true
  const [adminLogin,setAdminLogin] = useState(false);//def = false

  const adminHandler = ()=>{
    const adminName = document.getElementById('admin-name').value, adminPassword = document.getElementById('admin-password').value;
    if(adminName === 'admin' && adminPassword ==='thisisadmin'){
      setAdminLogin(true);
      alert('welcome admin');
    }
    else{
      alert('wrong admin name and password')
    }
  }

  if(adminLogin === false){
    return(
      <Container>
        <InputGroup className = "w-50">
          <InputGroup.Text aria-required>Admin Name</InputGroup.Text>
          <Form.Control placeholder="Exercise name" id="admin-name"/>
        </InputGroup>
        <InputGroup className="w-50 mt-2">
          <InputGroup.Text aria-required>Admin Password</InputGroup.Text>
          <Form.Control placeholder="Exercise name" id="admin-password" type="password"/>
        </InputGroup>
        <Button onClick ={adminHandler} className="mt-2">Login</Button>
      </Container>
    )
  }

  return(
    <Container>
      <Row className="mb-3">
        <Row>
          <h1>Welcome Admin</h1>
          <h5>This is the place where you can add and remove exercise into the database</h5>
        </Row>
      </Row>
      <Form>
        <Row lg="4">
          <Col><Form.Check type="radio" id="admin-insert" label="Insert Exercise" onChange={()=>setTypeSwitch(true)} checked={typeSwitch===true} /></Col>      
          <Col><Form.Check type ="radio" id="admin-delete" label="Delete Exercise" onChange={()=>{setTypeSwitch(false)}} checked={typeSwitch===false} /></Col>
        </Row>
      </Form>
      {typeSwitch?<AdminInsert/>:<AdminRemove/>}
    </Container>
  )
}


export default Admin;