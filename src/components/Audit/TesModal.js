import React from 'react'

const TesModal = ({requestor_audit}) => {
  return (
    <div className='modalOptionsContainer '>
    <div className="card-header">
      <h3 className="card-title">Tabel</h3>
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

export default TesModal