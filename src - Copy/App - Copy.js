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

const createNote = `mutation createProduct($name: String!, $category_id: ID!){
  createProduct(input:{
    name: $name,
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

const readNote = `query getProduct {
  listProducts {
    items {
      id name category {
        id name
      }
    }
  }
}`;

const updateNote = `mutation updateProduct($id: ID!,$name: String){
  updateProduct(input:{
    id: $id
    name: $name
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
    const noteId = {"id":id};
    await API.graphql(graphqlOperation(deleteNote, noteId));
    this.listNotes();
  }
  async handleUpdate(event) {
    event.preventDefault();
    event.stopPropagation();
    const note = {"id":this.state.id,"name":this.state.value};
    await API.graphql(graphqlOperation(updateNote, note));
    this.listNotes();
    this.setState({displayAdd:true,displayUpdate:false,value:""});
  }
  selectNote(note){
    this.setState({id:note.id,value:note.note,displayAdd:false,displayUpdate:true});
  }
  // selectCategory(category){
  //   this.setState({category_id:category.id});
  // }
  async listNotes(){
    const notes = await API.graphql(graphqlOperation(readNote));
    this.setState({notes:notes.data.listProducts.items});
  }
  
  render() {
    const data = [].concat(this.state.notes)
      .map((item,i)=> 
      <div className="alert alert-primary alert-dismissible show" role="alert">
        <span key={item.i} onClick={this.selectNote.bind(this, item)}>{item.name} ({item.category.name})</span>
        <button key={item.i} type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={this.handleDelete.bind(this, item.id)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      )
    const data2 = [].concat(this.state.categorys)
      .map((item,i)=> 
        <option key={item.i} value={item.id}>{item.name}</option>      
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
                  <button className="btn btn-primary" type="submit">Add Note</button>
                </div>
              </div>
            </form>
          : null }
          {this.state.displayUpdate ?
            <form onSubmit={this.handleUpdate}>
              <div className="input-group mb-3">
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
          {data}
        </div>
      </div>
    );
  }
}
export default withAuthenticator(App, { includeGreetings: true });