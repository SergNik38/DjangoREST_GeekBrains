import React from 'react';
import './App.css';
import axios from 'axios';
import UserList from './components/User.js';
import MainMenu from './components/Menu.js';
import Footer from './components/Footer.js';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ToDoList from './components/ToDo';
import ProjectList from './components/Project';
import Cookies from 'universal-cookie';
import LoginForm from './components/Auth';
import { Link } from 'react-router-dom';
import ProjectForm from './components/projectForm';
import ToDoForm from './components/todoForm';
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'todos': [],
      'projects': [],
      'token': ''
    }
  }
  
  set_token(token) {
    const cookies = new Cookies()
    cookies.set('token', token)
    this.setState({'token': token}, ()=>this.load_data())
  }

  is_authenticated() {
    return this.state.token !== ''
  }

  logout() {
    this.set_token('')
  }

  get_token_from_storage() {
    const cookies = new Cookies()
    const token = cookies.get('token')
    this.setState({'token': token}, ()=>this.load_data())
  }

  get_token(username, password) {
    axios.post('http://194.58.97.80:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
        this.set_token(response.data['token'])
    }).catch(error => alert('Неверный логин или пароль'))
  }

  get_headers() {
    let headers = {
      'Content-Type': 'application/json'
    }
  if (this.is_authenticated())
    {
        headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  deleteProject(url) {
    const headers = this.get_headers()
    axios.delete(`${url}`, {headers})
    .then(response => {this.setState({projects: this.state.projects.filter((item) => item.url !== url)})})
  }

  deleteToDo(url) {
    const headers = this.get_headers()
    axios.delete(`${url}`, {headers})
    .then(response => {this.setState({todos: this.state.todos.filter((item) => item.url !== url)})})
  }

  createProject(name, repository, users) {
    const headers = this.get_headers()
    const data = {name: name, repository: repository, users: Array(users)}
    console.log(data)
    axios.post(`http://194.58.97.80:8000/api/projects/`, data, {headers})
        .then(response => {
          let new_project = response.data
          console.log(new_project)
          const users = this.state.users.filter((item) => item.uuid === new_project.users)
          new_project.users = users
          this.setState({projects: [...this.state.projects, new_project]})
          console.log(new_project)
        }).catch(error => console.log(error))
  }

  createToDo(project, text, creator) {
    const headers = this.get_headers()
    const data = {project: project, text: text, creator: creator}
    console.log(data)
    axios.post(`http://194.58.97.80:8000/api/todos/`, data, {headers})
        .then(response => {
          let new_todo = response.data
          const project = this.state.projects.filter((item) => item.url === new_todo.project)[0]
          const creator = this.state.users.filter((item) => item.uuid === new_todo.user)[0]
          new_todo.projcet = project
          this.setState({todos: [...this.state.todos, new_todo]})
          console.log(new_todo)
        }).catch(error => console.log(error))
  }

  load_data() {
    
    const headers = this.get_headers()
    axios.get('http://194.58.97.80:8000/api/users/', {headers})
        .then(response => {
            const users = response.data.results
            this.setState({users: users})
        }).catch(error => console.log(error))

    axios.get('http://194.58.97.80:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data.results
            this.setState({projects: projects})
        }).catch(error => {
          console.log(error)
          this.setState({projects: []})
        })
    axios.get('http://194.58.97.80:8000/api/todos/', {headers})
        .then(response => {
            const todos = response.data.results
            this.setState({todos: todos})
        }).catch(error => {
          console.log(error)
          this.setState({todos: []})
        })
  }

  componentDidMount() {
    this.get_token_from_storage()
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <nav>
              <MainMenu />
              {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
            </nav>
            <Routes>
              <Route path='/users' element={<UserList users={this.state.users} />} />
              <Route path='/todos' element={<ToDoList todos={this.state.todos} deleteToDo = {(id) => this.deleteToDo(id)}/>} />
              <Route path='/projects' element={<ProjectList projects={this.state.projects} deleteProject = {(id) => this.deleteProject(id)}/>} />
              <Route path='/projects/create' element={<ProjectForm users={this.state.users} createProject={(name, repository, users) => this.createProject(name, repository, users)}/>} />
              <Route path='/todos/create' element={<ToDoForm users={this.state.users} projects = {this.state.projects}createToDo={(project, text, user) => this.createToDo(project, text, user)}/>} />
              <Route path='/' element={<Navigate replace to="/users" />} />
              <Route path='/login' element={<LoginForm get_token={(username, password) => this.get_token(username, password)} />} />
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


