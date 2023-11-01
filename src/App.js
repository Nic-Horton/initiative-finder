
import './App.css';
import { Route, Routes } from "react-router-dom";
import  Login  from "./components/Login"
import Register from './components/Register';



function App() {
  const imageURL= "https://wallpapercave.com/wp/wp2427540.jpg";
  return (
    
    <div className="App" style={{
      backgroundImage: `url(${imageURL})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100%",
      width: "100%",
    }}>
      <header className="App-header">

      
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register/>} />

        </Routes>

      </header>
    </div>
  );
}

export default App;
