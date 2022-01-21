import React from 'react';
import './App.css';
import axios from 'axios';
import UserList from './components/User.js';
import MainMenu from './components/Menu.js';
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ToDoList from './components/ToDo';
import { Component } from 'react';
import ProjectList from './components/Project';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'todos': [],
      'projects': []
    }
  }
  // componentDidMount() {
  //   axios.get('http://127.0.0.1:8000/api/users')
  //     .then(response => {
  //       const users = response.data.results
  //       this.setState(
  //         {
  //           'users': users
  //         }
  //       )
  //     }).catch(error => console.log(error))
  // }
  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users')
      .then(response => {
        const users = response.data.results
        this.setState(
          {
            'users': users
          }
        )
      }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/projects')
      .then(response => {
        const projects = response.data.results
        this.setState(
          {
            'projects': projects
          }
        )
      }).catch(error => console.log(error))
    axios.get('http://127.0.0.1:8000/api/todos')
      .then(response => {
        const todos = response.data.results
        this.setState(
          {
            'todos': todos
          }
        )
      }).catch(error => console.log(error))
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <MainMenu />
            </nav>
            <Routes>
              <Route exact path='/' element={<UserList users={this.state.users} />} />
              <Route exact path='/todos' element={<ToDoList todos={this.state.todos} />} />
              <Route exact path='/projects' element={<ProjectList projects={this.state.projects} />} />
            </Routes>
          </div>
          <footer>
            <Footer />
          </footer>
        </Router>
      </div>
    )
  }


}

export default App;


