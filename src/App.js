import './App.css';
import Crud from './Component/Crud';
import { Routes, Route } from 'react-router-dom';
import InitiativeTracker from './Pages/InitiativeTracker';
import Login from './Pages/Login';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Crud />} />
				<Route path="/tracker" element={<InitiativeTracker />} />
				<Route path="/Login" element={<Login />} />
			</Routes>
		</div>
	);
}

export default App;
