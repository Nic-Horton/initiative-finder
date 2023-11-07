import './App.css';
import Toolbar from '@mui/material/Toolbar';
import Navbar from './Component/Navbar';
import Dashboard from './Pages/Dashboard';
import InitiativeTracker from './Pages/InitiativeTracker';
import Login from './Pages/Login';
import Register from './Component/Register';
import { Routes, Route } from 'react-router-dom';
import { Auth } from './Component/Auth';
import Home from './Pages/Home';
import Crud from './Component/Crud';

function App() {
	return (
		<div>
			<Navbar />
			<Toolbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/tracker" element={<InitiativeTracker />} />
				<Route path="/login" element={<Login />} />
				{/* <Route path="/dashboard" element={<Dashboard />} /> */}
				<Route path="/crud" element={<Crud />} />
			</Routes>
		</div>
	);
}

export default App;
