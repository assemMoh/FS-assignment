import { Login } from './pages/Login';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Register } from './pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/main' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
      
      </Routes>
    </div>
  );
}

export default App;
