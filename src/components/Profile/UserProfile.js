import React, { useState, useContext, useEffect } from "react";
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './UserProfile.css'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import profilePict from '../img/profile.jpg';

const UserProfile = () => {

    const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [employee_title, setEmployeeTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [division, setDivision] = useState("");
  const [sub_directorate, setSubDirectorate] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const {id} = useParams()

  useEffect(() => {
    getUserById();
  }, []);

const getUserById = async () => {
    const response = await axios.get(`users/${id}`);
    setName(response.data.name);
    setUsername(response.data.username);
    setEmail(response.data.email);
    setEmployeeTitle(response.data.employee_title);
    setDepartment(response.data.department);
    setDivision(response.data.division);
    setSubDirectorate(response.data.sub_directorate);
    setPhone(response.data.phone);
    setAddress(response.data.address);
    // setUsers(response.data);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    console.log("ya")
    try {
      await axios.patch(`users/${id}`, {
        name,
        username,
        email,
        employee_title,
        department,
        division,
        sub_directorate,
        phone,
        address
      });
    } catch (error) {
      console.log(error);
    }
  };

  

  console.log("tes");
  console.log(id)

  return (
    <div>
    <Header/>
      <Sidebar/>
    <div className="content-wrapper">
  <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Profile</h1>
        </div>
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Home</a></li>
            <li className="breadcrumb-item active">User Profile</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <div className="card card-primary card-outline">
            <div className="card-body box-profile">
              <div className="text-center">
                <img className="profile-user-img img-fluid img-circle" src={profilePict} alt="User profile picture" />
              </div>
              <h3 className="profile-username text-center">{name}</h3>
              <p className="text-muted text-center">{employee_title}</p>
              {/* <ul className="list-group list-group-unbordered mb-3">
                <li className="list-group-item">
                  <b>Request Done</b> <a className="float-right">3</a>
                </li>
                <li className="list-group-item">
                  <b>In Progress</b> <a className="float-right">4</a>
                </li>
                <li className="list-group-item">
                  <b>BA Defect</b> <a className="float-right">2</a>
                </li>
                <li className="list-group-item">
                  <b>Not Started Yet</b> <a className="float-right">100</a>
                </li>
              </ul> */}
            </div>
          </div>
        </div>
        <div className="col-md-9">
          <div className="card">
            <div className="card-headers p-2">
              <ul className="nav nav-card-profile">
                <li className="nav-items"><a className="nav-link" href="#activity" data-toggle="tab">Profile</a></li>
                {/* <li className="nav-items"><a className="nav-link" href="#settings" data-toggle="tab">User Account</a></li> */}
              </ul>
            </div>
            <div className="card-body">
              <div className="tab-content">
                <div className="active tab-pane" id="activity">
                <form className="form-horizontal" onSubmit={updateUser}>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Employee Name</label>
                      <div className="col-sm-10">
                      <p className="text-muted text-center">{name}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Employee Title</label>
                      <div className="col-sm-10">
                      <p className="text-muted text-center">{employee_title}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Department</label>
                      <div className="col-sm-10">
                      <p className="text-muted text-center">{department}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Division</label>
                      <div className="col-sm-10">
                      <p className="text-muted text-center">{division}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Sub-Directorate</label>
                      <div className="col-sm-10">
                      <p className="text-muted text-center">{sub_directorate}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-10">
                      <p className="text-muted text-center">{email}</p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Phone</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Address</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-sm-2 col-sm-10">
                        <button type="submit" className="btn btn-danger">Save Changes</button>
                      </div>
                    </div>
                  </form>
                </div>

                {/* <div className="tab-pane" id="settings">
                  <form className="form-horizontal" onSubmit={updateUser}>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Username</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Email</label>
                      <div className="col-sm-10">
                        <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                      </div>
                    </div>
                    <div className="form-group row">
                      <div className="offset-sm-2 col-sm-10">
                        <button type="submit" className="btn btn-danger">Submit</button>
                      </div>
                    </div>
                  </form>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</div>

  )
}

export default UserProfile