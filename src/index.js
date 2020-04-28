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