import React ,{useState}from "react";
import { Container ,Row,Col,Dropdown,Form,InputGroup,Button} from "react-bootstrap";
import axios from "axios";
import AdminRemoveElements from "./AdminRemoveElements";

function AdminRemove(){
  const [selectOption,setSelectOption] = useState('Id');
  const [searchValue,setSearchValue] = useState('12');
  const [data,setData] = useState([]);
  

  const searchHandle = () =>{
    let value = '';
    if(selectOption === 'Id'){value = 'id';} 
    else if(selectOption === 'Exercise Name') {value = 'exercise';}
    else if(selectOption === 'Difficulty Level') {value = 'difficulty_level';}
    else {value ='target_muscle_group';}
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/get_list/${value}/${searchValue}`)
    .then((response)=>{
      setData(response.data);
      //console.log(response.data);
    })
  }

  return(
    <Container>
      <Row className="mt-3">
        <Col lg="3">
          <Dropdown>
            <Dropdown.Toggle>Select By: {selectOption}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={(e)=>{setSelectOption("Id")}}>id</Dropdown.Item>
              <Dropdown.Item onClick={(e)=>{setSelectOption('Exercise Name')}}>Exercise Name</Dropdown.Item>
              <Dropdown.Item onClick={(e)=>{setSelectOption("Difficulty Level")}}>Difficulty Level</Dropdown.Item>
              <Dropdown.Item onClick={(e)=>{setSelectOption("Target Muscle Group")}}>Target Muscle Group</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col lg="4">
          <InputGroup>
            <InputGroup.Text>Search By:</InputGroup.Text>
            <Form.Control placeholder="Search Value" onChange={(e)=>{setSearchValue(e.target.value)}}></Form.Control>
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={searchHandle}>Search</Button>
        </Col>
      </Row>
      <Row>
        {/* <Card>
          <Card.Body></Card.Body>
        </Card> */}
        {data.length > 0?<AdminRemoveElements data={data}/>:<></>}
        
      </Row>
    </Container>
  )
}

export default AdminRemove;