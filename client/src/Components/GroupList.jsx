import React, { useEffect , useState } from "react";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/esm/Button";
import ExerciseGroup from "./ExerciseGroup";
import { Container } from "react-bootstrap";

function GroupList({groupData}){

  const [retRows,setRetRows]  = useState([]);
  const [groupRows,setGroupRows] = useState([]);

  useEffect(()=>{
    //console.log(groupData)
    var tRows = [];
    const keys = Object.keys(groupData);
    for(var i = 0;i<keys.length;i++){
      const curKey = keys[i];
      tRows.push(<div className="p-2" style={{
        display:'flex' , justifyContent :'space-between' , border : '2px solid gray' , marginBottom : '3px' , borderRadius : '10px'
      }} key={i}>
        <div>{keys[i]}</div>
        <div style={{display:'flex'}}>
          <div style={{margin:'3px 15px 3px 3px'}}>Exercises Available : {groupData[keys[i]].length}</div>
          <Button onClick={()=>{setGroupRows(groupData[curKey])}}>View</Button>
        </div>
      </div>
      )
    }
    setRetRows(tRows);
  },[groupData]);

  if(groupRows.length !== 0){
    return(
      <Container>
        <ExerciseGroup exercises={groupRows} />
        <Button onClick={()=>{setGroupRows([])}}>Back</Button>
      </Container>
    )
  }

  return (
    <Stack>
      {retRows.map((item)=>{
        return item;
      })}
    </Stack>
  );

}
export default GroupList;