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

import PDFFile from './components/Audit/PDFFile'

import TesProject from './components/Projects/Projects';

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
        <Route path='/dashboard/visualization' exact element={<Visualization/>}/>
        <Route path='/dashboard/warehouse' exact element={<WarehouseReporting/>}/>

        {/* <Route path="/tesaudit" exact element={<TesAudit />} /> */}
        <Route path="/pdf" exact element={<PDFFile />} />
        {/* <Route path="/dashboard/tesproject" exact element={<TesProject />} /> */}
      </>
    </Routes>
  );
}

export default App;
