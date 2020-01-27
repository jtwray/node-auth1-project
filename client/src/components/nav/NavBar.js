import React from 'react';
import {NavLink} from 'react-router-dom';

// local
import NavLinks from './NavLinks.js'

export default function NavBar(props) {
    console.log(`*****\nNavBar: Props: ${props.isLoggedIn}\n*****`);

    return (
        <div className="nav">
            {/* image */}
            <NavLinks isLoggedIn={props.isLoggedIn}/>
        </div>
    )
}