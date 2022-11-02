import React, {useState, useEffect} from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { filterselection } from './apiModalExcel';

const ModalExcel = ({requestor_audit, smonth, syear, smonth2, syear2, smonth3, syear3, req, req2, req3}) => {
  const [check, setCheck]= useState(true);
  const [selection, setSelection]= useState(false);
  const [selection1, setSelection1]= useState(true);
  const [
    reqAudit, setReqaudit] = useState([]);
  const [exporData, setExportData] = useState([]);
  // console.log(selected);

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
    let val =(Number(value)) %2 ;
    console.log(projid)
    // setChecked(e.target.checked);
    console.log(value,"sad",val)
    // setSelection(check);

    try {
      await axios.patch(`datas/${projid}`, {
        selection: val
      });
    } catch (error) {
      console.log(error);
    }

  }

  const dataProjectHandler = async() =>{
    // event.preventDefault()
    const data = await filterselection(req, req2, req3, smonth, syear, smonth2, syear2, smonth3, syear3);
    // setKeyword(event.target.value)
    
    setExportData(data);
    console.log(data);
    console.log(exporData)

    // setPage(0);
    //   setMsg("");
    //   setKeyword(query);
    // handleOnExport()
  }



  const handleOnExport = () =>{
    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(exporData);
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
                            <button type="button" class="btn btn-default" onClick={dataProjectHandler}>Save</button>
                            <button type="button" class="btn btn-danger" onClick={handleOnExport}>Download XLSX</button>
                            </div>
    <table class="table table-bordered table-hover">
    <thead>
    <tr className='row-table'>
                      <th className='project-header'>No</th>
                      <th className='project-header'>id</th>
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
            <td>{audit.id_project}</td>
            <td>{audit.no_nodin_bo}</td>
            <td>{audit.subject_nodin_rfsrfi}</td>
            <td>{audit.date_nodin_rfsrfi}</td>
            <td>{audit.no_nodin_rfsrfi}</td>
            <td>{audit.no_nodin_rfcitr}</td>
            <td>
              <input
                type="checkbox"
                // name={audit.id_project}
                checked={audit.selection}
                // id={audit.id_project}
                onChange={
                  (e)=>{
                  let coba = e.target.checked;
                  console.log(e.target.checked)
                  setReqaudit(
                    requestor_audit.map(data => {
                      if(audit.id_project === data.id_project){
                        data.selection = coba
                      }
                      // setSelection(e.target.checked)
                      // handleSelection(audit.id_project)
                      return data
                    })
                  )
                  // handleSelection(audit.id_project)
                  // setSelection(e.target.checked)

                  handleSelection(audit.id_project,audit.selection);
                  // setSelection(e.target.checked)
                  
                  
                }
              }
                // onClick={() => handleSelection(audit.id_project)}
              /></td>
          </tr>
        ))}
    </tbody>
    </table>

  
</div>
  )
}

export default ModalExcel