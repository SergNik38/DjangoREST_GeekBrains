import React from "react";


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {project: props.projects[0].name, text: '', creator: props.users[0].url}
    }
 
    handleChange(event) 
    {    
        this.setState(
                {
                    [event.target.name]: event.target.value
                }
            ); 
    }
    handleSubmit(event) {
        this.props.createToDo(this.state.project, this.state.text, this.state.creator)
        event.preventDefault()
      }
      render() {
        return (
          <form onSubmit={(event)=> this.handleSubmit(event)}>
             <div className="form-group">
                <label for="project">Project</label>

            <select name="project" className='form-control' onChange={(event)=>this.handleChange(event)}>
                {this.props.projects.map((item)=><option value={item.url}>{item.name}</option>)}
            </select>       
            </div>
        
            <div className="form-group">
                <label for="text">Text</label>
                
                <input type="text" className="form-control" name="text" value={this.state.text} onChange={(event)=>this.handleChange(event)} />       
            </div>
            <div className="form-group">
                <label for="user">Creator</label>

            <select name="user" className='form-control' onChange={(event)=>this.handleChange(event)}>
                {this.props.users.map((item)=><option value={item.url}>{item.username}</option>)}
            </select>       
            </div>

            <input type="submit" className="btn btn-primary" value="Save" />
          </form>
        );
      }
    }
  
    export default ToDoForm
  