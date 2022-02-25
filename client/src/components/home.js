import {Book, ArrowReturnLeft, PersonLinesFill ,CardList} from 'react-bootstrap-icons'
import React, {  useState } from 'react';
import BookList from './bookList';
import StudentList from './studentList';
import LendBook from './lendBook';
import ReturnBook from './returnBook';
import {Navigate , useNavigate} from 'react-router-dom'

function Home(){

    const [lendBook, setLendBook] = useState(false)
    const [returnBook, setReturnBook] = useState(false)
    const [bookList, setBookList] = useState(false)
    const [studentList, setStudentList] = useState(false)
    const navigate = useNavigate()



    const lendBookOnClick = () =>{
        setLendBook(true)
        setReturnBook(false)
        setBookList(false)
        setStudentList(false)
        return(
            <h1>Lend Book</h1>
        )
    }

    const returnBookOnClick = () =>{
        setLendBook(false)
        setReturnBook(true)
        setBookList(false)
        setStudentList(false)
        return(
            <h1>Return Book</h1>
        )
    }
    const bookListOnClick = () =>{
        setLendBook(false)
        setReturnBook(false)
        setBookList(true)
        setStudentList(false)
        return(
            <h1>Book list</h1>
        )
    }
    const studentListOnClick = () =>{
        setLendBook(false)
        setReturnBook(false)
        setBookList(false)
        setStudentList(true)
        return(
            <h1>Student List</h1>
        )
    }

    const handleLogout = (e) => {
        localStorage.removeItem('token')
        localStorage.removeItem('isLoggedIn')
        navigate('/login')
    }

    const AuthorizedHome = () =>{
        return (                    
                <div className='container-fluid home'>
                    <div className='d-flex justify-content-end'>
                        <div onClick={handleLogout} type='button' className='logout'>
                            Logout
                        </div>
                    </div>
                    <div className="row home">
                        
                        <div className="col-3 navbar">
                            <div className="clickable" onClick={lendBookOnClick}>
                                <Book/>
                                <span> Lend Book</span>
                            </div>
                            <div className="clickable" onClick={returnBookOnClick}>
                                <ArrowReturnLeft/>
                                <span>Return Book</span> 
                            </div>
                            <div className="clickable" onClick={bookListOnClick}>
                                <CardList/>
                                <span> Book List</span> 
                            </div>
                            <div className="clickable" onClick={studentListOnClick}>
                                <PersonLinesFill/>
                                <span> Student List</span> 
                            </div>

                        </div>
                        <div className="col-9 content-container">
                            <div className='content'>
                            {lendBook && <LendBook />}
                            {returnBook && <ReturnBook />}
                            {bookList && <BookList/>}
                            {studentList && <StudentList/>}
                            </div>  
                        </div>
                    </div>

                </div>
                )
    }

    const UnAuthorized = () => {
        return <Navigate to='/login' />
    }



    return(
        <div>
            {localStorage.getItem('isLoggedIn') ? <AuthorizedHome /> : <UnAuthorized/>}
        </div>


    )
}
 
export default Home;
