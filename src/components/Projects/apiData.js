import axios from "axios";

// export const getProducts = async() =>{
//     const res = await axios.get(`http://localhost:5010/getProject`);

//     const requestor_list = res.data.map((data) => data.title_dev);
//     setTitle_dev([...new Set(requestor_list)]);
//     console.log(title_dev);

//     return;
    
// }

   export const getRequestor = async (keyword) => {
    console.log('tes', keyword)
    try{
        const {data} = await axios.get(
          `requestor?search_requestor=${keyword}`
        );
        return data;
    } catch(error){
        throw error;
    }
      };