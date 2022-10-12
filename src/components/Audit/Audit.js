import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Tes from './Tes';
import { v4 as uuidv4 } from 'uuid';

const Audit = () => {
    const [requestors, setRequestors] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [query, setQuery] = useState("");

    // useEffect(() => {
    //     getRequestor();
    //   }, [keyword]);

    //   const getRequestor = async () => {
    //     const response = await axios.get(
    //       `http://localhost:5001/requestor?search_requestor=${keyword}`
    //     );
    //     setRequestors(response.data.resultRequestor);
    //   };

    const [inputFieldsRequestor, setInputFieldsRequestor] = useState([
        {idRequestor: uuidv4(), requestor: ''},
    ]);
    
    const handleSubmitRequestor = (e) => {
        e.preventDefault();
        console.log("InputFieldsRequestor", inputFieldsRequestor);
    };

    const handleSubmitAll = (e) => {
        e.preventDefault();
        console.log("InputFieldsRequestor", inputFieldsRequestor);
        console.log("InputFieldsPeriod", inputFieldsPeriod);
    };

    const handleChangeInputRequestor = (idRequestor, event) => {
        const newInputFieldsRequestor = inputFieldsRequestor.map(i => {
            if(idRequestor === i.idRequestor){
                i[event.target.name] = event.target.value
            }
            return i;
        })

        setInputFieldsRequestor(newInputFieldsRequestor);
    }

    const handleAddFieldsRequestor = () =>{
        setInputFieldsRequestor([...inputFieldsRequestor, {idRequestor: uuidv4(), requestor:''}])
        // setRequestors([...requestors]);
    }

    const handleRemoveFieldsRequestor = idRequestor => {
        const values = [...inputFieldsRequestor];
        values.splice(values.findIndex(value => value.idRequestor === idRequestor), 1);
        setInputFieldsRequestor(values);
    }

    const submitrequestor= (e) =>{
        e.preventDefault();
        setKeyword(query);
        console.log("Requestor", requestors);

    }

    //period
    const [inputFieldsPeriod, setInputFieldsPeriod] = useState([
        {idPeriod: uuidv4(), period: '', tgl_signoff:'', req_name:'', req_title:'', revas_name:'', revas_title:''},
    ]);
    
    const handleSubmitPeriod = (e) => {
        e.preventDefault();
        // setKeyword(query);
        console.log("InputFieldsPeriod", inputFieldsPeriod);
        // console.log("Requestor", requestors);
    };

    const handleChangeInputPeriod = (idPeriod, event) => {
        const newInputFieldsPeriod = inputFieldsPeriod.map(a => {
            if(idPeriod === a.idPeriod){
                a[event.target.name] = event.target.value
            }
            return a;
        })

        setInputFieldsPeriod(newInputFieldsPeriod);
    }

    const handleAddFieldsPeriod = () =>{
        setInputFieldsPeriod([...inputFieldsPeriod, {idPeriod: uuidv4(), period: '', tgl_signoff:'', req_name:'', req_title:'', revas_name:'', revas_title:''}])
        // setRequestors([...requestors]);
    }

    const handleRemoveFieldsPeriod = idPeriod => {
        const values = [...inputFieldsPeriod];
        values.splice(values.findIndex(value => value.idPeriod === idPeriod), 1);
        setInputFieldsPeriod(values);
    }

    const submitPeriod= (e) =>{
        e.preventDefault();
        setKeyword(query);
        // console.log("Period", periods);

    }



  return (
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
          
          <form className='form-horizontal' onSubmit={handleSubmitRequestor}>
            {inputFieldsRequestor.map(inputFieldRequestor => (
                <div key={inputFieldRequestor.idRequestor}>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Requestor</label>
                      <div className="col-sm-10">
                        <Tes/>
                        {/* <input type="text" 
                        name="requestor"
                        className="form-control" 
                        variant="filled"
                        value={inputFieldRequestor.requestor}
                        onChange={event => handleChangeInputRequestor(inputFieldRequestor.idRequestor, event)}
                        placeholder="Requestor" /> */}
                        <button className="offset-sm-1 col-sm-2" disabled={inputFieldsRequestor.length === 1} 
                        onClick={() => handleRemoveFieldsRequestor(inputFieldRequestor.idRequestor)}> 
                      - 
                      </button >

                      <button className="offset-sm-1 col-sm-2" onClick={handleAddFieldsRequestor}>
                        + 
                      </button>
                      </div>
                    </div>
                </div>
            ))}
            <button
            className="btn btn-danger"
            type='submit'
            onClick={handleSubmitRequestor}
            >
                send
            </button>
          </form>

          <form className='form-horizontal' onSubmit={handleSubmitPeriod}>
            {inputFieldsPeriod.map(inputFieldPeriod => (
                <div key={inputFieldPeriod.idPeriod}>
                    <div className="form-group row">
                      <label className="col-sm-2 col-form-label">Period</label>
                      <div className="col-sm-10">
                        <input type="text" 
                        name="period"
                        className="form-control" 
                        variant="filled"
                        value={inputFieldPeriod.period}
                        onChange={event => handleChangeInputPeriod(inputFieldPeriod.idPeriod, event)}
                        placeholder="period" />

                        <input type="text" 
                        name="tgl_signoff"
                        className="form-control" 
                        variant="filled"
                        value={inputFieldPeriod.tgl_signoff}
                        onChange={event => handleChangeInputPeriod(inputFieldPeriod.idPeriod, event)}
                        placeholder="Tanggal Sign Off" />

                        <input type="text" 
                        name="req_name"
                        className="form-control" 
                        variant="filled"
                        value={inputFieldPeriod.req_name}
                        onChange={event => handleChangeInputPeriod(inputFieldPeriod.idPeriod, event)}
                        placeholder="Requestor Name" />

                        <input type="text" 
                        name="req_title"
                        className="form-control" 
                        variant="filled"
                        value={inputFieldPeriod.req_title}
                        onChange={event => handleChangeInputPeriod(inputFieldPeriod.idPeriod, event)}
                        placeholder="Requestor Title" />

                        <input type="text" 
                        name="revas_name"
                        className="form-control" 
                        variant="filled"
                        value={inputFieldPeriod.revas_name}
                        onChange={event => handleChangeInputPeriod(inputFieldPeriod.idPeriod, event)}
                        placeholder="Revas Name" />

                        <input type="text" 
                        name="revas_title"
                        className="form-control" 
                        variant="filled"
                        value={inputFieldPeriod.revas_title}
                        onChange={event => handleChangeInputPeriod(inputFieldPeriod.idPeriod, event)}
                        placeholder="Revas Title" />

                        <button className="offset-sm-1 col-sm-2" disabled={inputFieldsPeriod.length === 1} 
                        onClick={() => handleRemoveFieldsPeriod(inputFieldPeriod.idPeriod)}> 

                      - 
                      </button >

                      <button className="offset-sm-1 col-sm-2" onClick={handleAddFieldsPeriod}>
                        + 
                      </button>
                      </div>
                    </div>
                </div>
            ))}
            <button
            className="btn btn-danger"
            type='submit'
            onClick={handleSubmitAll}
            >
                send
            </button>
          </form>


  
  
  
        </div>
      </div>
    </div>
      </div>
    </div>
        </div>
  )
}

export default Audit