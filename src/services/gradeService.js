import axios from "axios";
import { Component } from "react";
import {IP} from '../connection';
import React from "react";

class GradeService extends Component {
    static myInstance = null;
  
    static getInstance() {
      return new GradeService();
    }
    getGradeData() {
        return new Promise((resolve, reject) => {
          axios.post(IP+'game/getGrade')
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              reject(error);
            });
    
        })
      }
  }
  export default GradeService