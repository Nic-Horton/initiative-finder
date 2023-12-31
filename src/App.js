import './App.css';
import Crud from './Component/Crud';
import Dashboard from './Pages/Dashboard';
import InitiativeTracker from './Pages/InitiativeTracker';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';

// import Crud from './Component/Crud';

// function App() {
// 	return (
// 		<>
// 			<Navbar />
// 			<Toolbar />

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/tracker" element={<InitiativeTracker />} />
				<Route path="/login" element={<Login />} />
				<Route path="/crud" element={<Crud />} />
			</Routes>
			{/* <AuthDetails /> */}
		</div>
	);
}

export default App;
