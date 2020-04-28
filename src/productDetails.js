import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom'
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import Navbar from './navbar';

const readNote = `query getProduct($id: ID!) {
  getProduct(id: $id) {
      id name category_id category {
        id name
      }
  }
}`;

class ProductDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      id:props.match.params.id,
      notes:[],
      categorys:[],
      value:"",
      category_id:"",
      displayAdd:false,
      displayUpdate:false,
      isOpen:false
    };
  }
  async componentDidMount(){
    // alert(this.state.id);
    
    // const notes = await API.graphql(graphqlOperation(readNote));
    const data = {"id":this.state.id};
    const notes = await API.graphql(graphqlOperation(readNote, data));
    this.setState({notes:notes.data.getProduct});
  }

  render() {
    const { params } = this.props.match;
    const data2 = [].concat(this.state.categorys)
      .map((item,i)=> 
        <option key={item.i} value={item.id}>{item.name}</option>      
      )
    const data = [].concat(this.state.notes)
      .map((item,i)=> 
      <tr>
        <td>{item.category.name}</td>
        <td>{item.name}</td>
      </tr>
      )
    return (
      <div>
        <Navbar />
        <div className="col-md-12">
          <table className="table table-bordered table-sm table-hover">
          <thead>
          <tr>
          <th>Category</th>
          <th>Product</th>
          </tr>
          </thead>
          <tbody>
          {data}
          </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProductDetails;