import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ProductDetails from './components/ProductDetails';
import RequireAuth from './auth/RequireAuth';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route element={<RequireAuth/>}>
            <Route path='/details/:id' element={<ProductDetails/>}/>
          </Route>

        </Routes>

      </Router>
    </div>
  );
}

export default App;
