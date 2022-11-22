import axios from "axios";

export const filterselection = async (keyword, keyword2, keyword3, keymonth, keyyear, keymonth2, keyyear2, keymonth3, keyyear3) => {
    console.log('keyword', keyword);
    console.log('keyword2', keyword2);
    console.log('keyword3', keyword3);
    const selection = 1
    try{
        const {data} = await axios.get(
          `filterselectionproject?search_requestor=${keyword}&search_requestor2=${keyword2}&search_requestor3=${keyword3}&month1=${keymonth}&year1=${keyyear}&month2=${keymonth2}&year2=${keyyear2}&month3=${keymonth3}&year3=${keyyear3}&selection=1`
        );
        return data;
        
    } catch(error){
        throw error;
    }

      };