import React from 'react';
import poin3 from '../img/poin3.png';
import poin4 from '../img/poin4.png';

const ModalMessage = () => {
  return (
    <div>

      <ul className='warehouse-notes' style={{listStyleType:'disc'}}>
        <li style={{marginLeft:'5%'}}>Buka file explorer di laptop Anda</li>
        <li style={{marginLeft:'5%'}}>Copy paste link berikut di file explorer : 
                                      <br/> <a href = "\\10.59.70.27\Scale_Up_Robot\ROB-050-MKT-PSR-EndtoEndTrackingAutomationForReadinessAndInspectionE-NodinRequest\User\Processed">
                                        \\10.59.70.27\Scale_Up_Robot\ROB-050-MKT-PSR-EndtoEndTrackingAutomationForReadinessAndInspectionE-NodinRequest\User\Processed</a>
                                        <br/>
                                        <img src={poin3} style={{width:'80%'}}alt=""/>
                                      </li>
        <li style={{marginLeft:'5%'}}>Login dengan user LDAP.</li>
        <li style={{marginLeft:'5%'}}>Pilih dokumen yang diinginkan pada folder yang tersedia.
                                      <br/>
                                      <img src={poin4} style={{width:'80%'}}alt=""/>
        </li>
      </ul>
    </div>
  )
}

export default ModalMessage