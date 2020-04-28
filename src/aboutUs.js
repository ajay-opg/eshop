import React from 'react';
import Navbar from './navbar';

class AboutUs extends React.Component {
render() {
   const { params } = this.props.match
      return (
         <div>
         <Navbar />
            <h1>About Us</h1>
            <p>{params.id}</p>
         </div>
      )
   }
}
export default AboutUs