import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import DropDown from "react-bootstrap/DropDown";
import GroupList from "../Components/GroupList.jsx"
import {useNavigate , Outlet } from "react-router-dom";

function Exercises(){
  const [data,setData] = useState([]);
  //const [groupedData,setGroupedData] = useState({});
  const [group,setGroup] = useState("Difficulty Level");
  const [groupData,setGroupData] = useState([]);
  const [availData,setAvailData] = useState([]);
  const [searchVal , setSearchVal] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    axios.get('http://localhost:3001/exercises')
    .then((response)=>{
      //console.log(response);
      setData(response.data);
      setAvailData(response.data)
    });
  },[]);
  /*useEffect(()=>{
    console.log(data);
  },[data])*/

  useEffect(()=>{
    var groupName;
    if(group === "Difficulty Level"){groupName = 'difficulty_level'}
    else if(group === "Muscle Group"){groupName = 'target_muscle_group'}
    else {groupName = 'primary_equipment'}
    var groupedData = {}
    for(var i = 0;i<availData.length;i++){
      const curDiff = availData[i][groupName];
      const tObj = availData[i];  
      //setGroupedData(...groupedData,tObj);
      //groupedData[curDiff] = [...groupedData[curDiff],tObj];
      if(groupedData[curDiff] === undefined)groupedData[curDiff] =[tObj];
      else groupedData[curDiff].push(tObj);
    }
    setGroupData(groupedData);
  },[group,availData]);

  /*useEffect(()=>{
    console.log(groupData)
  },[groupData])*/

  const searchHandle = ()=>{
    //setAvailData(data);
    //console.log(data[0]);
    const l = data.length;
    const tData = []
    const regexp = new RegExp(searchVal,'i')
    //console.log(searchVal);
    for(var i = 0;i<l;i++){
      if(data[i]['exercise'].search(regexp) !== -1
       || (data[i]['exercise_classification'] !== null &&  data[i]['exercise_classification'].search(regexp)!== -1)
       || (data[i]['target_muscle_group'] !== null && data[i]['target_muscle_group'].search(regexp)!== -1) ){
        //console.log("hi");
        tData.push(data[i]);
      }
    }
    //console.log(tData)
    setAvailData(tData);
    //console.log(availData)
  }


  return (
    <Container>
      <Row>
        <Col>
          <InputGroup className="mb-3" onChange={(e)=>{setSearchVal(e.target.value)}}>
            <Form.Control placeholder="Search here..." aria-label="search-bar" aria-describedby="search-bar"/>
          </InputGroup>
        </Col>
        <Col>
          <Button onClick={searchHandle}>Search</Button>
        </Col>
        <Col>
          <DropDown>
            <DropDown.Toggle id="filter-drop">
              Group By : {group}
            </DropDown.Toggle>
            <DropDown.Menu>
              <DropDown.Item value="diffLevel" onClick={()=>{setGroup("Difficulty Level")}}>Difficulty Level</DropDown.Item>
              <DropDown.Item value="targetGroup" onClick={()=>{setGroup("Muscle Group")}}>Target Muscle Group</DropDown.Item>
              <DropDown.Item value="priEquipment" onClick={()=>{setGroup("Equipment")}}>Primary Equipment</DropDown.Item>
            </DropDown.Menu>
          </DropDown>
        </Col>
      </Row>
      <GroupList groupData={groupData}  />
    </Container>
  )
}
export default Exercises;