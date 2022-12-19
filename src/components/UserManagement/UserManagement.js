import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import {FaSearch} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './UserManagement.css';
import {FaPencilAlt} from 'react-icons/fa';
import {MdPersonAddAlt1} from 'react-icons/md';
import ModalCreateAcc from './ModalCreateAcc';
import {AiFillDelete} from 'react-icons/ai'

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");
    const [message, setMessage] = useState('');

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [role, setRole] = useState("");
    const [employee_title, setEmployeeTitle] = useState("");
    const [department, setDepartment] = useState("");
    const [division, setDivision] = useState("");
    const [sub_directorate, setSubDirectorate] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState('');
    const [uuidUser, setUuidUser] = useState('')

    const [val, setVal] = useState();

    useEffect(()=>{
        getUserManagement()
    }, [page, keyword]);

    //get list of users
    const getUserManagement = async () => {
        const response = await axios.get(
          `getUserManagement?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setUsers(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
      };

      const changePage = ({ selected }) => {
        setPage(selected);
        if (selected === 9) {
          setMessage(
            "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
          );
        } else {
          setMessage("");
        }
      };

      //search user account
      const searchData =async(e) => {
        e.preventDefault();
        setPage(0);
        setMessage("");
        setKeyword(query);
        console.log("search: ",query)
        // console.log(keyword)
      };

      const refreshPage = ()=>{
        window.location.reload();
    }

    //update user account by admin
      const updateUserAccount = async (event) =>{
        event.preventDefault();
        console.log(uuidUser)
        try{
          await axios.patch(`userAccount/${uuidUser}`,{
            name : name,
            username : username,
            role : role,
            employee_title : employee_title,
            department : department,
            division : division,
            sub_directorate : sub_directorate,
            phone : phone,
            address : address,
            password : password
          });
          refreshPage();
        } catch (error){
          if (error.response) {
            setMsg(error.response.data.msg);
        }
        }
      }

      //delete user account by admin
      const deleteUserAccount = async (event)=>{
        event.preventDefault();
        console.log(uuidUser)
        try{
          await axios.delete(`deleteusers/${uuidUser}`);
          refreshPage();
        } catch (error){
          console.log(error)
        }
      }

      //get user account from uuid to show in detail page
      const getUserByUUID = async(useruuid)=>{
        console.log("user uuid",useruuid);
        setVal(useruuid)
        setUuidUser(useruuid)
        const response = await axios.get(`userAccount/${useruuid}`);
        setName(response.data.name);
        setUsername(response.data.username);
        setRole(response.data.role);
        setEmployeeTitle(response.data.employee_title);
        setDepartment(response.data.department);
        setDivision(response.data.division);
        setSubDirectorate(response.data.sub_directorate);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setPassword(response.data.password);
      }

  return (
    <div>
    <Header/>
        <Sidebar/>
        <div class="content-wrapper">
            <section class="content-header">
            <div class="container-fluid">
            <div class="row mb-2">
            <div class="col-sm-6">
            <h1>User Management</h1>
            </div>
            <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
            <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
            <li class="breadcrumb-item active">User Management</li>
            </ol>
            </div>
            </div>
            </div>
            </section>

            <div class="container-fluid">
  <div class="row">
  <div class="col-12">
  <div class="card">

      <div class="col-sm-6" style={{marginTop:'1%'}}>
      <div class="col-md-5 offset-md-0">
        <form onSubmit={searchData}>
          <div className="field has-addons">
            <div className="input-group">
              <input
                type="search"
                className="form-control form-control-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
              />
            
            
              <button type="submit" className="btn btn-lg btn-default">
              <i className="fas"><FaSearch/> </i>
                {/* Search */}
              </button>
              <button type="button" className="btn btn-lg btn-danger" data-toggle='modal' data-target='#modal-createAcc'>
                <i className="fas"><MdPersonAddAlt1/> </i>
                </button> 
            </div>
          </div>
        </form>
        
        </div>
        </div>

        <div class="modal fade" id="modal-createAcc">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title">Create Account</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
            <ModalCreateAcc/>
        </div>
        </div>
        </div>

        </div>

        

        <div style={{marginLeft:'1%', marginRight:'1%'}}>
        
        <div className='table-container  mt-5'>
          <table className="table table-bordered table-hover">
            <thead>
                 <tr className='row-table'>
                    <th className='usermanagement-header'>No</th>
                    <th className='usermanagement-header'>Username</th>
                    <th className='usermanagement-header'>Nama</th>
                    <th className='usermanagement-header'>Role</th>
                    <th className='usermanagement-header'>Detail</th>
                    <th className='usermanagement-header'>Delete</th>
                </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.uuid}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>
                        <button type="button" class="btn btn-default" onClick={() => getUserByUUID(user.uuid)} data-toggle="modal" data-target="#modal-default" onChange={() => setVal(user.uuid)}><i className="fas"><FaPencilAlt/> </i></button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-default" onClick={() => getUserByUUID(user.uuid)} data-toggle="modal" data-target="#modal-delete"><i className="fas"><AiFillDelete/> </i></button>
                    </td>
 
                </tr>
              ))}
            </tbody>
          </table>

          <div class="modal fade" id="modal-default">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title">Update User Account</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <div className='modalOptionsContainer'>

          <div className="card-header">
              <h3 className="card-title">User Account</h3>
            </div>
            <table class="table ">
              <tr>
              <th>Name</th>
              <td>
              <input type="text" className="form-control" value={name} onChange={(event) => setName(event.target.value)} placeholder="...." />
                </td>
              </tr>
              <tr>
              <th>Username</th>
              <td>
              <input type="text" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="...." />
                </td>
              </tr>
              <tr>
              <th>Role</th>
              <td>
              <input type="text" className="form-control" value={role} onChange={(event) => setRole(event.target.value)} placeholder="...." />
                </td>
              </tr>
              <tr>
              <th>Password</th>
              {/* <td>{password}</td> */}
              <td>
              <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="...." />
                </td>
              </tr>
            </table>

            <div className="card-header">
              <h3 className="card-title">Details </h3>
            </div>
            <table class="table ">
              <tr>
              <th>Employee Title</th>
              <td>{employee_title}</td>
              </tr>
              <tr>
              <th>Department</th>
              <td>{department}</td>
              </tr>
              <tr>
              <th>Division</th>
              <td>{division}</td>
              </tr>
              <tr>
              <th>Sub Directorate</th>
              <td>{sub_directorate}</td>
              </tr>
            </table>

            <div className="card-header">
              <h3 className="card-title">Other Details </h3>
            </div>
            <table class="table ">
              <tr>
              <th>Address</th>
              <td>{address}</td>
              </tr>
              <tr>
              <th>Phone</th>
              <td>{phone}</td>
              </tr>
            </table>
            <p className="has-text-centered has-text-danger">{msg}</p>

            <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={updateUserAccount} data-dismiss="modal">Save changes</button>
        </div>
        </div>
        </div>
        </div>

        </div>

          </div>

          <div class="modal fade" id="modal-delete">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title">Update User Account</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <div className='modalOptionsContainer'>

          <div className="card-header">
              <h3 className="card-title">Are you sure you want to delete this account?</h3>
            </div>
            <table class="table ">
              <tr>
              <th>Name</th>
              <td>{name}</td>
              </tr>
              <tr>
              <th>Username</th>
              <td>{username}</td>
              </tr>
              <tr>
              <th>Role</th>
              <td>{role}</td>
              </tr>
            </table>

            
            <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary" onClick={deleteUserAccount} data-dismiss="modal">Delete</button>
        </div>
        </div>
        </div>
        </div>

        </div>

          </div>
          </div>
          <p>
            Showing {rows ? page + 1 : 0} of {pages} pages from {rows} records
          </p>
          <p className="has-text-centered has-text-danger">{message}</p>
          <nav
            className="pagination is-centered"
            key={rows}
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={"< Prev"}
              nextLabel={"Next >"}
              pageCount={Math.min(10, pages)}
              onPageChange={changePage}
              containerClassName={"pagination-list"}
              pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              activeLinkClassName={"pagination-link is-current"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>
          </div>
      </div>
    </div>
  </div>
    </div>

        </div>
    </div>
  )
}

export default UserManagement