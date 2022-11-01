import axios from "axios";
import React, { Component } from "react";
class GameDataService extends Component {
  static myInstance = null;

  static getInstance() {
    return new GameDataService();
  }
  getGameType(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/getGameType',data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
  getGameTypeByID(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/getGameTypeByID',data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }

  setGameAttr(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/gameInfo', data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }

  checkWordRepo(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/getWordInfoByLength', data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
  AddWordToRepo(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/getWordInfo', data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
  getMasterGameType(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/getTypeOfGame', data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
  setAvadhanDt(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/setAvadhanDt', data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    })
  }
}
export default GameDataService