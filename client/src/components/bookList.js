import { useState ,useEffect} from "react"
import axios from 'axios'
import { Modal, Button } from "react-bootstrap"

const BookList = () => {
    const [books, setBooks] = useState([])
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [bookId , setBookId] = useState('');
    const token = localStorage.getItem('token')     

    useEffect(() => {
        let isMounted = true;
          
        axios({
            method: "GET",
            url: 'https://library-app-mern.herokuapp.com/api/booklist',
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
          if (isMounted) setBooks(res.data);    
        })
        return () => { isMounted = false }; 
      }, [token]); 


    const Book = (props) =>{
        const title = props.title
        const author = props.author
        const availability = props.availability
        const bookId = props.bookId

        const isAvailable = (availability)=>{
            if(availability === true){
                return(
                    <td className="text-success">Available</td>
                )

            }
            else{
                return <td className="text-danger">Unavailable</td>
            }
        }
        return(
            <tr>
            <td>{bookId}</td>
            <td>{title}</td>
            <td>{author}</td>
            {isAvailable(availability)}
        </tr>
        )

    }


    const Books = (props) => {
        return props.books.map(book => {
            const {title , availability , author ,bookId} = book
            const id = book._id
            return(
                    <Book  key={id} bookId={bookId} title={title} author={author} availability={availability}/>
            )
        })
    }

    const handleSubmit = (e) => {
        axios({
            method: 'POST',
            url : 'https://library-app-mern.herokuapp.com/api/addbook',
            data: {
                bookId,
                title,
                author
            },
            headers: {
                'authorization' : `Bearer ${token}`
            }
        }).then(res => {
            if(res.data === 'failed to add book'){
                alert('Failed to add book')
            }
            else{
                alert('Book Added!')
                setBooks([...books, res.data])
                setAuthor('')
                setTitle('')
                setBookId('')
            }


        })
    }

    const addBookOverlay = () => {
        const onBookIdChange = (e) =>{
            setBookId(e.target.value)
        }

        const onTitleChange = (e) => {
            setTitle(e.target.value)    
        }

        const onAuthorChange = (e) => {
            setAuthor(e.target.value)
        }
        const numberOnly = (e) => {
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }

        return (
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Book</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <form>
                    <div className="form-group">
                        <label htmlFor="BookId">Book ID Number</label>
                        <input className="form-control" id="bookId" onKeyPress={numberOnly} value={bookId} aria-describedby="bookId" onChange={onBookIdChange}></input>
                    </div>                  
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input className="form-control" id="title" value={title} onChange={onTitleChange} aria-describedby="booktitle"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <input className="form-control" id="author" value={author} onChange={onAuthorChange}></input>
                    </div>
                </form>                      

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Add Book
                </Button>
              </Modal.Footer>
            </Modal>            
        )
    }


    return ( 
        <div>
            {addBookOverlay()}
            <div className="d-flex justify-content-between align-items-center">
                <div className="mt-5 ms-5 h1">
                    BOOK LIST
                </div>    
                <div className="me-5">
                <button type="button" className="btn btn-primary mt-5" onClick={handleShow}>
                    Add Book
                </button>
                </div>
                
            </div>
            <table className="table mt-5">
            <thead>
                <tr>
                    <th>Book ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Availability</th>
                </tr>
            </thead>
            <tbody>
                {<Books books={books}/>}
                
            </tbody>
        </table>

        </div>

     );
}
 
export default BookList;