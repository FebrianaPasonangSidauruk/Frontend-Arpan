import React, {useState, useEffect} from 'react'
import {FaPencilAlt} from 'react-icons/fa'
import Options from './Options'
import './Options.css';

function ProjectList({project}) {
  return (
    <>
                    <td>{project.id_project}</td>
                    <td>{project.no_nodin_rfsrfi}</td>
                    <td>{project.date_nodin_rfsrfi}</td>
                    <td>{project.subject_nodin_rfsrfi}</td>
                    <td>{project.status}</td>
                    <td>{project.detail_status}</td>
                    <td>{project.no_nodin_rfcitr}</td>
                    <td>{project.date_nodin_rfcitr}</td>
                    <td>{project.subject_nodin_rfcitr}</td>
                    <td>{project.title_dev}</td>
                    <td>{project.pic_dev}</td>
                    <td>{project.type_nodin}</td>
                    <td>{project.no_nodin_bo}</td>
                    <td>
                        <button type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-default"><i className="fas"><FaPencilAlt/> </i></button>
                    </td>

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
            <Options project={project}/>
        </div>
        <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>

        </div>

        </div>
    </>
  )
}

export default ProjectList