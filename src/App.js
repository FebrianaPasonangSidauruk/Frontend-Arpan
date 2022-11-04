import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Projects from './components/Projects/Projects';
import UserProfile from './components/Profile/UserProfile';
import Audit from './components/Audit/Audit';
import DownloadDoc from './components/DownloadDoc/DownloadDoc';
import Visualization from './components/Visualization/Visualization';
import WarehouseReporting from './components/WarehouseReporting/WarehouseReporting';
import Prepaid from './components/Visualization/Prepaid';
import Pointer from './components/Visualization/Pointer';
import DigitalVAS from './components/Visualization/DigitalVAS';
import Basi from './components/Visualization/Basi';

import PDFFile from './components/Audit/PDFFile'


function App() {
  return (
    <Routes>
      <>
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard/projectList" exact element={<Projects />} />
        <Route path='/dashboard/profile/:id' exact element={<UserProfile/>}/>
        <Route path='/dashboard/audit' exact element={<Audit/>}/>
        <Route path='/dashboard/downloaddoc' exact element={<DownloadDoc/>}/>
        <Route path='/dashboard/visualization/prepaid' exact element={<Prepaid/>}/>
        <Route path='/dashboard/visualization/pointer' exact element={<Pointer/>}/>
        <Route path='/dashboard/visualization/digitalvas' exact element={<DigitalVAS/>}/>
        <Route path='/dashboard/visualization/basi' exact element={<Basi/>}/>
        <Route path='/dashboard/warehouse' exact element={<WarehouseReporting/>}/>
        <Route path="/pdf" exact element={<PDFFile />} />
      </>
    </Routes>
  );
}

export default App;
