import './App.css';
import Crud from './Component/Crud';
import { Routes, Route } from 'react-router-dom';
import  Dashboard  from './Pages/Dashboard';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Crud />}></Route>
				<Route path='/dashboard' element={<Dashboard />}></Route>
			</Routes>
		</div>
	);
}

export default App;
