import axios from "axios";

export const cobaAudit = async (keyword, keyword2, keyword3) => {
    console.log('keyword', keyword);
    console.log('keyword2', keyword2);
    console.log('keyword3', keyword3);
    try{
        const {data} = await axios.get(
          `http://localhost:5001/cobaaudit?search_requestor=${keyword}&search_requestor2=${keyword2}&search_requestor3=${keyword3}`
        );
        return data;
        
    } catch(error){
        throw error;
    }

      };