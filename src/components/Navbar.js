import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className='nav'>
    <ul>
      <li>
        <NavLink to="/" exact activeClassName='active'>
          Timeline
        </NavLink>
      </li>
      <li>
        <NavLink to="/new-tweet" activeClassName='active'>
          New Tweet
        </NavLink>
      </li>
    </ul>
  </nav>
)

export default Navbar;
