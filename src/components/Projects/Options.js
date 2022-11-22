import { useState, useEffect } from 'react'
import axios from "axios";
import './Options.css';

const Options = ({project}) => {
    const [testing_progress, setTesting_progress] = useState('');
    const [no_nodin_rfsrfi, setNo_nodin_rfsrfi] = useState('');
    const [date_nodin_rfsrfi, setDate_nodin_rfsrfi] = useState('');
    const [subject_nodin_rfsrfi, setSubject_nodin_rfsrfi] = useState('');
    const [status, setStatus] = useState('');
    const [detail_status, setDetail_status] = useState('');
    const [start_date_testing, setStart_date_testing] = useState('');
    const [end_date_testing, setEnd_date_testing] = useState('');
    const [notes_testing, setNotes_testing] = useState('');
    const [testcase_amt, setTestcase_amt] = useState('');
    const [dev_effort, setDev_effort] = useState('');
    const [project_type, setProject_type] = useState('');
    const [services, setServices] = useState('');
    const [brand, setBrand] = useState('');
    const [pic_tester_1, setPic_tester_1] = useState('');
    const [pic_tester_2, setPic_tester_2] = useState('');
    const [pic_tester_3, setPic_tester_3] = useState('');
    const [pic_tester_4, setPic_tester_4] = useState('');
    const [pic_tester_5, setPic_tester_5] = useState('');

    const id_project  = project;
    

    useEffect(() => {
      console.log('h')
        getDataById();
    }, []);

    const updateData = async (e) => {
        e.preventDefault();
        // id = users.id 
        console.log("ya")
        console.log(id_project)
        console.log(testing_progress)
        try {
          await axios.patch(`datasProject/${id_project}`, {
            testing_progress: testing_progress,
            no_nodin_rfsrfi: no_nodin_rfsrfi ,
            date_nodin_rfsrfi: date_nodin_rfsrfi ,
            subject_nodin_rfsrfi: subject_nodin_rfsrfi,
            status: status,
            detail_status:detail_status,
            start_date_testing:start_date_testing,
            end_date_testing:end_date_testing,
            notes_testing:notes_testing,
            testcase_amt:testcase_amt,
            dev_effort:dev_effort,
            project_type:project_type,
            services:services,
            brand:brand,
            pic_tester_1:pic_tester_1,
            pic_tester_2:pic_tester_2,
            pic_tester_3:pic_tester_3,
            pic_tester_4:pic_tester_4,
            pic_tester_5:pic_tester_5  
          });
        } catch (error) {
          console.log(error);
        }
      };

      const getDataById = async () => {
        console.log(id_project)
        const response = await axios.get(`datasProject/${id_project}`);
        setTesting_progress(response.data.testing_progress);
        setNo_nodin_rfsrfi(response.data.no_nodin_rfsrfi);
        setDate_nodin_rfsrfi(response.data.date_nodin_rfsrfi);
        setSubject_nodin_rfsrfi(response.data.subject_nodin_rfsrfi);
        setStatus(response.data.status);
        setDetail_status(response.data.detail_status);
        setStart_date_testing(response.data.start_date_testing);
        setEnd_date_testing(response.data.end_date_testing);
        setNotes_testing(response.data.notes_testing);
        setTestcase_amt(response.data.testcase_amt);
        setDev_effort(response.data.dev_effort);
        setProject_type(response.data.project_type);
        setServices(response.data.services);
        setBrand(response.data.brand);
        setPic_tester_1(response.data.pic_tester_1);
        setPic_tester_2(response.data.pic_tester_2);
        setPic_tester_3(response.data.pic_tester_3);
        setPic_tester_4(response.data.pic_tester_4);
        setPic_tester_5(response.data.pic_tester_5);
      };

  return (
    <div className='modalOptionsContainer'>
            <div className="card-header">
              <h3 className="card-title">Follow Up Testing</h3>
            </div>
            <table class="table table-striped is-bordered">
            <thead>
            <tr>
            <th>Start FUT</th>
            <th>FUT Done</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{start_date_testing}</td>
              <td>{end_date_testing}</td>
              </tr>
            </tbody>
            </table>

            <div className="card-header">
              <h3 className="card-title">Testing Progress</h3>
            </div>
            <table class="table table-striped">
            <tr>
              <th>Progress</th>
              <td>
              <input type="text" className="form-control" value={testing_progress} onChange={(e) => setTesting_progress(e.target.value)} placeholder="...." />
                </td>
            </tr>
            </table>

          <div className="card-header">
              <h3 className="card-title">PIC Tester</h3>
            </div>
            <table class="table ">
              <tr>
              <th>PIC Tester 1</th>
              <td>{pic_tester_1}</td>
              </tr>
              <tr>
              <th>PIC Tester 2</th>
              <td>{pic_tester_2}</td>
              </tr>
              <tr>
              <th>PIC Tester 3</th>
              <td>{pic_tester_3}</td>
              </tr>
              <tr>
              <th>PIC Tester 4</th>
              <td>{pic_tester_4}</td>
              </tr>
              <tr>
              <th>PIC Tester 5</th>
              <td>{pic_tester_5}</td>
              </tr>
            </table>
            
            <div className="card-header">
              <h3 className="card-title">Other Details</h3>
            </div>
            <table class="table table-striped">
              <tr>
              <th>Jumlah Test Case</th>
              <td>{testcase_amt}</td>
              </tr>
              <tr>
              <th>Standard/Normal Changes</th>
              <td>{dev_effort}</td>
              </tr>
              <tr>
              <th>Project Type</th>
              <td>{project_type}</td>
              </tr>
              <tr>
              <th>Services</th>
              <td>{services}</td>
              </tr>
              <tr>
              <th>Brand</th>
              <td>{brand}</td>
              </tr>
              <tr>
              <th>Notes</th>
              <td>{notes_testing}</td>
              </tr>
            </table>
            <div class="modal-footer justify-content-between">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={updateData}>Save changes</button>
        </div>
        </div>
  )
}

export default Options