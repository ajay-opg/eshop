import React from 'react';
class AboutUs extends React.Component {
render() {
   const { params } = this.props.match
      return (
         <div>
            <h1>About Us</h1>
            <p>{params.id}</p>
         </div>
      )
   }
}
export default AboutUs