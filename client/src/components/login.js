import { useState,  } from "react";
import axios from 'axios'
import {Navigate ,useNavigate} from 'react-router-dom'

const Login = () => {

  const [username , setUsername] = useState('')
  const [password , setPassword] = useState('')
  const navigate = useNavigate()

  const handleUsernameChange = (e) => {
    setUsername(e.target.value)
  }
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method: 'POST', 
      url: 'https://library-app-mern.herokuapp.com/api/login',
      data: {
        username,
        password
      }
    }).then(res => {
      localStorage.setItem('token', res.data.accessToken)
      localStorage.setItem('isLoggedIn', true)
      navigate('/home')
    })
    } 
     
    return ( 
    <div className='loginForm center container box-shadow'>
        <form onSubmit={handleSubmit}>
          <div className='form-group mt-5'>
          <label htmlFor='login' className='h1'>Login</label>
          </div>
          <div className='form-group mt-5'>
          <label htmlFor='username' className='fontsize'>Username</label>
          <input className='form-control' placeholder='Enter Username' onChange={handleUsernameChange}></input>
          </div>
          <div className='form-group mt-5'>
          <label htmlFor='password' className='fontsize' >Password</label>
          <input type='password' className='form-control' onChange={handlePasswordChange} placeholder='Enter Password'></input>
          </div>
          <button type="submit" className="btn btn-primary space">Login</button>
        </form>
    
    </div>
     );
}
 
export default Login;