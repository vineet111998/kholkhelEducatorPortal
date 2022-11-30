import axios from "axios";
import React,{Component} from "react";
import {IP} from '../connection';
class MultiLingunalService extends Component {
    static myInstance = null;
    
    static getInstance() {  
        return new MultiLingunalService();
    }
    getAllLanguage(data) {
        return new Promise((resolve,reject)=>{
          axios.post(IP+'lang/getLang',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        })         }
}
    export default MultiLingunalService