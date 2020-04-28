import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom'
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import Navbar from './navbar';

const readNote = `query getProduct {
  listProducts {
    items {
      id name category_id category {
        id name
      }
    }
  }
}`;

class ProductDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      id:"",
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
    const notes = await API.graphql(graphqlOperation(readNote));
    this.setState({notes:notes.data.listProducts.items});
  }

  render() {
    const { params } = this.props.match;
    this.setState({id:params.id});
    const data2 = [].concat(this.state.categorys)
      .map((item,i)=> 
        <option key={item.i} value={item.id}>{item.name}</option>      
      )
    const data = [].concat(this.state.notes)
      .map((item,i)=> 
      <tr>
        <td>{i+1}</td>
        <td>{item.category.name}</td>
        <td>{item.name}</td>
        <td><Link to={{pathname: `product/${item.id}`, query: { id: item.id }}} className="btn btn-warning"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"></path>
          <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"></path>
        </svg> Show</Link></td>
        <td><button key={item.i} type="button" className="btn btn-info"><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"></path>
  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"></path>
</svg> Edit</button></td>
        <td><button key={item.i} type="button" className="btn btn-danger"><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"></path>
</svg> Delete</button></td>
      </tr>
      )
    return (
      <div className="col">
        <Navbar />
        <div className="col-md-12">
          <div className="col-md-12 text-right">
            <button className="btn btn-primary">Add Product</button>
          </div>
          <table className="table table-bordered table-sm table-hover">
          <thead>
          <tr>
          <th>Sr</th>
          <th>Category</th>
          <th>Product</th>
          <th>Show</th>
          <th>Edit</th>
          <th>Delete</th>
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