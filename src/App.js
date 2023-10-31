import './App.css';
import Crud from './Component/Crud';
import { Routes, Route } from 'react-router-dom';
import InitiativeTracker from './Pages/InitiativeTracker';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Crud />}></Route>
				<Route path="/tracker" element={<InitiativeTracker />}></Route>
			</Routes>
		</div>
	);
}

export default App;
