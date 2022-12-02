import React from 'react';
import poin3 from '../img/poin3.png';
import poin4 from '../img/poin4.png';

const ModalMessage = () => {
  return (
    <div>

      <ul className='warehouse-notes' style={{listStyleType:'disc'}}>
        <li style={{marginLeft:'5%'}}>Pastikan connect VPN</li>
        <li style={{marginLeft:'5%'}}>Klik kanan di 'My Computer'</li>
        <li style={{marginLeft:'5%'}}>Klik 'Map Network Drive'</li>
        <li style={{marginLeft:'5%'}}>Isi field 'folder' : 
                                      <br/> <a href = "\\RPASHAREPAPP1\Scale_Up_Robot\ROB-050-MKT-PSR-EndtoEndTrackingAutomationForReadinessAndInspectionE-NodinRequest\User\Processed">
                                      \\RPASHAREPAPP1\Scale_Up_Robot\ROB-050-MKT-PSR-EndtoEndTrackingAutomationForReadinessAndInspectionE-NodinRequest\User\Processed</a>
                                      </li>
        <li style={{marginLeft:'5%'}}>Centang kedua kotak</li>
        <li style={{marginLeft:'5%'}}>Klik 'Finish'</li>
        <li style={{marginLeft:'5%'}}>Masukan :
                <ul>
                      <li>Username : Telkomsel\<b>domain</b></li>
                      <li>Password : <b>pass domain</b></li>
                </ul>
                <br/>
                <img src={poin3} style={{width:'80%'}}alt=""/>
        </li>
        <li style={{marginLeft:'5%'}}>Pilih dokumen yang diinginkan pada folder yang tersedia.
                                      <br/>
                                      <img src={poin4} style={{width:'80%'}}alt=""/>
        </li>
      </ul>
    </div>
  )
}

export default ModalMessage