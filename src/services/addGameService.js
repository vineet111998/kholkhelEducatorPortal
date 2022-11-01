import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
class GameService extends Component {
  static myInstance = null;

  static getInstance() {
    return new GameService();
  }
  setGameType(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/gameType', data)
        .then(function (response) {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
  uploadArtifact(data) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:8000/game/getPicture', data)
        .then(function (response) {
          console.log(response.data);
          resolve(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });

    })
  }
}
export default GameService