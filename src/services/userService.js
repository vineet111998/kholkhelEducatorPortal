import axios from "axios";
import React,{Component} from "react";
class getEvent extends Component {
    static myInstance = null;
    
    static getInstance() {  
        return new getEvent();
    }
    registerService(data) {
        return new Promise((resolve,reject)=>{
            var newData =JSON.stringify(data);
          axios.post('http://localhost:8000/register',data)
          .then(function (response) {
            //   console.log(response.data);
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });

        })         
    }

    loginService(data){
        return new Promise((resolve,reject)=>{
            var newData=JSON.stringify(data);
            axios.post('http://localhost:8000/login',data)
            .then(function (response) {
              //   console.log(response.data);
              resolve(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
  
          })         
    }

    checkNumber(data){
      console.log(data);
      // return new Promise((resolve,reject)=>{
      //     var newData=JSON.stringify(data);
      //     axios.post('http://localhost:8000/checkNumber',data)
      //     .then(function (response) {
      //       //   console.log(response.data);
      //       resolve(response.data);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });

      //   })         
  }
}
    export default getEvent