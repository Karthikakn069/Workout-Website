import React,{useEffect,useState} from "react";
import {Container , Row,Col,Pagination,Form} from "react-bootstrap"
import AdminRemoveCard from "./AdminRemoveCard.jsx"


function AdminRemoveElements({data}){
  const [curPage,setCurPage] = useState(1);
  const [curElements,setCurElements] = useState([]);
  const [totPages,setTotPages] = useState(0);
  const noOfPages = 5;


  useEffect(()=>{
    setTotPages(data.length /noOfPages);
    let tEle = [];
    for(let i = 0;i<noOfPages && i < data.length;i++){
      tEle.push(data[i]);
    }
    setCurElements(tEle);
    //console.log(data);
    //console.log(tEle);
  },[totPages,data])

  useEffect(()=>{
    let tEle = [];
    let startPos = (curPage-1)*5;
    if(!curPage || isNaN(curPage) || curPage > totPages) return ;
    if(data[startPos]['id'] === undefined) startPos = 0;
    for(let i = startPos;i<startPos+noOfPages && i < data.length;i++){
      tEle.push(data[i]);
    }
    setCurElements(tEle);
  },[curPage,data,totPages])



  return (
    <Container>
      <Row className="mt-3">
        {curElements.map((item)=>{
          return <Col key={item.id}><AdminRemoveCard detail={item}  /></Col>;
        })}
      </Row>
      <Row>
        <Pagination className="m-4">
          <Pagination.Prev disabled={curPage===1} onClick={()=>{setCurPage(curPage- 1)}} />
          <Pagination.Item>
            <Form.Control value={curPage} onChange={(e)=>{setCurPage(e.target.value)}} style={{width:'50px',height:'24px'}}/>
          </Pagination.Item>
          <Pagination.Next disabled={curPage===totPages} onClick={()=>{setCurPage(curPage+1)}}/>
        </Pagination>
      </Row>
    </Container>
  )

}
export default AdminRemoveElements;