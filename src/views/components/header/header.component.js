import React from 'react';
import {Link} from 'react-router';

import LogoImg from '../../../assets/img/logo.png';


const Header = () => (
  <nav className='navbar navbar-default'>
      <div className='navbar-header'>
        <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
          <span className='sr-only'>Toggle navigation</span>
          <span className='icon-bar' />
          <span className='icon-bar' />
          <span className='icon-bar' />
        </button>
        <Link className='navbar-brand' to='/dashboard'><img src={LogoImg} alt="LogoImg"width='100px' /><div className='title'>EL PAPA</div></Link>
      </div>

      <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
        <ul className='nav navbar-nav navbar-right'>
          <li><Link to='/dashboard'>Selección</Link> <span className='sr-only'>(current)</span></li>
          <li><Link to='/menu'>Menu</Link> <span className='sr-only'>(current)</span></li>
          <li><Link to='/' onClick={window.localStorage.clear()}>Cerrar sesion</Link></li>
        </ul>
      </div>
  </nav>
);

export default Header;
