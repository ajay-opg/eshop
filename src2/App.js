import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Amplify, {API,graphqlOperation} from 'aws-amplify';
import { withAuthenticator} from 'aws-amplify-react'; 
import aws_exports from './aws-exports'; // specify the location of aws-exports.js file on your project
Amplify.configure(aws_exports);

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

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      id:"",
      notes:[],
      categorys:[],
      value:"",
      category_id:"",
      displayAdd:true,
      displayUpdate:false
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
  }
  selectNote(product){
    this.setState({id:product.id,value:product.name,category_id:product.category_id,displayAdd:false,displayUpdate:true});
  }
  // selectCategory(category){
  //   this.setState({category_id:category.id});
  // }
  async listNotes(){
    const notes = await API.graphql(graphqlOperation(readNote));
    this.setState({notes:notes.data.listProducts.items});
  }
  
  render() {
    const data2 = [].concat(this.state.categorys)
      .map((item,i)=> 
        <option key={item.i} value={item.id}>{item.name}</option>      
      )
    const data = [].concat(this.state.notes)
      .map((item,i)=> 
      <tr key={item.i}>
        <td>{i+1}</td>
        <td>{item.category.name}</td>
        <td>{item.name}</td>
        <td><button key={item.i} type="button" className="btn btn-info" onClick={this.selectNote.bind(this, item)}>Edit</button></td>
        <td><button key={item.i} type="button" className="btn btn-danger" onClick={this.handleDelete.bind(this, item.id)}>Delete</button></td>
      </tr>
      )
    return (
      <div className="App">
        <div className="container">
          {this.state.displayAdd ?
            <form onSubmit={this.handleSubmit}>
              <div className="input-group mb-3">
                <select className="form-control form-control-lg" aria-label="Note" aria-describedby="basic-addon2" value={this.state.category_id} onChange={this.handleCategoryChange}>
                {data2}
                </select>
                <input type="text" className="form-control form-control-lg" placeholder="New Note" aria-label="Note" aria-describedby="basic-addon2" value={this.state.value} onChange={this.handleChange}/>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Add Product</button>
                </div>
              </div>
            </form>
          : null }
          {this.state.displayUpdate ?
            <form onSubmit={this.handleUpdate}>
              <div className="input-group mb-3">
                <select className="form-control form-control-lg" aria-label="Note" aria-describedby="basic-addon2" value={this.state.category_id} onChange={this.handleCategoryChange}>
                {data2}
                </select>
                <input type="text" className="form-control form-control-lg" placeholder="Update Note" aria-label="Note" aria-describedby="basic-addon2" value={this.state.value} onChange={this.handleChange}/>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="submit">Update Note</button>
                </div>
              </div>
            </form>
          : null }
        </div>
        <br/>
        <div className="container">
          <table className="table table-bordered">
          <thead>
          <tr>
          <th>Sr</th>
          <th>Category</th>
          <th>Product</th>
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
export default withAuthenticator(App, { includeGreetings: true });