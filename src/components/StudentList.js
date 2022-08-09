import React from "react";
import { ButtonGroup, Card, Container, Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faTrash,faEdit } from "@fortawesome/free-solid-svg-icons";
export default function StudentList() {

  const [students, setStudents] = useState([]);

  useEffect(()=>{
    axios.get("http://localhost:8080/listStudents")
      .then(response=>setStudents(response.data))
      .catch(error=>alert(error));
  },[])


  let deleteRecord = (id)=>{
    axios.delete(`http://localhost:8080/student/${id}`)
    .then(response =>{
      if(response.data != null){
        alert("Record is deleted");
      }
    })
  }
  

  return (
    <div className="my-3">
      <Container>
        <Card.Header><h3>Students List</h3></Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Student Id</th>
                <th>Student Name</th>
                <th>Student Address</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
            { students.map((student) => 
              <tr>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.address}</td>
                <td>
                  <ButtonGroup>
                    <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit}>Edit</FontAwesomeIcon></Button>
                    <Button size="sm" variant="outline-danger" onClick={()=>deleteRecord(student.id)}><FontAwesomeIcon icon={faTrash}>Delete</FontAwesomeIcon></Button>

                  </ButtonGroup>
                </td>
              </tr>
            )}
              
            </tbody>
          </Table>
        </Card.Body>
      </Container>
    </div>
  );
}
