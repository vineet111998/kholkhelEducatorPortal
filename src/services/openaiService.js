import React, { Component } from "react";
import axios from "axios";
import {IP} from '../connection';
class OpenAIApiService extends Component {
  static myInstance = null;

  static getInstance() {
      return new OpenAIApiService();
  }
  getImageFromOpenAIApi(data) {
    console.log(IP+'aiapi/getImageFromOpenAIApi');
      return new Promise((resolve, reject) => {
          axios.post(IP+'aiapi/getImageFromOpenAIApi', data)
              .then(function (response) {
                  resolve(response.data);
              })
              .catch(function (error) {
                  console.log(error);
              });

      })
  }
}
export default OpenAIApiService;