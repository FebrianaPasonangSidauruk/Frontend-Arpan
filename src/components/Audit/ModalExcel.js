import React, {useState, useEffect} from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { filterselection } from './apiModalExcel';

const ModalExcel = ({requestor_audit, smonth, syear, smonth2, syear2, smonth3, syear3, req, req2, req3}) => {
  const [selection, setSelection]= useState(false);
  const [reqAudit, setReqaudit] = useState([]);
  const [exporData, setExportData] = useState([]);

  useEffect(() => {
    setReqaudit(
      requestor_audit.map(data => {
        return{
          selection: data.selection,
          id_project: data.id_project,
          no_nodin_bo: data.no_nodin_bo,
          subject_nodin_rfsrfi: data.subject_nodin_rfsrfi,
          date_nodin_rfsrfi: data.date_nodin_rfsrfi,
          no_nodin_rfsrfi: data.no_nodin_rfsrfi,
          no_nodin_rfcitr: data.no_nodin_rfcitr
        }
      })
    )
  }, [])

  const handleSelection =async(projid,value) =>{
    let val =(Number(value));
    console.log('id',projid, 'value in boolean', value,"or",val)
    try {
      await axios.patch(`datasProject/${projid}`, {
        selection: val
      });
    } catch (error) {
      console.log(error);
    }

  }

  const dataProjectHandler = async() =>{
    const data = await filterselection(req, req2, req3, smonth, syear, smonth2, syear2, smonth3, syear3);   
    setExportData(data);
    // console.log(data);
    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "Project");
    XLSX.utils.sheet_add_aoa(ws, 
      [["Nodin Number", "Nodin Title", "Date",
        "No Nodin RFS/RFI", "No Nodin RFC/ITR"
    ]], 
      { origin: "A1" });
      ws["!cols"] = [ { wch: 30 } ];

    XLSX.writeFile(wb, "KertasKerja.xlsx");
  }

  return (
    <div className='modalOptionsContainer '>
      <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-danger" onClick={dataProjectHandler}>Download XLSX</button>
                            </div>
    <table class="table table-bordered table-hover">
    <thead>
    <tr className='row-table'>
                      <th className='project-header'>No</th>
                      <th className='project-header'>Nodin Number</th>
                      <th className='project-header'>Nodin Title</th>
                      <th className='project-header'>Date</th>
                      <th className='project-header'>No Nodin RFS/RFI</th>
                      <th className='project-header'>No Nodin RFC/ITR</th>
                      <th className='project-header'>Select</th>
                  </tr>
    </thead>
    <tbody>
        {requestor_audit.map((audit, index)=>(
            <tr key={audit.id_project}>
            <td>{index + 1}</td>
            <td>{audit.no_nodin_bo}</td>
            <td>{audit.subject_nodin_rfsrfi}</td>
            <td>{audit.date_nodin_rfsrfi}</td>
            <td>{audit.no_nodin_rfsrfi}</td>
            <td>{audit.no_nodin_rfcitr}</td>
            <td>
              <input
                type="checkbox"
                checked={audit.selection}
                onChange={
                  (e)=>{
                    let valCheck = e.target.checked;
                    console.log(e.target.checked)
                      setReqaudit(
                        requestor_audit.map(data => {
                            if(audit.id_project === data.id_project){
                              data.selection = valCheck
                            }
                              return data
                        })
                      )
                  handleSelection(audit.id_project,audit.selection);
                }
              }
              /></td>
          </tr>
        ))}
    </tbody>
    </table> 
</div>
  )
}

export default ModalExcel