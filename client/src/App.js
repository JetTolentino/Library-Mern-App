import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/login'
import {Routes, Route, Link , Navigate} from 'react-router-dom'
import Home from './components/home'


function App() {

  return (
    <div className="App">


      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}>    
        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
