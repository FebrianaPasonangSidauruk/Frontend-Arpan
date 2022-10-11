import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Tes = () => {
    // const [title_dev, setTitle_dev] = useState({title_dev:[]});
    // const[datas, setDatas] = useState({datas:[]});
    const [model, setmodel] = useState("");

    const [title_dev, setTitle_dev] = useState([]);
    const[datas, setDatas] = useState([]);
var requestor_list;

    useEffect(() => {
        getProducts();
        // removeDuplicates();
      }, []);

    const getProducts = async() =>{
        const res = await axios.get(`http://localhost:5001/getProject`);
        setDatas(res.data);
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
    useEffect(() => {
        removeDuplicates();
    })

    const removeDuplicates = async() =>{
      // console.log(datas);
      requestor_list = datas.map((data) => data.title_dev);
      setTitle_dev([...new Set(requestor_list)]);
      
  }

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

// export default class Inference extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
       
//         model: "",
 
//         options: [
//           { label: "Cat", value: "cat" },
//           { label: "Traffic", value: "traffic" },
//           { label: "Dog", value: "dog" },
//         ],
//       };
//       this.handleChange = this.handleChange.bind(this);
//     }
    
  
//     handleChange(e) {
     
//       this.setState({ model: e.target.value });
//       console.log("Model Selected!!");
//     }

//     handleSubmit(event) {
//       event.preventDefault();
//       axios.post('http://localhost:5001/getmodel', {
//         model: this.state.model,
//       })
//        .then((res) => {
//         console.log(res.data);
//       });
//     }
  

  
//     render() {
     
  
//       const {  options } = this.state;
  
   
  
//       return (
//         <div className="container">
//           <div className="row">
  
//             <div
//               className="col-6"
//               style={{
//                 paddingBottom: "100px",
//                 paddingTop: "20px",
//                 alignItems: "center",
//               }}
//             >
//               <label
//                 className=""
//                 style={{ paddingTop: "5px", marginTop: "40px" }}
//               >
//                 Model
//                 <form onSubmit={this.handleSubmit.bind(this)}>
//                   <select
//                     className="custom-select"
//                     name="example"
//                     value={this.state.model}
//                     onChange={this.handleChange}
//                     style={{ paddingTop: "5px", marginTop: "10px" }}
//                   >
//                     <option>--Select--</option>
//                     {options.map((option) => (
//                       <option
//                         value={option.value}
//                         onChange={(e) => this.setState({ model: e.target.value })}
//                       >
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
  
               
  
//                   <button
//                     type="submit"
//                     class="btn btn-success"
//                     style={{ marginTop: "100px" }}
//                   >
//                     Inference
//                   </button>
//                 </form>
//               </label>
//             </div>
//           </div>
//         </div>
//       );
//     }
//   }