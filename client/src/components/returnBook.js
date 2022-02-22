import axios from 'axios';
import {Form, Button } from 'react-bootstrap'
import { useState , useEffect} from 'react';
import StudentList from './studentList';



const ReturnBook = () => {
    const [studentId, setStudentId] = useState('')
    const [bookId , setBookId] = useState('');
    const token = localStorage.getItem('token')


    const handleSubmit = (e) =>{
        e.preventDefault()
        axios({
            method:'POST',
            url:'http://localhost:5000/returnbook',
            data : {
                studentId,
                bookId
            },
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            if(res.data != 'FAILED TO RETURN BOOK'){

                alert('Book Successfully Returned')
            }

            else{

                alert('Book Returning Failed\n Try Again')
            }
            setStudentId('')
            setBookId('')
        })
    }
    const numberOnly = (e) => {
        if (!/[0-9]/.test(e.key)) {
          e.preventDefault();
        }
      }

    const handleStudentIdChange = (e) => {
        setStudentId(e.target.value)
    }

    const handleBookIdChange = (e) => {
        setBookId(e.target.value)

    }

    return ( 
        
        <div className='d-block'>
            <div className='pt-5'>
                <p className='h1'>Return Book</p>
            </div>
            <div className="ms-5 me-5 pt-5">

            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
               <Form.Label>Enter Student ID Number</Form.Label>
               <Form.Control type="text" onKeyPress={numberOnly} value={studentId} onChange={handleStudentIdChange}/>

            </Form.Group>
          <Form.Group className="mb-3">
                <Form.Label>Enter Book ID Number</Form.Label>
                <Form.Control type="text" onKeyPress={numberOnly} value={bookId} onChange={handleBookIdChange}/>

        </Form.Group>
        <Form.Group className="mb-3">
            <Button className='mt-5' type='submit'>Return Book</Button>
        </Form.Group>
        </Form>
            </div>
        </div>
     );
}
 
export default ReturnBook;