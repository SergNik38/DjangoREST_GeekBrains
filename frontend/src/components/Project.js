import React from 'react';
import { Link } from 'react-router-dom';

const ProjectItem = ({ project, deleteProject }) => {
    return (
        <tr>
            <td>
                {project.name}
            </td>
            <td>
                {project.repository}
            </td>
            <td>
                {project.url}
            </td>
            <td>
                <button onClick={() => deleteProject(project.url)} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectList = ({ projects, deleteProject }) => {
    return (
        <div>
            <table>
                <th>
                    Name
                </th>
                <th>
                    Repo
                </th>
                <th>
                    URL
                </th>
                <th></th>
                {projects.map((project) => <ProjectItem project={project} deleteProject = {deleteProject}/>)}
            </table>
            <Link to='/projects/create'>Create</Link>
        </div>

        
    )
}

export default ProjectList;
