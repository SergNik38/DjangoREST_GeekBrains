import React from 'react';
import { Link } from 'react-router-dom';

const MainMenu = () => {
    return (
        <ul>
            <li><Link to='/'>Users</Link></li>
            <li><Link to='/todos'>ToDo</Link></li>
            <li><Link to='/projects'>Projects</Link></li>
            <li>'AKSJDLASJDALKd'</li>
        </ul>
    )
}

export default MainMenu;