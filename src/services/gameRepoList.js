import axios from "axios";
import React,{Component} from "react";
import {IP} from '../connection';
class gameRepoList extends Component {
    static myInstance = null;
    
    static getInstance() {  
        return new gameRepoList();
    }
    getRepoData(data) {
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/getGameInfo',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        })         }
}
    export default gameRepoList