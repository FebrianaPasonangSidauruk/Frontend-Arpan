import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'


const Tes = () => {
    // const [title_dev, setTitle_dev] = useState({title_dev:[]});
    // const[datas, setDatas] = useState({datas:[]});
    const [title_dev, setTitle_dev] = useState([]);
    const[datas, setDatas] = useState([]);
    const [model, setmodel] = useState("");

    
    // var requestor_list;


    useEffect(() => {
      // if(datas==[]){
      //   getProducts();
      // }
        getProducts();
        // removeDuplicates();
      }, []);

    //   const getProducts = async() => {
    //     await axios.get(`http://localhost:5001/getProject`).then(data => setDatas(data));
    //   }

    //   useEffect(()=>{
    //     if(datas){
    //         const data_list = datas.map(data => data.title_dev);
    //     setTitle_dev(data_list)
    //     }
    //   },[datas])

    const getProducts = async() =>{
        const res = await axios.get(`http://localhost:5001/getProject`);
        // setDatas(res.data);
        // console.log(datas);

        const requestor_list = res.data.map((data) => data.title_dev);
        setTitle_dev([...new Set(requestor_list)]);
        console.log(title_dev);

        return;
        // requestor_list = datas.map((data) => data.title_dev);
        // setTitle_dev([...new Set(requestor_list)]);
        // requestor_list = datas.map((data) => data.title_dev);
        // console.log(datas);
        // requestor_list = datas.map((data) => data.title_dev);
        // requestor_list = [...new Set(requestor_list)];
        // console.log(requestor_list);
        // setTitle_dev(requestor_list);
        // console.log(title_dev);
        // setTitle_dev(res.data.title_dev)
        // console.log(title_dev);
        // requestor_list = [...new Set(title_dev)];
        
    }
    // useEffect(() => {
    //     removeDuplicates();
    // })

    // const removeDuplicates = async() =>{
    //     requestor_list = datas.map(data => data.title_dev);
    //     setTitle_dev(requestor_list)

    // }

    // function removeDuplicates(datas){
    //     return datas.filter((value, index) => datas.indexOf(value) === index);
    // }

    const handleChange = (e) =>{
        // e.preventDefault();
        setmodel(e.target.value);
        console.log("Model Selected!!");
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        axios.post('http://localhost:5001/getmodel', {
        model
      })
       .then((res) => {
        console.log(res.data);
      });
    }



  return (
        <div className="container">
          <div className="row">
  
            <div
              className="col-6"
              style={{
                paddingBottom: "100px",
                paddingTop: "20px",
                alignItems: "center",
              }}
            >
              <label
                className=""
                style={{ paddingTop: "5px", marginTop: "40px" }}
              >
                Model
                <form onSubmit={handleSubmit}>
                  <select
                    className="custom-select"
                    name="example"
                    value={model}
                    onChange={(e) => handleChange(e)}
                    style={{ paddingTop: "5px", marginTop: "10px" }}
                  >
                    <option>--Select--</option>
                    {/* {datas.map((data) => (
                      <option
                        value={data.title_dev}
                        onChange={(e) => setmodel(e.target.value)}
                      >
                        {data.title_dev}
                      </option>
                    ))} */}
                    {title_dev.map((requestor) => (
                      <option
                        value={requestor}
                        onChange={(e) => setmodel(e.target.value)}
                      >
                        {requestor}
                      </option>
                    ))}
                  </select>
  
               
  
                  <button
                    type="submit"
                    class="btn btn-success"
                    style={{ marginTop: "100px" }}
                  >
                    Inference
                  </button>
                </form>
              </label>
            </div>
          </div>
        </div>
  )
}

export default Tes

