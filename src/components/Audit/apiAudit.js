//get the data for the Kertas Kerja from the given parameters

import axios from "axios";

export const apiAudit = async (keyword, keyword2, keyword3, keymonth, keyyear, keymonth2, keyyear2, keymonth3, keyyear3) => {
    try{
        const {data} = await axios.get(
          `kertaskerja?search_requestor=${keyword}&search_requestor2=${keyword2}&search_requestor3=${keyword3}&month1=${keymonth}&year1=${keyyear}&month2=${keymonth2}&year2=${keyyear2}&month3=${keymonth3}&year3=${keyyear3}`
        );
        return data;
        
    } catch(error){
        throw error;
    }
      };