import axios from 'axios';
import {Form, Button} from 'react-bootstrap'
import { useState , useEffect} from 'react';

const LendBook = () => {

    const [studentId, setStudentId] = useState('')
    const [bookId , setBookId] = useState('');
    const token = localStorage.getItem('token')
    

    const handleSubmit = (e) =>{
        e.preventDefault()
        axios({
            method: 'POST',
            url: 'http://localhost:5000/lendbook',
            data: {
                studentId,
                bookId
            },
            headers: {
                'authorization' : `Bearer ${token}`
            }
        }).then(res => {
            setStudentId('')
            setBookId('')
            if(res.data != 'FAILED TO LEND BOOK')
            alert('Book Successfully Lended')
            else{
                alert('Book Lending Failed \n Try Again')
            }
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
                <p className='h1'>Lend Book</p>
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
            <Button className='mt-5' type='submit'>Lend Book</Button>
        </Form.Group>
        </Form>
            </div>
        </div>
     );
}
 
export default LendBook;