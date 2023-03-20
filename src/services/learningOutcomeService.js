import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
import {IP} from '../connection';
class learningOutcomeService extends Component {
  static myInstance = null;

  static getInstance() {
    return new learningOutcomeService();
  }
  getLearningData() {
    return new Promise((resolve, reject) => {
      axios.post(IP+'game/getLearningInfo',)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
  setLearningOutcome(data) {
    return new Promise((resolve, reject) => {
      axios.post(IP+'game/setTilesType', data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }
  getActivityList(data) {
    return new Promise((resolve, reject) => {
      axios.post(IP+'game/getActivityList', data).then(function (response) {
        resolve(response.data);
      })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

}
export default learningOutcomeService;