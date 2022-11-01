import axios from "axios";
import React,{Component} from "react";
class MultiLingunalService extends Component {
    static myInstance = null;
    
    static getInstance() {  
        return new MultiLingunalService();
    }
    getAllLanguage(data) {
        return new Promise((resolve,reject)=>{
          axios.post('http://localhost:8000/lang/getLang',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        })         }
}
    export default MultiLingunalService