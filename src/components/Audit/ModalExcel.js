import React from 'react';
import * as XLSX from 'xlsx';

const ModalExcel = ({requestor_audit}) => {
  const handleOnExport = () =>{
    var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(requestor_audit);
    XLSX.utils.book_append_sheet(wb, ws, "Project");
    XLSX.utils.sheet_add_aoa(ws, 
      [["Nodin Number", "Nodin Title", "Date",
        "No Nodin RFS/RFI", "No Nodin RFC/ITR"
    ]], 
      { origin: "A1" });

      // const max_width = exporData.reduce((w, r) => Math.max(w, r.name.length), 40);
      ws["!cols"] = [ { wch: 30 } ];

    XLSX.writeFile(wb, "KertasKerja.xlsx");
}

  return (
    <div className='modalOptionsContainer '>
      <div class="modal-footer justify-content-between">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Save</button>
                            <button type="button" class="btn btn-danger" onClick={handleOnExport}>Download XLSX</button>
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
                  </tr>
    </thead>
    <tbody>
        {requestor_audit.map((audit, index)=>(
            <tr key={index}>
            <td>{index + 1}</td>
            <td>{audit.no_nodin_bo}</td>
            <td>{audit.subject_nodin_rfsrfi}</td>
            <td>{audit.date_nodin_rfsrfi}</td>
            <td>{audit.no_nodin_rfsrfi}</td>
            <td>{audit.no_nodin_rfcitr}</td>
          </tr>
        ))}
    </tbody>
    </table>

  
</div>
  )
}

export default ModalExcel