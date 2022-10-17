import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Tes from './Tes';
import MonthYearPicker from 'react-month-year-picker';
import { cobaAudit } from './apiAudit';
import TesModal from './TesModal';
import './Audit.css';

import { v4 as uuidv4 } from 'uuid';

const TesAudit = () => {
    const [requestors, setRequestors] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [keyword2, setKeyword2] = useState("");
    const [keyword3, setKeyword3] = useState("");
    const [query, setQuery] = useState("");
    const [smonth, setMonth] = useState();
    const [syear, setYear] = useState(2022);
    const [title_dev, setTitle_dev] = useState([]);
    const [exporData, setExportData] = useState([]);
    const[req, setReq] = useState("");
    const[req2, setReq2] = useState("");
    const[req3, setReq3] = useState("");
    const[defaultval, setDefaultval] = useState("kosongin")

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

    const dataProjectHandler = async(event) =>{
        const data = await cobaAudit(event.target.value);
        setKeyword(event.target.value)
        console.log(data);
        setExportData(data);
        console.log(exporData)
      }

    const [inputFieldsRequestor, setInputFieldsRequestor] = useState([
        {idRequestor: uuidv4(), requestor: ''},
    ]);
    
    const dataProjectRequestor = async(event) => {
        // event = keyword;
        // setExportData([]);
        event.preventDefault();
        setKeyword(req);
        setKeyword2(req2);
        setKeyword2(req3);
        console.log("keyword", keyword)
        const data = await cobaAudit(req, req2, req3)
        setExportData(data);
        console.log(exporData)
        console.log(data);
        // e.preventDefault();
        // re.preventDefault();
        // console.log("Req1 req2 re3", e)
        // const data = await cobaAudit(event.target.value);
        console.log("Req1 req2 re3", req, req2, req3)
        // console.log("InputFieldsRequestor", inputFieldsRequestor);
    };

    const handlebuttonreq = (req, req2, req3) => {
        console.log("Req1 req2 re3", req, req2, req3)
        // console.log("InputFieldsRequestor", inputFieldsRequestor);
    };


    const handleSubmitAll = (e) => {
        e.preventDefault();
        console.log("InputFieldsRequestor", inputFieldsRequestor);
        console.log("InputFieldsPeriod", inputFieldsPeriod);
    };

    const submitrequestor= (e) =>{
        e.preventDefault();
        setKeyword(query);
        console.log("Requestor", requestors);

    }

    //period
    const [inputFieldsPeriod, setInputFieldsPeriod] = useState([
        {idPeriod: uuidv4(), period: '', tgl_signoff:'', req_name:'', req_title:'', revas_name:'', revas_title:''},
    ]);
    
    const handleSubmitPeriod = (e) => {
        e.preventDefault();
        // setKeyword(query);
        console.log("InputFieldsPeriod", inputFieldsPeriod);
        // console.log("Requestor", requestors);
    };

    const handleChangeInputPeriod = (idPeriod, event) => {
        const newInputFieldsPeriod = inputFieldsPeriod.map(a => {
            if(idPeriod === a.idPeriod){
                a[event.target.name] = event.target.value
            }
            return a;
        })

        setInputFieldsPeriod(newInputFieldsPeriod);
    }

    const handleAddFieldsPeriod = () =>{
        setInputFieldsPeriod([...inputFieldsPeriod, {idPeriod: uuidv4(), period: '', tgl_signoff:'', req_name:'', req_title:'', revas_name:'', revas_title:''}])
        // setRequestors([...requestors]);
    }

    const handleRemoveFieldsPeriod = idPeriod => {
        const values = [...inputFieldsPeriod];
        values.splice(values.findIndex(value => value.idPeriod === idPeriod), 1);
        setInputFieldsPeriod(values);
    }

    const submitPeriod= (e) =>{
        e.preventDefault();
        setKeyword(query);
        // console.log("Period", periods);

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
          
                            <form className='form-horizontal'>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Requestor</label>
                                        <div className="col-sm-8">
                                            <select
                                                className="custom-select"
                                                name="example"
                                                placeholder='pilih'
                                                onChange={(event) => setReq(event.target.value)}
                                                // onChange={(event) => dataProjectHandler(event)}
                                                style={{ paddingTop: "5px", marginTop: "10px" }}
                                            >
                                                {title_dev.map((requestor) => (
                                                    <option value={requestor}
                                                    // onChange={(requestor)=> setReq(requestor.target.value)}
                                                    >
                                                        {requestor}
                                                    </option>
                                                ))}
                                                <option>--Select--</option>
                                            </select>
                                        </div>
                                        <p>req1: {req}</p> 
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
                                            ><option>--Select--</option>
                                                {title_dev.map((requestor) => (
                                                    <option value={requestor}>
                                                        {requestor}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p>req1: {req2}</p> 
                                        <label className="col-sm-2 col-form-label">OR</label>
                                </div>
                                <div className="form-group row">
                                    <label className="col-sm-2 col-form-label">Requestor 3</label>
                                        <div className="col-sm-8">
                                            <select
                                                className="custom-select"
                                                name="example"
                                                onChange={(event) => setReq3(event.target.value)}
                                                // onChange={(event) => dataProjectHandler(event)}
                                                style={{ paddingTop: "5px", marginTop: "10px" }}
                                            >
                                                {/* <option value="-" disabled selected hidden>Please Choose Requestor Name or Choose - ...</option> */}
                                                <option >-</option>
                                                {title_dev.map((requestor) => (
                                                    <option value={requestor}>
                                                        {requestor}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <p>req1: {req3}</p> 
                                </div>

                                <button
                                className="btn btn-danger"
                                // type='submit'
                                onClick={dataProjectRequestor}
                                >
                                    save
                                </button>
                            </form>
                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-default">cek</button>
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
                            <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                            </div>

                            </div>

                            </div>

                            <form className='form-horizontal' onSubmit={handleSubmitPeriod}>
                                        <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Period</label>
                                        <div className="col-sm-10">
                                            {/* <input className='input-periodCard' type='month' onChange={(month)=>setMonth(month)}/> */}
                                            <MonthYearPicker
                                            className='month-picker-card'
                                            selectedMonth={smonth}
                                            selectedYear={syear}
                                            minYear={2018}
                                            maxYear={2030}
                                            onChangeYear={(year) => setYear(year)}
                                            onChangeMonth={(month) => setMonth(month)}
                                            />
                                            <p>Bulan: {smonth} tahun: {syear}</p> 
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
                                <button
                                className="btn btn-danger"
                                type='submit'
                                onClick={handleSubmitAll}
                                >
                                    send
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