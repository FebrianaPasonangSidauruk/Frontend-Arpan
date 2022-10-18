import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Tes from './Tes';
import MonthYearPicker from 'react-month-year-picker';
import { cobaAudit } from './apiAudit';
import TesModal from './TesModal';
import './Audit.css';


const TesAudit = () => {
    const [requestors, setRequestors] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [query, setQuery] = useState("");

    const [smonth, setMonth] = useState();
    const [syear, setYear] = useState(2022);
    const [smonth2, setMonth2] = useState();
    const [syear2, setYear2] = useState(2022);
    const [smonth3, setMonth3] = useState();
    const [syear3, setYear3] = useState(2022);

    const [title_dev, setTitle_dev] = useState([]);
    const [exporData, setExportData] = useState([]);
    const[req, setReq] = useState("");
    const[req2, setReq2] = useState("");
    const[req3, setReq3] = useState("");

    useEffect(() => {
        getProducts();
      }, []);

      const getProducts = async() =>{
        const res = await axios.get(`http://localhost:5001/getProject`);

        const requestor_list = res.data.map((data) => data.title_dev);
        setTitle_dev([...new Set(requestor_list)]);
        console.log(title_dev);

        return;
        
    }
    
    const dataProjectRequestor = async(event) => {
        event.preventDefault();
        const data = await cobaAudit(req, req2, req3, smonth, syear, smonth2, syear2, smonth3, syear3)
        setExportData(data);
        console.log(exporData)
        console.log(data);
        console.log("Req1 req2 re3 bulan tahun", req, req2, req3, smonth, syear, smonth2, syear2, smonth3, syear3)
    };

    const submitrequestor= (e) =>{
        e.preventDefault();
        setKeyword(query);
        console.log("Requestor", requestors);

    }

    
    const handleSubmitPeriod = (e) => {
        e.preventDefault();
        
    };



    const getPDF = (e) =>{

    }


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
          
                            <form className='form-horizontal' >
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
                                        {/* <br/> <br/> */}
                                        {/* <p>req1: {req}</p>  */}
                                        <label className="col-sm-2 col-form-label">OR</label>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Requestor 2</label>
                                        <div className="col-sm-8">
                                            <select
                                                className="custom-select"
                                                name="example"
                                                onChange={(event) => setReq2(event.target.value)}
                                                // onChange={(event) => dataProjectHandler(event)}
                                                style={{ paddingTop: "5px", marginTop: "10px" }}
                                            ><option>-</option>
                                                {title_dev.map((requestor) => (
                                                    <option value={requestor}>
                                                        {requestor}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        {/* <br/> */}
                                        {/* <p>req1: {req2}</p>  */}
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
                                        {/* <br/> */}
                                        {/* <p>req1: {req3}</p>  */}
                                </div>
                                <button type="button" onClick={dataProjectRequestor} class="btn btn-danger" data-toggle="modal" data-target="#modal-default">Kertas Kerja</button>
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
                                <TesModal requestor_audit={exporData}/>
                            </div>
                            </div>

                            </div>

                            </div>
                            </form>
                            

                            <form className='form-horizontal' onSubmit={handleSubmitPeriod}>
                                        <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Period</label>
                                        <div className="col-sm-10">
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-month">Input Data Period 1</button>
                                        <div class="modal fade" id="modal-month">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body">
                            <MonthYearPicker
                                            className='month-picker-card'
                                            selectedMonth={smonth}
                                            selectedYear={syear}
                                            minYear={2018}
                                            maxYear={2030}
                                            onChangeYear={(year) => setYear(year)}
                                            onChangeMonth={(month) => setMonth(month)}
                                            />

                                            <input type="text" 
                                            name="tgl_signoff"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Tanggal Sign Off" />

                                            <input type="text" 
                                            name="req_name"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Requestor Name" />

                                            <input type="text" 
                                            name="req_title"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Requestor Title" />

                                            <input type="text" 
                                            name="revas_name"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Revas Name" />

                                            <input type="text" 
                                            name="revas_title"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Revas Title" />
                            </div>
                            </div>

                            </div>

                            </div>
                                            {/* <input className='input-periodCard' type='month' selectedMonth={smonth} onChange={(month)=>setMonth(month)}/> */}
                                            
                                            {/* <p>Bulan: {smonth} tahun: {syear}</p>  */}
                                            <p>   </p>
                                        </div>
                                        
                                        <label className="col-sm-2 col-form-label">Period 2</label>
                                        <div className="col-sm-10">
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-month2">Input Data Periode 2</button>
                                        <div class="modal fade" id="modal-month2">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body">
                            <MonthYearPicker
                                            className='month-picker-card'
                                            selectedMonth={smonth2}
                                            selectedYear={syear2}
                                            minYear={2018}
                                            maxYear={2030}
                                            onChangeYear={(year) => setYear2(year)}
                                            onChangeMonth={(month) => setMonth2(month)}
                                            />

                                            <input type="text" 
                                            name="tgl_signoff"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Tanggal Sign Off" />

                                            <input type="text" 
                                            name="req_name"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Requestor Name" />

                                            <input type="text" 
                                            name="req_title"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Requestor Title" />

                                            <input type="text" 
                                            name="revas_name"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Revas Name" />

                                            <input type="text" 
                                            name="revas_title"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Revas Title" />

                            </div>
                            </div>

                            </div>

                            </div>
                                            {/* <input className='input-periodCard' type='month' selectedMonth={smonth} onChange={(month)=>setMonth(month)}/> */}
                                            
                                            {/* <p>Bulan: {smonth2} tahun: {syear2}</p>  */}
                                            <p>   </p>
                                        </div>

                                        <label className="col-sm-2 col-form-label">Period 3</label>
                                        <div className="col-sm-10">
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-month3">Input Data Periode 3</button>
                                        <div class="modal fade" id="modal-month3">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body">
                            <MonthYearPicker
                                            className='month-picker-card'
                                            selectedMonth={smonth3}
                                            selectedYear={syear3}
                                            minYear={2018}
                                            maxYear={2030}
                                            onChangeYear={(year) => setYear3(year)}
                                            onChangeMonth={(month) => setMonth3(month)}
                                            />
                                            <input type="text" 
                                            name="tgl_signoff"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Tanggal Sign Off" />

                                            <input type="text" 
                                            name="req_name"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Requestor Name" />

                                            <input type="text" 
                                            name="req_title"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Requestor Title" />

                                            <input type="text" 
                                            name="revas_name"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Revas Name" />

                                            <input type="text" 
                                            name="revas_title"
                                            className="form-control" 
                                            variant="filled"
                                            placeholder="Revas Title" />
                            </div>
                            </div>

                            </div>

                            </div>
                                            {/* <input className='input-periodCard' type='month' selectedMonth={smonth} onChange={(month)=>setMonth(month)}/> */}
                                            
                                            {/* <p>Bulan: {smonth3} tahun: {syear3}</p>  */}
                                            
                                        </div>
                                        </div>
                                <button
                                className="btn btn-danger"
                                type='submit'
                                onClick={getPDF}
                                >
                                    PDF
                                </button>
                            </form>
        </div>
      </div>
    </div>
      </div>
    </div>
    </div>
  )
}

export default TesAudit