import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Projects from './components/Projects/Projects';
import UserProfile from './components/Profile/UserProfile';
import Audit from './components/Audit/Audit';
import PDFFile from './components/Audit/PDFFile'

function App() {
  return (
    <Routes>
      <>
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard/projectList" exact element={<Projects />} />
        <Route path='/profile/:id' exact element={<UserProfile/>}/>
        <Route path='/dashboard/audit' exact element={<Audit/>}/>
        {/* <Route path="/tesaudit" exact element={<TesAudit />} /> */}
        <Route path="/pdf" exact element={<PDFFile />} />
      </>
    </Routes>
  );
}

export default App;
