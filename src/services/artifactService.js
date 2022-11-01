import axios from "axios";
import React, { Component } from "react";
import { useNavigate } from "react-router-dom";
class ArtifactService extends Component {
    static myInstance = null;

    static getInstance() {
        return new ArtifactService();
    }
    uploadArtifact(data) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/game/getPicture', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        })
    }
    getArtifact(data) {
        return new Promise((resolve, reject) => {
            axios.post('http://localhost:8000/game/getArtifact', data)
                .then(function (response) {
                    resolve(response.data);
                })
                .catch(function (error) {
                    console.log(error);
                });

        })
    }
}
export default ArtifactService