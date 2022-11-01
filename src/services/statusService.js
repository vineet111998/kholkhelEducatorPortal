import axios from "axios";
import { Component } from "react";
import React from "react";

class StatusService extends Component {
    static myInstance = null;
  
    static getInstance() {
      return new StatusService();
    }
    getStatus() {
        return new Promise((resolve, reject) => {
          axios.post('http://localhost:8000/game/getStatus')
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