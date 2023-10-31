import './App.css';
import Crud from './Component/Crud';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Crud />}></Route>
			</Routes>
		</div>
	);
}

export default App;
