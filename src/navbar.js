import React, { Component } from 'react';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'

class Navbar extends Component {
constructor(props){
    super(props);
    this.state={
      isLoggedIn:true,
      username:"Ajay"
    };
  }

  logout(){
    this.setState({isLoggedIn:false});
    this.setState({username:""});
  }

  render() {
    return (
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
           <a className="navbar-brand" href="#">Navbar</a>
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
           </button>

           <div className="collapse navbar-collapse" id="navbarSupportedContent">
           <ul className="navbar-nav mr-auto">
           <li className="nav-item">
           <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
           </li>
           <li className="nav-item">
           <Link className="nav-link" to="/aboutus/15">About us</Link>
           </li>
           <li className="nav-item">
           <Link className="nav-link" to="/contactus">Contact us</Link>
           </li>
           <li className="nav-item">
           <Link className="nav-link" to="/products">Product</Link>
           </li>
           </ul>
           <h4>Welcome {this.state.username}! </h4>
           <button className="btn btn-primary" onClick={this.logout.bind(this)}><svg class="bi bi-box-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.646 11.354a.5.5 0 010-.708L14.293 8l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"></path>
  <path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path>
  <path fill-rule="evenodd" d="M2 13.5A1.5 1.5 0 01.5 12V4A1.5 1.5 0 012 2.5h7A1.5 1.5 0 0110.5 4v1.5a.5.5 0 01-1 0V4a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V12A1.5 1.5 0 019 13.5H2z" clip-rule="evenodd"></path>
</svg> Logout</button>
           </div>
           </nav>
            </div>
      );
    }
  }

  export default Navbar;