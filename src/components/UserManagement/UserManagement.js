import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import {FaSearch} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './UserManagement.css';
import {FaPencilAlt} from 'react-icons/fa'
import {FaDownload} from 'react-icons/fa'

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

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
    const [confirmPassword, setConfirmPassword] = useState('');
    // const {id} = useParams()

    useEffect(()=>{
        getUserManagement()
    }, [page, keyword]);

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
          setMsg(
            "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
          );
        } else {
          setMsg("");
        }
      };

      const searchData =async(e) => {
        e.preventDefault();
      
        setPage(0);
        setMsg("");
        setKeyword(query);
        console.log(query)
        
        console.log(keyword)
      };

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
              
            </div>
          </div>
        </form>
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
                        <button type="button" class="btn btn-default"><i className="fas"><FaPencilAlt/> </i></button>
                    </td>
                    <td>
                        <button type="button" class="btn btn-default"><i className="fas"><FaPencilAlt/> </i></button>
                    </td>
 
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <p>
            Showing {rows ? page + 1 : 0} of {pages} pages from {rows} records
          </p>
          <p className="has-text-centered has-text-danger">{msg}</p>
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