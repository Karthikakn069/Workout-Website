import React ,{useEffect , useState}from "react";
//import Button from "react-bootstrap/esm/Button";
import ExerciseCard from "./ExerciseCard.jsx";
import Pagination from 'react-bootstrap/Pagination';
import Row from "react-bootstrap/esm/Row.js";
import Col from "react-bootstrap/esm/Col.js";

function ExerciseGroup({exercises}){

  const [exeCards , setExeCards] = useState([]);
  const [activePage,setActivePage] = useState(1);
  const [noOfPages,setNoOfPages] = useState();
  const [pageItems,setPageItems] = useState([]);
  const [curCards,setCurCards] = useState([]);


  useEffect(()=>{
    //console.log(exercises);
    const l = exercises.length;
    var tCards = [];
    for(var i = 0;i<l;i++){
      tCards.push(<ExerciseCard key = {i} exercise={exercises[i]} />)
    }
    setNoOfPages(Math.ceil(l/4));
    setExeCards(tCards);
  },[exercises]);

  useEffect(()=>{
    let items = [];
    for(var i = 1;i<=noOfPages;i++){
      const k = i;
      items.push(
        <Pagination.Item key={i} active = {activePage === i} onClick={()=>{setActivePage(k)}}>{i}</Pagination.Item>
      )
    }
    setPageItems(items);
    const start = (activePage-1)*4;
    const tcurCards =[exeCards[start],exeCards[start+1],exeCards[start+2],exeCards[start+3]];
    setCurCards(tcurCards);
  },[noOfPages,activePage,exeCards])
  



  return (
    <div>
      <Row>
        {curCards.map((item)=>{
          return <Col>{item}</Col>;
        })}
      </Row>

      <div>
        <Pagination>
          <Pagination.First onClick={()=>{setActivePage(1)}} />
          <Pagination.Prev onClick={()=>{setActivePage(activePage-1)}} disabled={activePage === 1} />
          <Pagination.Item onClick={()=>{setActivePage(1)}} active={1 === activePage}>{1}</Pagination.Item>
          {/* <Pagination.Item onClick={()=>{setActivePage(2)}} active={2 === activePage}>{2}</Pagination.Item> */}
          {/* {!elli1?<Pagination.Ellipsis onClick={()=>{setElli1(true)}} />:<InputGroupText>ADf</InputGroupText>} */}
          {/* {activePage>2?<Pagination.Item>{activePage-1}</Pagination.Item>:<></>} */}
          {<Pagination.Item>
            <input placeholder="Page Number" value={activePage} onChange={(e)=>{setActivePage(e.target.value)}}  style={{width:'27px',height:'24px',border:'1px thin gray'}}/>
          </Pagination.Item>}
          {/* {activePage<noOfPages-2?<Pagination.Item>{activePage+1}</Pagination.Item>:<></>}
          <Pagination.Item>{activePage+1}</Pagination.Item> */}
          {/* <Pagination.Ellipsis/> */}
          <Pagination.Item onClick={()=>{setActivePage(noOfPages)}} active = {noOfPages === activePage}>{noOfPages}</Pagination.Item>
          <Pagination.Next onClick={()=>{setActivePage(activePage+1)}} disabled={activePage === noOfPages} />
          <Pagination.Last onClick={()=>{setActivePage(noOfPages)}} />
          {/* {pageItems} */}
        </Pagination>
      </div>
      {/* <Button href="/exercise">Back</Button> */}
    </div>
  )

}
export default ExerciseGroup;