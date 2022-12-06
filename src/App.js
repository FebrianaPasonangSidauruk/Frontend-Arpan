import './App.css';
import { Route, Routes} from "react-router-dom";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Projects from './components/Projects/Projects';
import UserProfile from './components/Profile/UserProfile';
import Audit from './components/Audit/Audit';
import WarehouseReporting from './components/WarehouseReporting/WarehouseReporting';
import Prepaid from './components/Visualization/Prepaid/Prepaid';
import Pointer from './components/Visualization/Pointer/Pointer';
import DigitalVAS from './components/Visualization/DigitalVAS/DigitalVAS';
import Basi from './components/Visualization/Basi/Basi';
import UserManagement from './components/UserManagement/UserManagement';


function App() {
  return (
    <Routes>
      <>
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/" exact element={<Login />} />
        <Route path="/dashboard/projectList" exact element={<Projects />} />
        <Route path='/dashboard/profile/:id' exact element={<UserProfile/>}/>
        <Route path='/dashboard/audit' exact element={<Audit/>}/>
        <Route path='/dashboard/visualization/prepaid' exact element={<Prepaid/>}/>
        <Route path='/dashboard/visualization/pointer' exact element={<Pointer/>}/>
        <Route path='/dashboard/visualization/digitalvas' exact element={<DigitalVAS/>}/>
        <Route path='/dashboard/visualization/basi' exact element={<Basi/>}/>
        <Route path='/dashboard/warehouse' exact element={<WarehouseReporting/>}/>
        <Route path='/dashboard/usermanagement' exact element={<UserManagement/>}/>
        
      </>
    </Routes>
  );
}

export default App;
