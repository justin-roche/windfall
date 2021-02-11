import './styles.scss';

import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, NavLink, Redirect, withRouter } from 'react-router-dom';
import {
  RedirectWithoutLastLocation,
  useLastLocation,
} from 'react-router-last-location';
import Switch from 'react-switch';
import { Collapse } from 'reactstrap';

const Child = ({ title, children, className = '', showSidebar = true }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <Helmet title={title} />
      <div className='container'>
        <div className='row main__container'>
          {showSidebar && (
            <div className='col-lg-3 col-12 sidebar'>
              <div className='d-lg-none justify-content-end d-flex mb-lg-0 mb-2'>
                <button className='btn btn-primary' onClick={toggleNavbar}>
                  <i className='fas fa-bars'></i>
                </button>
              </div>

              <Collapse isOpen={!collapsed} navbar className='d-lg-block'>
                <div className='sidebar__title__container'>
                  <Link to='/' className='sidebar__title mr-auto'>
                    <h1>Windfall</h1>
                  </Link>
                </div>

                <p>Making scraping awesome.</p>
                <div className='sidebar__section'>
                  <h5>Scrapes</h5>

                  <ul className='nav flex-column'>
                    <li className='nav-item'>
                      <NavLink className='nav-link sidebar__item' to='/execute'>
                        Execute
                      </NavLink>
                    </li>
                    <li className='nav-item'>
                      <NavLink className='nav-link sidebar__item' to='/results'>
                        Results
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className='sidebar__section'>
                  <h5>Database</h5>

                  <ul className='nav flex-column'>
                    <li className='nav-item'>
                      <NavLink
                        className='nav-link sidebar__item'
                        to='/database'>
                        Database
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className='sidebar__section'>
                  <h5>Export</h5>

                  <ul className='nav flex-column'>
                    <li className='nav-item'>
                      <NavLink
                        className='nav-link sidebar__item'
                        to='/database'>
                        CSV
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </div>
          )}

          <div className={`${showSidebar ? 'col-lg-9 col-12' : 'col-12'}`}>
            <div className={className && className}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

const Layout = (props) => {
  const { returnPath = '/' } = props;

  const lastLocation = useLastLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <Child {...props} />;
};
export default Layout;
