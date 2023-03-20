import axios from "axios";
import { Component } from "react";
import {IP} from '../connection';
import React from "react";

class StatusService extends Component {
    static myInstance = null;
  
    static getInstance() {
      return new StatusService();
    }
    getStatus() {
        return new Promise((resolve, reject) => {
          axios.post(IP+'game/getStatus')
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              reject(error);
            });
    
        })
      }
  }
  export default StatusService