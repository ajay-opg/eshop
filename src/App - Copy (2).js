import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './login';
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import aws_exports from './aws-exports'; // specify the location of aws-exports.js file on your project
Amplify.configure(aws_exports);


class App extends Component {
	constructor(props){
    super(props);
    this.state={
      isLoggedIn:false,
      username:""
    };
  }

	render() {
		return (
			<div className="App">
		    	<div className="container">
	      			<Login />
				</div>
			</div>
			);
		}
	}

	export default App;