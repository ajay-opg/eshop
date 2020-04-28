import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom'
import AboutUs from './aboutUs';
import ContactUs from './contactUs';
import Login from './login';
import Product from './product';
import ProductDetails from './productDetails';

const routs = (
   < BrowserRouter >
      <div>
         <nav className="navbar navbar-expand-lg navbar-light bg-light">
         <a className="navbar-brand" href="#">Navbar</a>
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
         <span className="navbar-toggler-icon"></span>
         </button>

         <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav mr-auto">
         <li className="nav-item active">
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
         <Link className="btn btn-outline-success my-2 my-sm-0" to="/login">Login</Link>
         </div>
         </nav>
         <Switch>
            <Route exact path="/" component={App} />
            <Route path="/aboutus/:id" component={AboutUs} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/products" component={Product} />
            <Route path="/product/:id" component={ProductDetails} />
            <Route path="/login" component={Login} />
         </Switch>
      </div>
   </ BrowserRouter >
);
ReactDOM.render(routs, document.getElementById('root'));