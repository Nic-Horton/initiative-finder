import './App.css';
import Crud from './Component/Crud';
import Navbar from "./Component/Navbar";
import Dashboard from "./Pages/Dashboard";
import InitiativeTracker from "./Pages/InitiativeTracker";
import Login from "./Pages/Login";
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Crud />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/initiativetracker" element={<InitiativeTracker />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
