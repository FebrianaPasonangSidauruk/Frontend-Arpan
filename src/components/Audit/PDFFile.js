import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { cobaAudit } from './apiAudit';
import TesModal from './TesModal';
import './Audit.css';
import {jsPDF} from "jspdf";
import ReactDOMServer from "react-dom/server";

const PDFFile = () => {
    const [requestors, setRequestors] = useState([]);
    const [keyword, setKeyword] = useState("");

    const [query, setQuery] = useState("");

    const [smonth, setMonth] = useState();
    const [syear, setYear] = useState("2022");
    const [smonth2, setMonth2] = useState();
    const [syear2, setYear2] = useState("2022");
    const [smonth3, setMonth3] = useState();
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
      
   

    const print = () => {
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
    
    // const print = () =>{
    //     var doc = new jsPDF(); 
    //     var width = doc.internal.pageSize.getWidth()
    //     doc.setFont(undefined, 'bold').text(width/2, 10, 'BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER', { align: 'center' });
    //     doc.text(width/2.8, 20, 'Periode');
    //     doc.text(width/2.2, 20, smonth);
    //     doc.text(width/2.1, 20, syear).setFont(undefined, 'normal');    
    //     doc.lines([[2,2],[-2,2],[1,1,2,2,3,3],[2,1]], 212,110, [1,1], 'F', false)
    //     doc.text(10, 40, 'Contact me at');    
    //     doc.text(10, 30, 'I have just created a simple pdf using jspdf');
    //     doc.text(50, 40, req);
    //     doc.save('katara.pdf'); 
    // }


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




// import React, {useState} from "react";
// import { Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
// import LebronStretch from "../photos/lebron_transparent.png";

// const styles = StyleSheet.create({
//   body: {
//     paddingTop: 35,
//     paddingBottom: 65,
//     paddingHorizontal: 35,
//   },
//   title: {
//     fontSize: 24,
//     textAlign: "center",
//   },
//   text: {
//     margin: 12,
//     fontSize: 14,
//     textAlign: "justify",
//     fontFamily: "Times-Roman",
//   },
//   image: {
//     marginVertical: 15,
//     marginHorizontal: 100,
//   },
//   header: {
//     fontSize: 12,
//     marginBottom: 20,
//     textAlign: "center",
//     color: "grey",
//   },
//   pageNumber: {
//     position: "absolute",
//     fontSize: 12,
//     bottom: 30,
//     left: 0,
//     right: 0,
//     textAlign: "center",
//     color: "grey",
//   },
// });

// const PDFFile = ({textheader}) => {
//     const [isLoading, setIsLoading] = useState(false);

//     console.log('boolean', isLoading)
//   return (
//     <Document>
//       <Page style={styles.body}>
//         <Text style={styles.header} fixed>{textheader}</Text>
//         <Image style={styles.image} src={LebronStretch} />
//         <Text style={styles.text}>
//           Oh right. I forgot about the battle. Wow, you got that off the
//           Internet? In my day, the Internet was only used to download
//           pornography. I don't know what you did, Fry, but once again, you
//           screwed up! Now all the planets are gonna start cracking wise about
//           our mamas. She also liked to shut up! We'll go deliver this crate like
//           professionals, and then we'll go home. In your time, yes, but nowadays
//           shut up! Besides, these are adult stemcells, harvested from perfectly
//           healthy adults whom I killed for their stemcells. And I'm his friend
//           Jesus. Incidentally, you have a dime up your nose. Oh, you're a dollar
//           naughtier than most. Bender, being God isn't easy. If you do too much,
//           people get dependent on you, and if you do nothing, they lose hope.
//           You have to use a light touch. Like a safecracker, or a pickpocket.
//           And why did 'I' have to take a cab? Perhaps, but perhaps your
//           civilization is merely the sewer of an even greater society above you!
//           Why would a robot need to drink? Stop! Don't shoot fire stick in space
//           canoe! Cause explosive decompression! I'm sure those windmills will
//           keep them cool. No! I want to live! There are still too many things I
//           don't own! Now that the, uh, garbage ball is in space, Doctor, perhaps
//           you can help me with my sexual inhibitions? I feel like I was mauled
//           by Jesus. Anyhoo, your net-suits will allow you to experience Fry's
//           worm infested bowels as if you were actually wriggling through them.
//           Bender, I didn't know you liked cooking. That's so cute. Who am I
//           making this out to? Aww, it's true. I've been hiding it for so long.
//           Are you crazy? I can't swallow that. Bite my shiny metal ass. Leela's
//           gonna kill me. You know, I was God once. There, now he's trapped in a
//           book I wrote: a crummy world of plot holes and spelling errors! Yes!
//           In your face, Gandhi! This is the worst kind of discrimination: the
//           kind against me! No, I'm Santa Claus! You are the last hope of the
//           universe. I am the man with no name, Zapp Brannigan! Why would I want
//           to know that? I guess if you want children beaten, you have to do it
//           yourself. Oh, I think we should just stay friends. No, just a regular
//           mistake. I'm Santa Claus! And then the battle's not so bad? I daresay
//           that Fry has discovered the smelliest object in the known universe!
//           No! The kind with looting and maybe starting a few fires! Bender, quit
//           destroying the universe! So, how 'bout them Knicks? Yes! In your face,
//           Gandhi! For one beautiful night I knew what it was like to be a
//           grandmother. Subjugated, yet honored. Bite my shiny metal ass. You
//           know the worst thing about being a slave? They make you work, but they
//           don't pay you or let you go. There's no part of that sentence I didn't
//           like! And when we woke up, we had these bodies. Oh sure! Blame the
//           wizards! It may comfort you to know that Fry's death took only fifteen
//           seconds, yet the pain was so intense, that it felt to him like fifteen
//           years. And it goes without saying, it caused him to empty his bowels.
//           You guys aren't Santa! You're not even robots. How dare you lie in
//           front of Jesus? Hey, whatcha watching? No, I'm Santa Claus! If rubbin'
//           frozen dirt in your crotch is wrong, hey I don't wanna be right. Oh,
//           you're a dollar naughtier than most. Then we'll go with that data
//           file! Fry, we have a crate to deliver. And why did 'I' have to take a
//           cab? I guess if you want children beaten, you have to do it yourself.
//           Say it in Russian! Anyhoo, your net-suits will allow you to experience
//           Fry's worm infested bowels as if you were actually wriggling through
//           them. And I'm his friend Jesus. Now what? Your best is an idiot! Quite
//           possible. We live long and are celebrated poopers. Switzerland is
//           small and neutral! We are more like Germany, ambitious and
//           misunderstood! I guess because my parents keep telling me to be more
//           ladylike. As though! You know the worst thing about being a slave?
//           They make you work, but they don't pay you or let you go.
//         </Text>
//         <Text
//           style={styles.pageNumber}
//           render={({ pageNumber, totalPages }) =>
//             `${pageNumber} / ${totalPages}`
//           }
//         />
//       </Page>
//     </Document>
//   );
// };

// export default PDFFile;