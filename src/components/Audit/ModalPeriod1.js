//show pdf

import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const ModalPeriod1 = ({smonth, syear, req, tgl_signoff1, req_name1, req_title1, revas_name1, revas_title1}) => {
    const printpdf = useRef();

    const handlePrintPDF = useReactToPrint({
        content: () => printpdf.current,
    });

  return (
    <>
        <div>
            {/* displayed on the page */}
            <div style={{marginLeft:"10%", marginRight:"10%", marginTop:"5%", marginBottom:"5%"}}>
                <div style={{textAlign:'center'}} >
                    <h4><strong>BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER</strong> </h4>
                    <h5><strong>PERIODE {smonth} {syear}</strong></h5>
                </div>
                <hr style={{border:"3px solid black"}}></hr>
                    <p>Berita Acara ini dibuat untuk menerangkan bahwa secara resmi periode 
                            bulan {smonth} tahun {syear}, Departemen {req} telah melakukan
                            lalalalla
                    </p>

                    <p> Adapun dasar dari perubahan tersebut, dapat dilihat dalam lampiran. Demikian Berita Acara 
                        ini dapat dipergunakan semestinya.
                    </p>

                <br/><br/><br/>
                <div style={{textAlign:'center'}}>
                    <p>Jakarta, {tgl_signoff1}</p>
                    <p> Mengetahui dan Menyetujui</p>
                </div>
                <p style={{paddingTop:"15%", textDecoration: "underline"}}><strong>{req_name1}<span style={{marginLeft:"45%"}}> {revas_name1}</span></strong></p>
                <p >{req_title1}<span style={{marginLeft:"30%"}}> {revas_title1}</span></p>
            </div> 

        
        </div>
        {/* content */}
        <div style={{display:"none"}}>
            <div id="print" ref={printpdf} style={{marginLeft:"10%", marginRight:"10%", marginTop:"5%", marginBottom:"5%"}}>
                <div style={{textAlign:'center'}} >
                    <h2><strong>BERITA ACARA PEKERJAAN PERUBAHAN PARAMETER</strong> </h2>
                    <h3><strong>PERIODE {smonth} {syear}</strong></h3>
                </div>
                <hr style={{border:"3px solid black"}}></hr>
                <h3>Berita Acara ini dibuat untuk menerangkan bahwa secara resmi periode 
                        bulan {smonth} tahun {syear}, Departemen {req} telah melakukan
                        lalalalla
                </h3>

                <h3> Adapun dasar dari perubahan tersebut, dapat dilihat dalam lampiran. Demikian Berita Acara 
                    ini dapat dipergunakan semestinya.
                </h3>

                <br/><br/><br/>
            <div style={{textAlign:'center'}}>
                <h3>Jakarta, {tgl_signoff1}</h3>
                    <h3> Mengetahui dan Menyetujui</h3>
            </div>
                <h3 style={{paddingTop:"15%", textDecoration: "underline"}}><strong>{req_name1}<span style={{marginLeft:"45%"}}> {revas_name1}</span></strong></h3>
                <h3 >{req_title1}<span style={{marginLeft:"30%"}}> {revas_title1}</span></h3>
            </div>
        </div>
        
        <div class="modal-footer justify-content-between">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" onClick={handlePrintPDF}>Download PDF</button>
                                </div>
        
    </>
  )
}

export default ModalPeriod1