import { useState ,useEffect} from "react"
import axios from 'axios'
import { Modal,Button } from "react-bootstrap"
const StudentList = () => {
    const [students, setStudents] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [studentId, setStudentId] = useState('')
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const token = localStorage.getItem('token')

    useEffect(() => {
        let isMounted = true;  

        axios({
            method: 'GET',
            url: 'https://library-app-mern.herokuapp.com/api/studentlist',
            headers: {
                'authorization' : `Bearer ${token}`
            },

        }).then(res => setStudents(res.data))

        return () => { isMounted = false }; 
      }, [token]); 

    

    const BooksBorrowed = (props) => {
        const booksBorrowed = props.booksBorrowed
        console.log(booksBorrowed)
        if(booksBorrowed.length === 0){
            console.log('no books')
            return ''
        }
        return(
            booksBorrowed.map(book => {
                return <li key={book._id}>{book.title}</li>
            })
        )
    }

    const Student =(props) =>{

        const booksBorrowed = props.booksBorrowed 
        const firstName = props.firstName
        const lastName = props.lastName
        const studentId = props.studentId


        return(
            <tr>
                <td>
                  <h6>{studentId}</h6>
                </td>
            <td>
                <h6>{firstName}</h6>
            </td>
            <td>
                <h6>{lastName}</h6>
                </td>
            <td>
                <ul style={{ listStyleType: "none" }}>

                    <BooksBorrowed key={studentId} booksBorrowed={booksBorrowed}/>
                    
                </ul>
            </td>
        </tr>
        )

    }


    const Students = (props) => {
        return props.students.map(student => {
            const {firstName,lastName,booksBorrowed,studentId} = student
            const id = student._id
            return(
                    <Student key= {id} studentId={studentId} firstName={firstName} lastName={lastName} booksBorrowed={booksBorrowed}/>
            )
        })
    }

    const handleSubmit = (e) => {
        axios({
            method: 'POST',
            url: 'https://library-app-jet.herokuapp.com/api/addstudent',
            data: {
                studentId,
                firstName,
                lastName
            },
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            if(res.data === 'failed to add student'){
                alert('failed to add student')

            }else{
                alert('STUDENT ADDED')
                setStudents([...students, res.data])
                setFirstname('')
                setLastname('')
                setStudentId('')
            }


        })
    }

    const addStudentOverlay = () => {

        const onStudentIdChange = (e) =>{
            setStudentId(e.target.value)
        }

        const onFirstNameChange = (e) => {
            setFirstname(e.target.value)    
        }

        const onLastNameChange = (e) => {
            setLastname(e.target.value)
        }
        const numberOnly = (e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }
        
        
        return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Student</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form>
                    <div className="form-group">
                        <label htmlFor="firstName">Student ID Number</label>
                        <input className="form-control" id="studentId" onKeyPress={numberOnly} value={studentId} aria-describedby="studentId" onChange={onStudentIdChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input className="form-control" id="firstName" value={firstName} aria-describedby="firstname" onChange={onFirstNameChange}></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastname">Last Name</label>
                        <input className="form-control" id="lastName" value={lastName} onChange={onLastNameChange}></input>
                    </div>
                </form>                      

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Add Student
                </Button>
              </Modal.Footer>
            </Modal>            
        )
    }

    return ( 
        <div>
            {addStudentOverlay()}
            <div className="d-flex justify-content-between align-items-center">
                <div className="mt-5 ms-5 h1">
                    STUDENT LIST
                </div>
                <div className="me-5">
                    <button className="btn btn-primary mt-5" type="button" onClick={handleShow}>Add Student</button>
                </div>
            </div>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Book/s Borrowed</th>
                </tr>
            </thead>
            <tbody>
                {<Students students={students}/>}
            </tbody>
        </table>
        </div>
     );
        
    }

 
export default StudentList;