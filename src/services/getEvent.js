import axios from "axios";
import React,{Component} from "react";
import {IP} from '../connection';
class getEvent extends Component {
    static myInstance = null;
    
    static getInstance() {  
        return new getEvent();
    }
    getEventData() {
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/getAllTiles')
          .then(function (response) {
            //   console.log(response.data);
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });

        })         
      }
      setEventData(data)
      {
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/setTiles',data)
          .then(function (response) {
            //   console.log(response.data);
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });

        })        

      }

      getTypeOfEvent(data)
      {
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/getTypeOfEvent',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });

        })        

      }

      getEventByGrade(data)
      {
        // console.log("hello");
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/getEventbyGrade',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });

        })        

      }
      getEventbyUserid(data)
      {
        // console.log("hello");
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/getEventbyUserid',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });

        })        

      }

      setEventByID(data)
      {
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/setEventbyid',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });

        })   
      }

      getEventByID(data)
      {
        return new Promise((resolve,reject)=>{
          axios.post(IP+'game/getEventbyid',data)
          .then(function (response) {
            resolve(response.data);
          })
          .catch(function (error) {
            // console.log(error);
          });

        })   
      }


}
    export default getEvent