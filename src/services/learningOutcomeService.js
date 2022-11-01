import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
class learningOutcomeService extends Component {
  static myInstance = null;

  static getInstance() {
    return new learningOutcomeService();
  }
  getLearningData() {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/getLearningInfo',)
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
      axios.post('http://localhost:8000/game/setTilesType', data)
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
      axios.post('http://localhost:8000/game/getActivityList', data).then(function (response) {
        resolve(response.data);
      })
        .catch(function (error) {
          console.log(error);
        });
    })
  }

}
export default learningOutcomeService;