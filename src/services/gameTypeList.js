import axios from "axios";
import React,{Component} from "react";
import {IP} from '../connection';

class gameTypeList extends Component {
    static myInstance = null;
    
    static getInstance() {  
        return new gameTypeList();
    }
    getData() {
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/getGameType')
          .then(function (response) {
            //   console.log(response.data);
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        })         }
}
    export default gameTypeList