import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { cobaAudit } from './apiAudit';
import TesModal from './ModalExcel';
import './Audit.css';
import {jsPDF} from "jspdf";
import ReactDOMServer from "react-dom/server";

const PDFFile = () => {
    const [requestors, setRequestors] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [query, setQuery] = useState("");

    const [smonth, setMonth] = useState("");
    const [syear, setYear] = useState("2022");
    const [smonth2, setMonth2] = useState("");
    const [syear2, setYear2] = useState("2022");
    const [smonth3, setMonth3] = useState("");
    const [syear3, setYear3] = useState("2022");

    const [title_dev, setTitle_dev] = useState([]);
    const [exporData, setExportData] = useState([]);
    const[req, setReq] = useState("");
    const[req2, setReq2] = useState("");
    const[req3, setReq3] = useState("");
    const bulan = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const [tess, settes] = useState("hai");

    useEffect(() => {
        getProducts();
      }, []);

      const getProducts = async() =>{
        const res = await axios.get(`getAllProject`);

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
    const seluruh ={
        marginLeft: "25%"
    }
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
        border: "3px solid black",
        width: "100%"
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

      const Prints = () => (
        <div style={{ display: "inline-block", flexWrap: "wrap" }}>
          <div >
        <p style={{fontSize: "20px", align: 'center'}}> BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER</p>
        <p><strong>Periode {smonth} {syear}</strong></p>
       </div> 
       <hr style={{border:"3px solid black", width:"100%"}}></hr>
       <div style={{marginLeft:"90"}}>
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
      );
      
   

    const printin = () => {
        var getContent = 
        <div style={{ display: "inline-block", flexWrap: "wrap" }}>
          <div >
        <p style={{fontSize: "20px", align: 'center'}}> BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER</p>
        <p><strong>Periode {smonth} {syear}</strong></p>
       </div> 
       <hr style={{border:"3px solid black", width:"100%"}}></hr>
       <div style={{marginLeft:"90"}}>
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
        </div>;
        const pdf = new jsPDF("p", "px", "letter");
        pdf.html(ReactDOMServer.renderToString(getContent), {
            margin:[20,40, 20, 40],
            callback: function (pdf){
                // pdf.save("sample.pdf");
                window.open(pdf.output('bloburl'));
            },
            x: 30,
            y: 10
        });
        
      };
    
    const print = () =>{
        var doc = new jsPDF(); 
        var kal = ['periode', smonth, syear];
        var width = doc.internal.pageSize.getWidth()
        doc.setFont(undefined, 'bold').text(width/2, 10, 'BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER', { align: 'center' });
        doc.text(width/2.7, 20, 'Periode');
        doc.text(width/2.1, 20, smonth);
        doc.text(width/1.9, 20, syear).setFont(undefined, 'normal'); 
        doc.text(width/2.1, 20, smonth, syear);
        doc.setLineWidth(1.5);
        doc.line(10, 30, 200, 30);   
        doc.text(10, 40, 'Contact me at');    
        doc.text(10, 50, 'I have just created a simple pdf using jspdf');
        doc.text(50, 40, req);
        window.open(doc.output('bloburl'));
        // doc.save('katara.pdf'); 
    }


  return(
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
                                            
                                            
                                            <p>Bulan: {smonth} tahun: {syear}</p> 
                                            <p>   </p>
                                        </div>
                                        
                                        <label className="col-sm-2 col-form-label">Period 2</label>
                                        <div className="col-sm-10">
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-month2">Input Data Periode 2</button>
                                        <div class="modal fade" id="modal-month2">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body">

                                            <ul className="nav nav-card-profile">
                                                <li className="nav-items"><input type ='text' className="form-control" placeholder='Tahun' value={syear2} onChange={(e) => setYear2(e.target.value)}></input></li>
                                                <li className="nav-items"><input type ='text' className="form-control" value={smonth2} onChange={(e) => setMonth2(e.target.value)}></input></li>
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
                            </div>

                            </div>

                            </div>

                                            <p>   </p>
                                        </div>

                                        <label className="col-sm-2 col-form-label">Period 3</label>
                                        <div className="col-sm-10">
                                        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#modal-month3">Input Data Periode 3</button>
                                        <div class="modal fade" id="modal-month3">
                            <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-body">

                                            <ul className="nav nav-card-profile">
                                                <li className="nav-items"><input type ='text' className="form-control" placeholder='Tahun' value={syear3} onChange={(e) => setYear3(e.target.value)}></input></li>
                                                <li className="nav-items"><input type ='text' className="form-control" value={smonth3} onChange={(e) => setMonth3(e.target.value)}></input></li>
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
                            </div>

                            </div>

                            </div>
                                            
                                        </div>
                                        </div>
                                
                            </form>
                            <button onClick={print}>print</button>

        </div>
      </div>
    </div>
      </div>
    </div>
    </div>
  )
};

export default PDFFile;