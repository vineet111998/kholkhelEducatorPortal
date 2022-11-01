import axios from "axios";
import React,{Component} from "react";
class gameRepoList extends Component {
    static myInstance = null;
    
    static getInstance() {  
        return new gameRepoList();
    }
    getRepoData(data) {
        return new Promise((resolve,reject)=>{
          axios.post('http://localhost:8000/game/getGameInfo',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        })         }
}
    export default gameRepoList