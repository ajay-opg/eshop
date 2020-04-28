import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom'
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import Navbar from './navbar';

const readCategories = `query getCategorys {
  listCategorys {
    items {
      id name
    }
  }
}`;

const readNote = `query getProduct {
  listProducts {
    items {
      id name category_id category {
        id name
      }
    }
  }
}`;

const createNote = `mutation createProduct($name: String!, $category_id: ID!){
  createProduct(input:{
    name: $name
    category_id: $category_id
  }){
    id
    name
    category
    {
      name
    }
  }
}`;

const updateNote = `mutation updateProduct($id: ID!,$name: String, $category_id: ID!){
  updateProduct(input:{
    id: $id
    name: $name
    category_id: $category_id
  }){
    id
    name
  }
}`;

const deleteNote = `mutation deleteProduct($id: ID!){
  deleteProduct(input:{
    id: $id
  }){
    id
    name
  }
}`;

class Product extends Component {
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
    this.handleChange = this.handleChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  async componentDidMount(){
    const notes = await API.graphql(graphqlOperation(readNote));
    this.setState({notes:notes.data.listProducts.items});

    const categorys = await API.graphql(graphqlOperation(readCategories));
    this.setState({categorys:categorys.data.listCategorys.items});
  }

  handleChange(event) {
    this.setState({value:event.target.value});
  }
  handleCategoryChange(event) {
    this.setState({category_id:event.target.value});
  }

  async handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const note = {"name":this.state.value, "category_id":this.state.category_id}
    await API.graphql(graphqlOperation(createNote, note));
    this.listNotes();
    this.setState({value:""});
    this.setState({isOpen:false});
  }
  async handleDelete(id) {
    if(window.confirm('Delete the item?')){
      const noteId = {"id":id};
      await API.graphql(graphqlOperation(deleteNote, noteId));
      this.listNotes();
    }
  }
  async handleUpdate(event) {
    event.preventDefault();
    event.stopPropagation();
    const note = {"id":this.state.id,"name":this.state.value, "category_id":this.state.category_id};
    await API.graphql(graphqlOperation(updateNote, note));
    this.listNotes();
    this.setState({displayAdd:true,displayUpdate:false,value:""});
    this.setState({isOpen:false});
  }
  selectNote(product){
    this.setState({id:product.id,value:product.name,category_id:product.category_id,displayAdd:false,displayUpdate:true});
    this.setState({isOpen:true});
  }
  // find(product){
  //   this.setState({value:product.name});
  //   this.setState({isOpen:true});
  // }
  // selectCategory(category){
  //   this.setState({category_id:category.id});
  // }
  async listNotes(){
    const notes = await API.graphql(graphqlOperation(readNote));
    this.setState({notes:notes.data.listProducts.items});
  }

  showModal(){
    this.setState({displayAdd:true});
    this.setState({isOpen:true});
  }

  hideModal(){
    this.setState({isOpen:false});
  }

  render() {
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
        <td><Link to={{pathname: `product/${item.id}`, query: { id: item.id }}} className="btn btn-warning"><svg class="bi bi-eye" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.134 13.134 0 001.66 2.043C4.12 11.332 5.88 12.5 8 12.5c2.12 0 3.879-1.168 5.168-2.457A13.134 13.134 0 0014.828 8a13.133 13.133 0 00-1.66-2.043C11.879 4.668 10.119 3.5 8 3.5c-2.12 0-3.879 1.168-5.168 2.457A13.133 13.133 0 001.172 8z" clip-rule="evenodd"></path>
  <path fill-rule="evenodd" d="M8 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM4.5 8a3.5 3.5 0 117 0 3.5 3.5 0 01-7 0z" clip-rule="evenodd"></path>
</svg> Show</Link></td>
        <td><button key={item.i} type="button" className="btn btn-info" onClick={this.selectNote.bind(this, item)}><svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" clip-rule="evenodd"></path>
  <path fill-rule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z" clip-rule="evenodd"></path>
</svg> Edit</button></td>
        <td><button key={item.i} type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this, item.id)}><svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"></path>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" clip-rule="evenodd"></path>
</svg> Delete</button></td>
      </tr>
      )
    return (
      <div>
      <Modal show={this.state.isOpen} onHide={this.hideModal}>
        {this.state.displayAdd ?
        <form onSubmit={this.handleSubmit}>
        <Modal.Header>Product Details</Modal.Header>
        <Modal.Body>
            <div className="input-group mb-3">
              <select className="form-control form-control-lg" aria-label="Note" aria-describedby="basic-addon2" value={this.state.category_id} onChange={this.handleCategoryChange} required>
              <option value="" selected disabled>Select Category</option>
              {data2}
              </select>
              <input type="text" className="form-control form-control-lg" placeholder="New Note" aria-label="Note" aria-describedby="basic-addon2" value={this.state.value} onChange={this.handleChange} required />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.hideModal.bind(this)}>Cancel</button>
          <button className="btn btn-success" type="submit">Add Product</button>
        </Modal.Footer>
        </form>
        : null}
        {this.state.displayUpdate ?
        <form onSubmit={this.handleUpdate}>
        <Modal.Header>Product Details</Modal.Header>
        <Modal.Body>
            <div className="input-group mb-3">
              <select className="form-control form-control-lg" aria-label="Note" aria-describedby="basic-addon2" value={this.state.category_id} onChange={this.handleCategoryChange} required>
              <option value="" disabled>Select Category</option>
              {data2}
              </select>
              <input type="text" className="form-control form-control-lg" placeholder="New Note" aria-label="Note" aria-describedby="basic-addon2" value={this.state.value} onChange={this.handleChange} required />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={this.hideModal.bind(this)}>Cancel</button>
          <button className="btn btn-success" type="submit">Update Product</button>
        </Modal.Footer>
        </form>
        : null}
      </Modal>
        <Navbar />
        <div className="col-md-12">
          <div className="col-md-12 text-right">
            <button className="btn btn-primary" onClick={this.showModal.bind(this)}>Add Product</button>
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

export default Product;