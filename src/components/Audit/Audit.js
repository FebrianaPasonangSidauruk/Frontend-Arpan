import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { cobaAudit } from './apiAudit';
import ModalExcel from './ModalExcel';
import './Audit.css';
import {jsPDF} from "jspdf";
import ReactDOMServer from "react-dom/server";
import ModalPeriod1 from './ModalPeriod1';
import {FaDownload} from 'react-icons/fa'


const Audit = () => {
    const [requestors, setRequestors] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [query, setQuery] = useState("");

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

    const [title_dev, setTitle_dev] = useState([]);
    const [exporData, setExportData] = useState([]);
    const[req, setReq] = useState("");
    const[req2, setReq2] = useState("");
    const[req3, setReq3] = useState("");
    const bulan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

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

    const bagianAtas ={
        textAlign: "center",
        color: "green"
    }
    const bagTengah = {
        // fontFamily: "sans-serif"
        paddingTop: "3%",
        marginLeft: "5%",
        marginRight: "5%"
      };

      const garis ={
        border: "3px solid black"
      }

      const mengetahui= {
        paddingTop: "10%",
        textAlign: "center"
      };

      const ttd = {
        paddingTop: "10%",
        marginLeft: "25",
        textDecoration: "underline"
      };
      const jbtn = {
        paddingTop: "10%",
        marginLeft: "25"
      };

      const ttd_kanan ={
        marginLeft: "45%"
      }
      const tableStyle = {
        width: "100%",
        color: "blue"
      };
      const headstyle = {
        width: "100%",
        background: "blue"
      };

    const HandlePDF = () =>{
        <div>
          {/* <p>tes</p>   */}
       <div style={bagianAtas}>
        <h3> BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER</h3>
        <p><strong>Periode {smonth} {syear}</strong></p>
       </div> 
       <hr style={garis}></hr>
       <div style={bagTengah}>
       <p>Berita Acara ini dibuat untuk menerangkan bahwa secara resmi periode 
            bulan {smonth} tahun {syear}, Departemen {req} telah melakukan
            lalalalla
       </p>
       <p> Adapun dasar dari perubahan tersebut, dapat dilihat dalam lampiran. Demikian Berita Acara 
        ini dapat dipergunakan semestinya.
       </p>
       </div>
       <div style={mengetahui}>
        <p>Jakarta, .....</p>
        <p> Mengetahui dan Menyetujui</p>
       </div>
       <p style={ttd}><strong>
        namaaa sdksjdna
       <span style={ttd_kanan}>
        nama abcdefghij
       </span>
       </strong>
       </p>
       <p style={jbtn}>
        namaaa sdksjdna
       <span style={ttd_kanan}>
        nama abcdefghij
       </span>
       </p>
       </div>
    }
    
    const getPDF = () =>{
        // const teks = renderToString(<HandlePDF/>)
        const pdf = new jsPDF("p", "mm", "a4");
        // doc.html(teks);
        // doc.save("berita");
        pdf.html(ReactDOMServer.renderToString(<HandlePDF/>), {
            callback: function (pdf){
                pdf.save("sample.pdf");
            }
        });

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
                                <ModalExcel requestor_audit={exporData}/>
                            </div>
                            </div>

                            </div>

                            </div>
                            </form>
                            

                            <form className='form-horizontal' onSubmit={handleSubmitPeriod}>
                                        <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Periode</label>
                                        <div className="col-sm-10">


                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-month">Input Data periode 1</button>
                                        <div class="modal fade" id="modal-month">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body">
                                            <ul className="nav nav-card-profile">
                                                <li className="nav-items"><input type ='text' className="form-control" placeholder='Tahun' value={syear} onChange={(e) => setYear(e.target.value)}></input></li>
                                                <li className="nav-items"><select
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
                                                
                                            </select></li>
                                            </ul>
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
                            <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                            </div>

                            </div>

                            </div>
                            <i className="nav-icon fas" style={{marginLeft:"2%", cursor:"pointer"}} data-toggle="modal" data-target="#modal-month-tes" ><FaDownload/></i>
                            {/* <button type="button" class="btn btn-primary" style={{marginLeft:"2%"}} data-toggle="modal" data-target="#modal-month-tes"><FaDownload/></button> */}
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
                                            
                                            {/* <p>Bulan: {smonth} tahun: {syear}</p>  */}
                                            <p>   </p>
                                        </div>
                                        
                                        <label className="col-sm-2 col-form-label">Periode</label>
                                        <div className="col-sm-10">
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-month2">Input Data Periode 2</button>
                                        <div class="modal fade" id="modal-month2">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body">
                            <ul className="nav nav-card-profile">
                                                <li className="nav-items"><input type ='text' className="form-control" placeholder='Tahun' value={syear2} onChange={(e) => setYear2(e.target.value)}></input></li>
                                                <li className="nav-items"><select
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
                                                
                                            </select></li>
                                            </ul>

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
                            <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                            </div>

                            </div>

                            </div>
                                            <p>   </p>
                                        </div>

                                        <label className="col-sm-2 col-form-label">Periode</label>
                                        <div className="col-sm-10">
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-month3">Input Data Periode 3</button>
                                        <div class="modal fade" id="modal-month3">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body">
                            <ul className="nav nav-card-profile">
                                                <li className="nav-items"><input type ='text' className="form-control" placeholder='Tahun' value={syear3} onChange={(e) => setYear3(e.target.value)}></input></li>
                                                <li className="nav-items"><select
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
                                                
                                            </select></li>
                                            </ul>
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
                            <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
                            </div>
                            </div>

                            </div>

                            </div>
                                            
                                        </div>
                                        </div>
                                
                            </form>
                            {/* <button
                                className="btn btn-danger"
                                type='button'
                                onClick={getPDF}
                                >
                                    PDF
                                </button> */}

        </div>
      </div>
    </div>
      </div>
    </div>
    </div>
  )
}

export default Audit