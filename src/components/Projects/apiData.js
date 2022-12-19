//get data search results for project tracking

import axios from "axios";

   export const getRequestor = async (keyword) => {
    console.log('keyword', keyword)
    try{
        const {data} = await axios.get(
          `requestorProject?search_requestor=${keyword}`
        );
        return data;
    } catch(error){
        throw error;
    }
      };