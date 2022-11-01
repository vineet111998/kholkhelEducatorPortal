import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SignInPage from './pages/signInPage';
import SignUpPage from './pages/signUpPage';
import  Dashboard  from './components/dashboard/Dashboard';
import MapActivity from './components/mapActivity';
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignInPage/>}/>
        <Route exact path="/:cypherData" element={<SignInPage/>}/>
        <Route exact path="/register" element={<SignUpPage/>}/>
        <Route exact path="/register/:cypherData" element={<SignUpPage/>}/>
        <Route exact path="/home" element={<Dashboard/>}/>
        <Route exact path="/home/:cypherData" element={<Dashboard/>}/>
        <Route exact path="/activity" element={<MapActivity/>}/>
      </Routes>
  </Router>
  );
}

export default App;
