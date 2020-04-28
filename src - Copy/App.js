import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import aws_exports from './aws-exports'; // specify the location of aws-exports.js file on your project

Amplify.configure(aws_exports);

class App extends Component {
	render() {
		return (
			<div className="App">
			<div>
            <h1>Home Page</h1>
            </div>
			</div>
			);
		}
	}

	export default App;