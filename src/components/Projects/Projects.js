import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import {FaSearch} from 'react-icons/fa';
import ProjectList from './ProjectList';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './Projects.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState(0);
    const [rows, setRows] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");
    const [msg, setMsg] = useState("");

    useEffect(() => {
        getProjects();
      }, [page, keyword]);

      const getProjects = async () => {
        const response = await axios.get(
          `http://localhost:5001/projects?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setProjects(response.data.result);
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
    
      const searchData = (e) => {
        e.preventDefault();
        setPage(0);
        setMsg("");
        setKeyword(query);
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
        <h1>Project List</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
        <li class="breadcrumb-item active">Project List</li>
        </ol>
        </div>
        </div>
        </div>
        </section>
  
  
    <div class="container-fluid">
    <div class="row">
    <div class="col-12">
    <div class="card">
  
        <div class="col-sm-6">
        <div class="col-md-5 offset-md-0">
          <form onSubmit={searchData}>
            <div className="field has-addons">
            <div className="input-group ">
                <input
                  type="search"
                  className="form-control form-control-lg"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                />
                <button type="submit" className="btn btn-lg btn-default">
                <i className="fas"><FaSearch/> </i>
                </button>
              </div>
            {/* <div className="input-group-append">
                <button type="submit" className="btn btn-lg btn-default">
                <i className="fas"><FaSearch/> </i>
                </button>
              </div> */}
            </div>
          </form>
          </div>
          </div>
          
          <div className='table-container  mt-5'>
          {/* <table className="table table-bordered table-hover">
          <thead>
                   <tr className='row-table'>
                      <th>No</th>
                      <th>Nomor Nodin RFS/RFI</th>
                      <th>Tanggal Nodin RFS/RFI</th>
                      <th>Subject Nodin RFS/RFI</th>
                      <th>Status</th>
                      <th>Status RFC/ITR</th>
                      <th>Nomor Nodin RFC/ITR</th>
                      <th>Tanggal Nodin RFC/ITR</th>
                      <th>Subject Nodin RFC/ITR</th>
                      <th>Requestor</th>
                      <th>PIC Dev</th>
                      <th>Type</th>
                      <th>Nodin BO</th>
                      <th>Options</th>
                  </tr>
              </thead>
              </table> */}
            <table className="table table-bordered table-hover">
              <thead>
                   <tr className='row-table'>
                      <th className='project-header'>No</th>
                      <th className='project-header'>Nomor Nodin RFS/RFI</th>
                      <th className='project-header'>Tanggal Nodin RFS/RFI</th>
                      <th className='project-header'>Subject Nodin RFS/RFI</th>
                      <th className='project-header'>Status</th>
                      <th className='project-header'>Status RFC/ITR</th>
                      <th className='project-header'>Nomor Nodin RFC/ITR</th>
                      <th className='project-header'>Tanggal Nodin RFC/ITR</th>
                      <th className='project-header'>Subject Nodin RFC/ITR</th>
                      <th className='project-header'>Requestor</th>
                      <th className='project-header'>PIC Dev</th>
                      <th className='project-header'>Type</th>
                      <th className='project-header'>Nodin BO</th>
                      <th className='project-header'>Options</th>
                  </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id_project}>
                    <ProjectList project={project} />
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
            //   aria-label="pagination"
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
  )
}

export default Projects