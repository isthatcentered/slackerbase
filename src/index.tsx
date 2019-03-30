import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import firebase from "firebase/app";
import "firebase/firestore";




firebase.initializeApp( {
	apiKey:            "AIzaSyA6knUASvHehbo1hNQmWTFmG2WlszEROTg",
	authDomain:        "reach-slack.firebaseapp.com",
	databaseURL:       "https://reach-slack.firebaseio.com",
	projectId:         "reach-slack",
	storageBucket:     "reach-slack.appspot.com",
	messagingSenderId: "451211342052",
} );

export const db = firebase.firestore()



ReactDOM.render( <App/>, document.getElementById( "root" ) );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
