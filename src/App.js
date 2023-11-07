import './App.css';
import Toolbar from '@mui/material/Toolbar';
import Crud from './Component/Crud';
import Navbar from './Component/Navbar';
import Dashboard from './pages/Dashboard';
import InitiativeTracker from './pages/InitiativeTracker';
import Login from './pages/Login';
import Register from './Component/Register';
import { Routes, Route } from 'react-router-dom';
import { Auth } from './Component/Auth';
import Home from './pages/Home';
import AuthDetails from './Component/AuthDetails';

function App() {
	return (
		<div>
			<Navbar />
			<Toolbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/home" element={<Home />} />
				<Route path="/tracker" element={<InitiativeTracker />} />
				<Route path="/Login" element={<Login />} />
				{/* <Route path="/dashboard" element={<Dashboard />} /> */}
			</Routes>
			<AuthDetails />
		</div>
	);
}

export default App;
