import './styles.scss';

import React, {
  useEffect,
  useState,
} from 'react';

import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import {
  Link,
  NavLink,
  Redirect,
  withRouter,
} from 'react-router-dom';
import {
  RedirectWithoutLastLocation,
  useLastLocation,
} from 'react-router-last-location';
import Switch from 'react-switch';
import { Collapse } from 'reactstrap';
import * as globalAction from 'store/action';

const Child = ({
  title,
  children,
  className = '',
  showSidebar = true,
  location: { pathname },
  global: { theme, accessToken, user },
  updateThemeAction,
  updateTokenAction,
}) => {
  const onChangeTheme = (checked) => {
    updateThemeAction(checked ? 'dark' : 'light');
  };

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

                  <Switch
                    checked={theme === 'dark'}
                    onChange={onChangeTheme}
                    checkedIcon={
                      <div className='switch__icon'>
                        <i className='fa fa-sm fa-sun'></i>
                      </div>
                    }
                    uncheckedIcon={
                      <div className='switch__icon'>
                        <i className='fa fa-sm fa-moon fa-flip-horizontal'></i>
                      </div>
                    }
                    onColor='#fbfbff'
                    offColor='#222725'
                    onHandleColor='#449dd1'
                    offHandleColor='#449dd1'
                    handleDiameter={20}
                  />
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
  const {
    needLogin,
    returnPath = '/',
    location: { pathname },
    global: { accessToken, refreshToken, user },
    fetchTokenAction,
    renewTokenAction,
    getMeAction,
  } = props;

  const lastLocation = useLastLocation();

  useEffect(() => {
    fetchTokenAction();

    if (refreshToken) {
      renewTokenAction({ refreshToken });
    }

    if (!user) {
      getMeAction();
    }

    // Reset scroll.
    window.scrollTo(0, 0);
  }, []);

  if (needLogin && !accessToken) {
    return <Redirect to='/login' />;
  }

  if (pathname === '/login' && accessToken) {
    return (
      <RedirectWithoutLastLocation to={lastLocation?.pathname || returnPath} />
    );
  }

  return <Child {...props} />;
};

Layout.propTypes = {
  title: PropTypes.string,
  needLogin: PropTypes.bool,
  returnPath: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  showSidebar: PropTypes.bool,
};

const mapStateToProps = ({ global }) => ({ global });

const mapDispatchToProps = {
  fetchTokenAction: globalAction.fetchTokenAction,
  renewTokenAction: globalAction.renewTokenAction,
  getMeAction: globalAction.getMeAction,
  updateThemeAction: globalAction.updateThemeAction,
  updateTokenAction: globalAction.updateTokenAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
