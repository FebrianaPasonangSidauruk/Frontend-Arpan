import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { apiAudit } from './apiAudit';
import ModalExcel from './ModalExcel';
import ModalPeriod1 from './ModalPeriod1';
import {FaDownload} from 'react-icons/fa';
import './Audit.css';


const Audit = () => {
    const [show2, setShow2] = useState(false);
    const [show3, setShow3] = useState(false);

    const [smonth, setMonth] = useState();
    const [syear, setYear] = useState(2022);
    const [smonth2, setMonth2] = useState();
    const [syear2, setYear2] = useState(2022);
    const [smonth3, setMonth3] = useState();
    const [syear3, setYear3] = useState(2022);

    const [tgl_signoff1, setTgl_signoff1] = useState("");
    const [req_name1, setReq_name1] = useState("");
    const [req_title1, setReq_title1] = useState("");
    const [revas_name1, setRevas_name1] = useState("");
    const [revas_title1, setRevas_title1] = useState("");

    const [tgl_signoff2, setTgl_signoff2] = useState("");
    const [req_name2, setReq_name2] = useState("");
    const [req_title2, setReq_title2] = useState("");
    const [revas_name2, setRevas_name2] = useState("");
    const [revas_title2, setRevas_title2] = useState("");

    const [tgl_signoff3, setTgl_signoff3] = useState("");
    const [req_name3, setReq_name3] = useState("");
    const [req_title3, setReq_title3] = useState("");
    const [revas_name3, setRevas_name3] = useState("");
    const [revas_title3, setRevas_title3] = useState("");

    const [title_dev, setTitle_dev] = useState([]);
    const [exporData, setExportData] = useState([]);
    const[req, setReq] = useState("");
    const[req2, setReq2] = useState("");
    const[req3, setReq3] = useState("");
    const bulan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    useEffect(() => {
        getAllProjects();
      }, []);

      //get all projects
      const getAllProjects = async() =>{
            const res = await axios.get(`getAllProject`);
            const requestor_list = res.data.map((data) => data.title_dev);
            setTitle_dev([...new Set(requestor_list)]); //distinct
            // console.log(title_dev);
            return; 
        }
    
        //get data for kertas kerja by params
        const dataProjectRequestor = async(event) => {
            event.preventDefault();
            const data = await apiAudit(req, req2, req3, smonth, syear, smonth2, syear2, smonth3, syear3)
            setExportData(data);
            // console.log(exporData)
        };


  return (
    <div>
        <Header/>
        <Sidebar/>
        <div className='content-wrapper'>
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Audit Feature</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li class="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li class="breadcrumb-item active">Audit</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

            <div class="container-fluid">
                <div class="row">
                    <div class="col-12">
                        <div class="card">
          
                            <form className='form-horizontal' style={{marginLeft:'1%', marginRight:'1%', marginTop:'1%'}}>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Requestor</label>
                                        <div className="col-sm-8">
                                            <select
                                                className="custom-select"
                                                name="example"
                                                placeholder='pilih'
                                                onChange={(event) => setReq(event.target.value)}
                                                style={{ paddingTop: "5px", marginTop: "10px" }}
                                            >
                                                {title_dev.map((requestor) => (
                                                    <option value={requestor}
                                                    >
                                                        {requestor}
                                                    </option>
                                                ))}
                                                <option>-</option>
                                            </select>
                                        </div>
                                        <label className="col-sm-2 col-form-label">OR</label>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Requestor 2</label>
                                        <div className="col-sm-8">
                                            <select
                                                className="custom-select"
                                                name="example"
                                                onChange={(event) => setReq2(event.target.value)}
                                                style={{ paddingTop: "5px", marginTop: "10px" }}
                                            ><option>-</option>
                                                {title_dev.map((requestor) => (
                                                    <option value={requestor}>
                                                        {requestor}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <label className="col-sm-2 col-form-label">OR</label>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Requestor 3</label>
                                        <div className="col-sm-8">
                                            <select
                                                className="custom-select"
                                                name="example"
                                                onChange={(event) => setReq3(event.target.value)}
                                                style={{ paddingTop: "5px", marginTop: "10px" }}
                                            >
                                                <option >-</option>
                                                {title_dev.map((requestor) => (
                                                    <option value={requestor}>
                                                        {requestor}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                </div>
                               
                            
                            </form>
                            

                            <form className='form-horizontal' style={{marginLeft:'1%', marginRight:'1%', marginTop:'1%'}}>
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Periode</label>
                                                <div className="col-sm-10">
                                                    <button type="button" class="btn btn-danger" style={{marginBottom:'1%'}}>Input Data periode 1</button>
                                                        <i className="nav-icon fas" style={{marginLeft:"2%", cursor:"pointer"}} data-toggle="modal" data-target="#modal-month-tes" ><FaDownload/></i>
                                                            <div class="modal fade" id="modal-month-tes">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-body">
                                                                            <ModalPeriod1 
                                                                            smonth={smonth} 
                                                                            syear={syear} 
                                                                            req={req}
                                                                            tgl_signoff1={tgl_signoff1}
                                                                            req_name1={req_name1}
                                                                            req_title1={req_title1}
                                                                            revas_name1={revas_name1}
                                                                            revas_title1={revas_title1}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <ul className="nav nav-card-profile">
                                                                    <li className="nav-items">
                                                                        <input type ='text' className="form-control" placeholder='Tahun' value={syear} onChange={(e) => setYear(e.target.value)}></input>
                                                                    </li>
                                                                    <li className="nav-items">
                                                                        <select
                                                                                className="custom-select"
                                                                                name="bulan"
                                                                                placeholder='pilih'
                                                                                onChange={(event) => setMonth(event.target.value)}
                                                                                
                                                                            >   <option disabled selected>Bulan</option>
                                                                            {bulan.map((bulans) => (
                                                                                <option value={bulans}
                                                                                >
                                                                                    {bulans}
                                                                                </option>
                                                                            ))}
                                                                                <option>-</option>
                                                                    
                                                                        </select>
                                                                    </li>
                                                            </ul>
                                                            <div style={{width:'80%'}}>
                                                                <input type="text" 
                                                                name="tgl_signoff"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={tgl_signoff1}
                                                                onChange={(e) => setTgl_signoff1(e.target.value)}
                                                                placeholder="Tanggal Sign Off" />

                                                                <input type="text" 
                                                                name="req_name"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={req_name1}
                                                                onChange={(e) => setReq_name1(e.target.value)}
                                                                placeholder="Requestor Name" />

                                                                <input type="text" 
                                                                name="req_title"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={req_title1}
                                                                onChange={(e) => setReq_title1(e.target.value)}
                                                                placeholder="Requestor Title" />

                                                                <input type="text" 
                                                                name="revas_name"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={revas_name1}
                                                                onChange={(e) => setRevas_name1(e.target.value)}
                                                                placeholder="Revas Name" />

                                                                <input type="text" 
                                                                name="revas_title"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={revas_title1}
                                                                onChange={(e) => setRevas_title1(e.target.value)}
                                                                placeholder="Revas Title" />
                                                            </div>
                                                            <p>   </p>
                                                </div>

                                            {/* periode2 */}
                                            
                                            <label className="col-sm-2 col-form-label">Periode</label>
                                                <div className="col-sm-10">
                                                    <button type="button" class="btn btn-danger" style={{marginBottom:'1%'}} onClick={() => setShow2(!show2)}>Input Data Periode 2</button>
                                                        <i className="nav-icon fas" style={{marginLeft:"2%", cursor:"pointer"}} data-toggle="modal" data-target="#modal-month-tes2" ><FaDownload/></i>
                                                            <div class="modal fade" id="modal-month-tes2">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-body">
                                                                            <ModalPeriod1 
                                                                            smonth={smonth2} 
                                                                            syear={syear2} 
                                                                            req={req}
                                                                            tgl_signoff1={tgl_signoff2}
                                                                            req_name1={req_name2}
                                                                            req_title1={req_title2}
                                                                            revas_name1={revas_name2}
                                                                            revas_title1={revas_title2}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                    { show2? 
                                                            <div>
                                                                <ul className="nav nav-card-profile">
                                                                    <li className="nav-items">
                                                                        <input type ='text' className="form-control" placeholder='Tahun' value={syear2} onChange={(e) => setYear2(e.target.value)}></input>
                                                                    </li>
                                                                        <li className="nav-items">
                                                                            <select
                                                                                className="custom-select"
                                                                                name="bulan"
                                                                                placeholder='pilih'
                                                                                onChange={(event) => setMonth2(event.target.value)}
                                                                                
                                                                            >   <option disabled selected>Bulan</option>
                                                                            {bulan.map((bulans) => (
                                                                                <option value={bulans}
                                                                                >
                                                                                    {bulans}
                                                                                </option>
                                                                            ))}
                                                                                <option>-</option>
                                                                
                                                                            </select>
                                                                        </li>
                                                                </ul>
                                                            <div style={{width:'80%'}}>
                                                                <input type="text" 
                                                                name="tgl_signoff"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={tgl_signoff2}
                                                                onChange={(e) => setTgl_signoff2(e.target.value)}
                                                                placeholder="Tanggal Sign Off" />

                                                                <input type="text" 
                                                                name="req_name"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={req_name2}
                                                                onChange={(e) => setReq_name2(e.target.value)}
                                                                placeholder="Requestor Name" />

                                                                <input type="text" 
                                                                name="req_title"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={req_title2}
                                                                onChange={(e) => setReq_title2(e.target.value)}
                                                                placeholder="Requestor Title" />

                                                                <input type="text" 
                                                                name="revas_name"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={revas_name2}
                                                                onChange={(e) => setRevas_name2(e.target.value)}
                                                                placeholder="Revas Name" />

                                                                <input type="text" 
                                                                name="revas_title"
                                                                className="form-control" 
                                                                variant="filled"
                                                                value={revas_title2}
                                                                onChange={(e) => setRevas_title2(e.target.value)}
                                                                placeholder="Revas Title" />
                                                            </div>
                                                        </div>
                                                    :null}
                                                
                                                    <p>   </p>
                                                </div>

                                            {/* periode3 */}

                                            <label className="col-sm-2 col-form-label">Periode</label>
                                                <div className="col-sm-10">
                                                    <button type="button" class="btn btn-danger" style={{marginBottom:'1%'}} onClick={() => setShow3(!show3)}>Input Data Periode 3</button>
                                                        <i className="nav-icon fas" style={{marginLeft:"2%", cursor:"pointer"}} data-toggle="modal" data-target="#modal-month-tes3" ><FaDownload/></i>
                                                            <div class="modal fade" id="modal-month-tes3">
                                                                <div class="modal-dialog">
                                                                    <div class="modal-content">
                                                                        <div class="modal-body">
                                                                            <ModalPeriod1 
                                                                            smonth={smonth3} 
                                                                            syear={syear3} 
                                                                            req={req}
                                                                            tgl_signoff1={tgl_signoff3}
                                                                            req_name1={req_name3}
                                                                            req_title1={req_title3}
                                                                            revas_name1={revas_name3}
                                                                            revas_title1={revas_title3}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                { show3? 
                                                            <div>
                                                                <ul className="nav nav-card-profile">
                                                                    <li className="nav-items">
                                                                        <input type ='text' className="form-control" placeholder='Tahun' value={syear3} onChange={(e) => setYear3(e.target.value)}></input>
                                                                    </li>
                                                                        <li className="nav-items">
                                                                            <select
                                                                                className="custom-select"
                                                                                name="bulan"
                                                                                placeholder='pilih'
                                                                                onChange={(event) => setMonth3(event.target.value)}
                                                                                
                                                                            >   <option disabled selected>Bulan</option>
                                                                                {bulan.map((bulans) => (
                                                                                    <option value={bulans}
                                                                                    >
                                                                                        {bulans}
                                                                                    </option>
                                                                                ))}
                                                                                    <option>-</option>
                                                                        
                                                                            </select>
                                                                        </li>
                                                                </ul>
                                                                <div style={{width:'80%'}}>
                                                                    <input type="text" 
                                                                    name="tgl_signoff"
                                                                    className="form-control" 
                                                                    variant="filled"
                                                                    value={tgl_signoff3}
                                                                    onChange={(e) => setTgl_signoff3(e.target.value)}
                                                                    placeholder="Tanggal Sign Off" />

                                                                    <input type="text" 
                                                                    name="req_name"
                                                                    className="form-control" 
                                                                    variant="filled"
                                                                    value={req_name3}
                                                                    onChange={(e) => setReq_name3(e.target.value)}
                                                                    placeholder="Requestor Name" />

                                                                    <input type="text" 
                                                                    name="req_title"
                                                                    className="form-control" 
                                                                    variant="filled"
                                                                    value={req_title3}
                                                                    onChange={(e) => setReq_title3(e.target.value)}
                                                                    placeholder="Requestor Title" />

                                                                    <input type="text" 
                                                                    name="revas_name"
                                                                    className="form-control" 
                                                                    variant="filled"
                                                                    value={revas_name3}
                                                                    onChange={(e) => setRevas_name3(e.target.value)}
                                                                    placeholder="Revas Name" />

                                                                    <input type="text" 
                                                                    name="revas_title"
                                                                    className="form-control" 
                                                                    variant="filled"
                                                                    value={revas_title3}
                                                                    onChange={(e) => setRevas_title3(e.target.value)}
                                                                    placeholder="Revas Title" />
                                                                </div>
                                                            </div>
                                                    :null
                                                }
                                                    
                                                </div>
                                        </div>
                                            <button type="button" onClick={dataProjectRequestor} class="btn btn-danger" data-toggle="modal" data-target="#modal-default" style={{marginBottom:'1%'}}>Kertas Kerja</button>
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
                                                                <ModalExcel 
                                                                requestor_audit={exporData}
                                                                smonth={smonth} 
                                                                syear={syear}
                                                                smonth2={smonth2}
                                                                syear2={syear2}
                                                                smonth3={smonth3} 
                                                                syear3={syear3}
                                                                req={req}
                                                                req2={req2}
                                                                req3={req3}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                          
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Audit