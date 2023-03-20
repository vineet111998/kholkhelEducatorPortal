import axios from "axios";
import React,{Component} from "react";
import {IP} from '../connection';
class getEvent extends Component {
    static myInstance = null;
    
    static getInstance() {  
        return new getEvent();
    }
    registerService(data) {
        return new Promise((resolve,reject)=>{
            var newData =JSON.stringify(data);
          axios.post(IP+'register',data)
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
      console.log(IP)
        return new Promise((resolve,reject)=>{
            var newData=JSON.stringify(data);
            axios.post(IP+'login',data)
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
      //     axios.post(IP+'checkNumber',data)
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