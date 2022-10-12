import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import {FaSearch} from 'react-icons/fa';
import ProjectList from './ProjectList';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import ReactExport from 'react-data-export';
import './Projects.css';
import { getRequestor } from './apiData';
import * as XLSX from 'xlsx';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;


function Projects() {
    const [title_dev, setTitle_dev] = useState([]);
    const [exporData, setExportData] = useState([]);
    const [dataProject, setDataProject] = useState([]);



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
    
      useEffect(() => {
          getProducts();
        }, []);

      const getProjects = async () => {
        const response = await axios.get(
          `http://localhost:5001/projects?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setProjects(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);


        setDataProject(response.data.result);
      };

      const getProducts = async() =>{
        const res = await axios.get(`http://localhost:5001/getProject`);

        const requestor_list = res.data.map((data) => data.title_dev);
        setTitle_dev([...new Set(requestor_list)]);
        console.log(title_dev);

        return;
        
    }

    const handleOnExport = () =>{
      var wb = XLSX.utils.book_new()
      var ws = XLSX.utils.json_to_sheet(projects);
      XLSX.utils.book_append_sheet(wb, ws, "MySheet1");
      XLSX.writeFile(wb, "tesfile.xlsx");
  }

    

    const DataSet = [
      {
        columns: [
          {title: "Nomor Nodin RFS/RFI", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Tanggal Nodin RFS/RFI", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Subject Nodin RFS/RFI", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Status", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Status RFC/ITR", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Nomor Nodin RFC/ITR", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Tanggal Nodin RFC/ITR", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Subject Nodin RFC/ITR", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Requestor", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "PIC Dev", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Type", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
          {title: "Nodin BO", style: {font: {sz: "18", bold: true}}, width: {wch: 50}}, // width in characters
        ],
        data: projects.map((data) => [
          {value: data.no_nodin_rfsrfi, style: {font: {sz: "14"}}},
          {value: data.date_nodin_rfsrfi, style: {font: {sz: "14"}}},
          {value: data.subject_nodin_rfsrfi, style: {font: {sz: "14"}}},
          {value: data.status, style: {font: {sz: "14"}}},
          {value: data.detail_status, style: {font: {sz: "14"}}},
          {value: data.no_nodin_rfcitr, style: {font: {sz: "14"}}},
          {value: data.date_nodin_rfcitr, style: {font: {sz: "14"}}},
          {value: data.subject_nodin_rfcitr, style: {font: {sz: "14"}}},
          {value: data.title_dev, style: {font: {sz: "14"}}},
          {value: data.pic_dev, style: {font: {sz: "14"}}},
          {value: data.type_nodin, style: {font: {sz: "14"}}},
          {value: data.no_nodin_bo, style: {font: {sz: "14"}}},

        ])
      }
      
    ]

    const dataProjectHandler = async(event) =>{
      // setProjects([])
      // setExportData([]);
      const data = await getRequestor(event.target.value);
      console.log(data);
      setExportData([...data]);
      setProjects(data);
      console.log(exporData)
    }
    
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
        console.log(keyword)
      };

      function refresh(){
        setPage(0);
        setMsg("");
        setKeyword("");
        console.log(keyword)
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
            </div>
          </form>
          <form>
                  <select
                    className="custom-select"
                    name="example"
                    // value={projects}
                    onChange={(event) => dataProjectHandler(event)}
                    defaultValue="Choose....."
                    style={{ paddingTop: "5px", marginTop: "10px" }}
                  >
                    {/* <option>--Select--</option> */}
                    {title_dev.map((requestor) => (
                      <option
                        value={requestor}
                        // onChange={(event) => dataProjectHandler(event)}
                      >
                        {requestor}
                      </option>
                    ))}
                  </select>
                  <button type="submit" className="btn btn-lg btn-default" 
                  onClick= {refresh}
                  >
                <i className="fas">refresh </i>
                </button>
                </form>
                <button onClick={handleOnExport}>export</button>
                {/* {projects.length !== 0 ? (
                         <ExcelFile 
                         filename="Project List" 
                         element={<button type="button" className="btn btn-success float-right m-3">Export Data</button>}>
                             <ExcelSheet dataSet={DataSet} name="project list"/>
                         </ExcelFile>
                    ): null}            */}
                {/* <form onSubmit={searchData}> */}
                {/* <button type="submit" className="btn btn-lg btn-default" 
                  onClick= {refresh}
                  >
                <i className="fas">refresh </i>
                </button> */}
                {/* </form> */}
          </div>
          </div>
          
          <div className='table-container  mt-5'>
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