import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ReactPaginate from "react-paginate";
import {FaSearch} from 'react-icons/fa';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import './Projects.css';
import { getRequestor } from './apiData';
import * as XLSX from 'xlsx';
import {FaPencilAlt} from 'react-icons/fa'
import {FaDownload} from 'react-icons/fa'


function Project() {
    const [testing_progress, setTesting_progress] = useState('');
    const [no_nodin_rfsrfi, setNo_nodin_rfsrfi] = useState('');
    const [date_nodin_rfsrfi, setDate_nodin_rfsrfi] = useState('');
    const [subject_nodin_rfsrfi, setSubject_nodin_rfsrfi] = useState('');
    const [status, setStatus] = useState('');
    const [detail_status, setDetail_status] = useState('');
    const [start_date_testing, setStart_date_testing] = useState('');
    const [end_date_testing, setEnd_date_testing] = useState('');
    const [notes_testing, setNotes_testing] = useState('');
    const [testcase_amt, setTestcase_amt] = useState('');
    const [dev_effort, setDev_effort] = useState('');
    const [project_type, setProject_type] = useState('');
    const [services, setServices] = useState('');
    const [brand, setBrand] = useState('');
    const [pic_tester_1, setPic_tester_1] = useState('');
    const [pic_tester_2, setPic_tester_2] = useState('');
    const [pic_tester_3, setPic_tester_3] = useState('');
    const [pic_tester_4, setPic_tester_4] = useState('');
    const [pic_tester_5, setPic_tester_5] = useState('');
    const [id_project, setId_project] = useState();

    const [val, setVal] = useState();
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

      //get the project data that the user is looking for
      const getProjects = async () => {
        const response = await axios.get(
          `projectTracking?search_query=${keyword}&page=${page}&limit=${limit}`
        );
        setProjects(response.data.result);
        setPage(response.data.page);
        setPages(response.data.totalPage);
        setRows(response.data.totalRows);
        setDataProject(response.data.result);
      };

      //get all project 
      const getProducts = async() =>{
        const res = await axios.get(`getAllProject`);
        const requestor_list = res.data.map((data) => data.title_dev);
        setTitle_dev([...new Set(requestor_list)]);
        console.log(title_dev);

        return;
        
    }

    //export to excel
    const handleOnExport = () =>{
      var wb = XLSX.utils.book_new()
      var ws = XLSX.utils.json_to_sheet(exporData);
      XLSX.utils.book_append_sheet(wb, ws, "Project");
      XLSX.utils.sheet_add_aoa(ws, 
        [["No Nodin RFS/RFI", "Tgl Nodin RFS/RFI", "Subject Nodin RFS/RFI",
          "Status", "Status RFC/ITR", "No Nodin RFC/ITR", "Tgl Nodin RFC/ITR",
          "Subject Nodin RFC/ITR", "Requestor", "PIC Dev", "Type", "Nodin BO",
          "Start FUT","FUT Done", "Notes", "Jumlah Test Case", "Dev Effort", 
          "Project Type", "Services", "Brand", "PIC Tester 1",
          "PIC Tester 2", "PIC Tester 3", "PIC Tester 4", "PIC Tester 5"
      ]], 
        { origin: "A1" });
        ws["!cols"] = [ { wch: 30 } ];
      XLSX.writeFile(wb, "tesfile.xlsx");
  }

  //handle the project data that user is looking for (send parameter query to api data)
    const dataProjectHandler = async(event) =>{
      event.preventDefault()
      const data = await getRequestor(query);
      setExportData(data);
      console.log(data);
      console.log(exporData)

        setPage(0);
        setMsg("");
        setKeyword(query);
    }

    //update testing progress
    const updateData = async (e) => {
        e.preventDefault();
        console.log("id project", id_project)
        console.log("testing progress",testing_progress)
        try {
          await axios.patch(`datasProject/${id_project}`, {
            testing_progress: testing_progress,
            no_nodin_rfsrfi: no_nodin_rfsrfi ,
            date_nodin_rfsrfi: date_nodin_rfsrfi ,
            subject_nodin_rfsrfi: subject_nodin_rfsrfi,
            status: status,
            detail_status:detail_status,
            start_date_testing:start_date_testing,
            end_date_testing:end_date_testing,
            notes_testing:notes_testing,
            testcase_amt:testcase_amt,
            dev_effort:dev_effort,
            project_type:project_type,
            services:services,
            brand:brand,
            pic_tester_1:pic_tester_1,
            pic_tester_2:pic_tester_2,
            pic_tester_3:pic_tester_3,
            pic_tester_4:pic_tester_4,
            pic_tester_5:pic_tester_5  
          });
        } catch (error) {
          console.log(error);
        }
      };

      //get project data selected and displayed to user
    const getProjSelected =async(projid) => {
        console.log("id project", projid)
        setVal(projid);
        setId_project(projid)
        const response = await axios.get(`datasProject/${projid}`);
        setTesting_progress(response.data.testing_progress);
        setNo_nodin_rfsrfi(response.data.no_nodin_rfsrfi);
        setDate_nodin_rfsrfi(response.data.date_nodin_rfsrfi);
        setSubject_nodin_rfsrfi(response.data.subject_nodin_rfsrfi);
        setStatus(response.data.status);
        setDetail_status(response.data.detail_status);
        setStart_date_testing(response.data.start_date_testing);
        setEnd_date_testing(response.data.end_date_testing);
        setNotes_testing(response.data.notes_testing);
        setTestcase_amt(response.data.testcase_amt);
        setDev_effort(response.data.dev_effort);
        setProject_type(response.data.project_type);
        setServices(response.data.services);
        setBrand(response.data.brand);
        setPic_tester_1(response.data.pic_tester_1);
        setPic_tester_2(response.data.pic_tester_2);
        setPic_tester_3(response.data.pic_tester_3);
        setPic_tester_4(response.data.pic_tester_4);
        setPic_tester_5(response.data.pic_tester_5);
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

  return (
    <div>
        <Header/>
        <Sidebar/>
        <div class="content-wrapper">
        <section class="content-header">
        <div class="container-fluid">
        <div class="row mb-2">
        <div class="col-sm-6">
        <h1>Project Tracking</h1>
        </div>
        <div class="col-sm-6">
        <ol class="breadcrumb float-sm-right">
        <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
        <li class="breadcrumb-item active">Project Tracking</li>
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
          <form onSubmit={dataProjectHandler} >
            <div className="field has-addons">
            
            <div className="input-group ">
                <input
                  type="search"
                  className="form-control form-control-lg"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search"
                />
                <button type="submit" className="btn btn-lg btn-default" >
                <i className="fas"><FaSearch/> </i>
                </button>
                <button type="button" className="btn btn-lg btn-danger" onClick={handleOnExport}>
                <i className="fas"><FaDownload/> </i>
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
                      <th className='project-header'>No</th>
                      <th className='project-header'>Nomor Nodin RFS/RFI</th>
                      <th className='project-header'>Tanggal Nodin RFS/RFI</th>
                      <th className='project-header-rfsrfi'>Subject Nodin RFS/RFI</th>
                      <th className='project-header'>Status</th>
                      <th className='project-header'>Status RFC/ITR</th>
                      <th className='project-header'>Nomor Nodin RFC/ITR</th>
                      <th className='project-header'>Tanggal Nodin RFC/ITR</th>
                      <th className='project-header'>Subject Nodin RFC/ITR</th>
                      <th className='project-header'>Requestor</th>
                      <th className='project-header'>PIC Dev</th>
                      <th className='project-header'>Type</th>
                      <th className='project-header'>Nodin BO</th>
                      <th className='project-header'>Testing Progress</th>
                      <th className='project-header-options'>Options</th>
                  </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr key={project.id_project}>
                    {/* <td>{project.id_project}</td> */}
                    <td>{index + 1}</td>
                    <td>{project.no_nodin_rfsrfi}</td>
                    <td>{project.date_nodin_rfsrfi}</td>
                    <td className='project-row-rfsrfi'>{project.subject_nodin_rfsrfi}</td>
                    <td>{project.status}</td>
                    <td>{project.detail_status}</td>
                    <td>{project.no_nodin_rfcitr}</td>
                    <td>{project.date_nodin_rfcitr}</td>
                    <td>{project.subject_nodin_rfcitr}</td>
                    <td>{project.title_dev}</td>
                    <td>{project.pic_dev}</td>
                    <td>{project.type_nodin}</td>
                    <td>{project.no_nodin_bo}</td>
                    <td>{project.testing_progress}</td>
                    <td className='project-row-options'>
                        <button type="button" onClick={() => getProjSelected(project.id_project)} onChange={() => setVal(project.id_project)} class="btn btn-default" data-toggle="modal" data-target="#modal-default" ><i className="fas"><FaPencilAlt/> </i></button>
                    </td>


                  </tr>
                ))}
              </tbody>
            </table>
            <div class="modal fade" id="modal-default">
        <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
        <h4 class="modal-title">Update Project Tracking Record</h4>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div class="modal-body">
        <div className='modalOptionsContainer'>
            <div className="card-header">
              <h3 className="card-title">Follow Up Testing</h3>
            </div>
            <table class="table table-striped is-bordered">
            <thead>
            <tr>
            <th>Start FUT</th>
            <th>FUT Done</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{start_date_testing}</td>
              <td>{end_date_testing}</td>
              </tr>
            </tbody>
            </table>

            <div className="card-header">
              <h3 className="card-title">Testing Progress</h3>
            </div>
            <table class="table table-striped">
            <tr>
              <th>Progress</th>
              <td>
              <input type="text" className="form-control" value={testing_progress} onChange={(e) => setTesting_progress(e.target.value)} placeholder="...." />
                </td>
            </tr>
            </table>

          <div className="card-header">
              <h3 className="card-title">PIC Tester</h3>
            </div>
            <table class="table ">
              <tr>
              <th>PIC Tester 1</th>
              <td>{pic_tester_1}</td>
              </tr>
              <tr>
              <th>PIC Tester 2</th>
              <td>{pic_tester_2}</td>
              </tr>
              <tr>
              <th>PIC Tester 3</th>
              <td>{pic_tester_3}</td>
              </tr>
              <tr>
              <th>PIC Tester 4</th>
              <td>{pic_tester_4}</td>
              </tr>
              <tr>
              <th>PIC Tester 5</th>
              <td>{pic_tester_5}</td>
              </tr>
            </table>
            
            <div className="card-header">
              <h3 className="card-title">Other Details</h3>
            </div>
            <table class="table table-striped">
              <tr>
              <th>Jumlah Test Case</th>
              <td>{testcase_amt}</td>
              </tr>
              <tr>
              <th>Standard/Normal Changes</th>
              <td>{dev_effort}</td>
              </tr>
              <tr>
              <th>Project Type</th>
              <td>{project_type}</td>
              </tr>
              <tr>
              <th>Services</th>
              <td>{services}</td>
              </tr>
              <tr>
              <th>Brand</th>
              <td>{brand}</td>
              </tr>
              <tr>
              <th>Notes</th>
              <td>{notes_testing}</td>
              </tr>
            </table>
            <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={updateData} data-dismiss="modal">Save changes</button>
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
            <p className="has-text-centered has-text-danger">{msg}</p>
            <nav
              className="pagination is-centered"
              key={rows}
              role="navigation"
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

export default Project;