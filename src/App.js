import './App.css';
import Crud from './Component/Crud';
import { Routes, Route } from 'react-router-dom';
import  Login  from "./components/Login"
import Register from './components/Register';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Crud />} />
        <Route path="/Login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
