import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import { Redirect } from 'react-router-dom';


const createUser = `mutation createUser($email: String!,$name: String!,$phone: String!,$password: String!){
  createUser(input:{
    name: $name
    email: $email
    phone: $phone
    password: $password
  }){
    id
    name
    email
    phone
    password
  }
}`;

const getLogin = `query getLogin($email: String!,$password: String!) {
  listUsers(filter: {
    email: {
      eq: $email
    },
    password: {
      eq: $password
    }
  }) {
    items {
      name
      email
      phone
      password
    }
  }
}
`;

const checkEmail = `query checkEmail($email: String!) {
  listUsers(filter: {
    email: {
      eq: $email
    }
  }) {
    items {
      name
      email
      phone
    }
  }
}
`;

class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      lemail:"ajay@gmail.com",
      lpassword:"asdasd",
      name:"",
      email:"",
      phone:"",
      password:"",
      isLoggedIn:false,
      username:""
    };
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    this.handleLPasswordChange = this.handleLPasswordChange.bind(this);
    this.handleLEmailChange = this.handleLEmailChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
  }

  handleLEmailChange(event) {
    this.setState({lemail:event.target.value});
  }

  handleLPasswordChange(event) {
    this.setState({lpassword:event.target.value});
  }

  handleEmailChange(event) {
    this.setState({email:event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password:event.target.value});
  }

  handleNameChange(event) {
    this.setState({name:event.target.value});
  }

  handlePhoneChange(event) {
    this.setState({phone:event.target.value});
  }

  logout(){
    this.setState({isLoggedIn:false});
    this.setState({username:""});

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
  }

  async handleLoginSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const note = {"email":this.state.lemail, "password":this.state.lpassword};
    const user = await API.graphql(graphqlOperation(getLogin, note));
    if(user.data.listUsers.items.length>0)
    {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('username', user.data.listUsers.items[0].name);
      this.setState({isLoggedIn:true});
      this.setState({username:user.data.listUsers.items[0].name});
    }
    else
    {
      this.setState({isLoggedIn:false});
      this.setState({username:""});
      alert("Wrong credentials");
    }

    this.setState({lemail:""});
    this.setState({lpassword:""});
    // alert(localStorage.getItem('isLoggedIn'));
  }

  async handleRegisterSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const isUser = {"email":this.state.email};
    const user = await API.graphql(graphqlOperation(checkEmail, isUser));
    if(user.data.listUsers.items.length>0)
    {
      alert("Email ID alredy taken. Choose diffrent");
    }
    else
    {
      const note = {"email":this.state.email, "name":this.state.name, "phone":this.state.phone, "password":this.state.password};
      const registerUser = await API.graphql(graphqlOperation(createUser, note));
      if(registerUser.data.createUser.name!=null)
      {
        alert("Register successful. Please login to continue");
      }
      else
      {
        alert("Something went wrong. Please try again");
      }
    }
    this.setState({name:""});
    this.setState({email:""});
    this.setState({phone:""});
    this.setState({password:""});
  }

  componentDidMount(){
        localStorage.getItem('isLoggedIn') && this.setState({
            isLoggedIn: localStorage.getItem('isLoggedIn')
        });
        localStorage.getItem('username') && this.setState({
            username: localStorage.getItem('username')
        });
    }

  render() {
    if(this.state.isLoggedIn) {
    return <Redirect to="/" />
    }
    return (
      <div className="App">
      {!this.state.isLoggedIn ?
      <div className="container">
        <div className="login">
        <div className="row">
        <div className="col">
        <h2 className="text-center">LOGIN</h2>
        <form onSubmit={this.handleLoginSubmit}>
        <div className="form-group">
        <label>Email</label>
        <input type="email" className="form-control" placeholder="Email" value={this.state.lemail} onChange={this.handleLEmailChange} required />
        </div>
        <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" value={this.state.lpassword} onChange={this.handleLPasswordChange} required />
        </div>
        <button className="btn btn-success" type="submit">Login</button>
        </form>
        </div>
        <div className="col">
        <h2 className="text-center">REGISTER</h2>
        <form onSubmit={this.handleRegisterSubmit}>
        <div className="form-group">
          <label>Name</label>
        <input type="text" className="form-control" placeholder="Name" value={this.state.name} onChange={this.handleNameChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
        <input type="email" className="form-control" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} required />
        </div>
        <div className="form-group">
          <label>Phone</label>
        <input type="text" className="form-control" placeholder="Phone" value={this.state.phone} onChange={this.handlePhoneChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
        <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange} required />
        </div>
        <button className="btn btn-success" type="submit">Register</button>
        </form>
        </div>
        </div>
        </div>
      </div>
        :
        null
      }
      {this.state.isLoggedIn ?
      <div className="container">
        <div className="loggedin">
        <div className="row">
        <div className="col-md-6">
        <h2>Welcome, <b>{this.state.username}</b></h2>
        </div>
        <div className="col-md-6 text-right">
        <button className="btn btn-primary" onClick={this.logout.bind(this)}><svg class="bi bi-box-arrow-right" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.646 11.354a.5.5 0 010-.708L14.293 8l-2.647-2.646a.5.5 0 01.708-.708l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708 0z" clip-rule="evenodd"></path>
  <path fill-rule="evenodd" d="M4.5 8a.5.5 0 01.5-.5h9a.5.5 0 010 1H5a.5.5 0 01-.5-.5z" clip-rule="evenodd"></path>
  <path fill-rule="evenodd" d="M2 13.5A1.5 1.5 0 01.5 12V4A1.5 1.5 0 012 2.5h7A1.5 1.5 0 0110.5 4v1.5a.5.5 0 01-1 0V4a.5.5 0 00-.5-.5H2a.5.5 0 00-.5.5v8a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-1.5a.5.5 0 011 0V12A1.5 1.5 0 019 13.5H2z" clip-rule="evenodd"></path>
</svg> Logout</button>
        </div>
        </div>
        </div>
      </div>
        :
        null
      }
      </div>
      );
    }
  }

  export default Login;