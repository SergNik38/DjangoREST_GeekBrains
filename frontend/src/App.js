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
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
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


  load_data() {
    
    const headers = this.get_headers()
    axios.get('http://127.0.0.1:8000/api/users/', {headers})
        .then(response => {
            const users = response.data.results
            this.setState({users: users})
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/projects/', {headers})
        .then(response => {
            const projects = response.data.results
            this.setState({projects: projects})
        }).catch(error => {
          console.log(error)
          this.setState({projects: []})
        })
    axios.get('http://127.0.0.1:8000/api/todos/', {headers})
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
              <li>{this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}</li>
            </nav>
            <Routes>
              <Route path='/users' element={<UserList users={this.state.users} />} />
              <Route path='/todos' element={<ToDoList todos={this.state.todos} />} />
              <Route path='/projects' element={<ProjectList projects={this.state.projects} />} />
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


