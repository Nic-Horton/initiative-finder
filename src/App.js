
import './App.css';
import { Route, Routes } from "react-router-dom";
import  Login  from "./components/Login"



function App() {
  const imageURL= "https://wallpapercave.com/wp/wp2427540.jpg";
  return (
    
    <div className="App" style={{
      backgroundImage: `url(${imageURL})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      height: "100vh",
      width: "100%",
    }}>
      <header className="App-header">
        <Login />

        <Routes>
          <Route path="/Login" element={<Login />} />
          
        </Routes>

      </header>
    </div>
  );
}

export default App;
