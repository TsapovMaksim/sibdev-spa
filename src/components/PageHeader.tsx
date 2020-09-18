import { Layout } from 'antd';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '../img/sibdev-logo.svg';
import { logoutUser } from '../redux/actions/auth';
import { clearRequests } from '../redux/actions/requests';
import { clearVideos } from '../redux/actions/videos';

const { Header } = Layout;

function PageHeader(): ReactElement {
  const dispatch = useDispatch();

  const onExitClick = () => {
    dispatch(logoutUser());
    dispatch(clearVideos());
    dispatch(clearRequests());
    localStorage.removeItem('token');
  };

  return (
    <Header className="header">
      <div className="container">
        <div className="header__row">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <NavLink exact activeClassName="active" to="/" className="nav__link">
                  Поиск
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink exact activeClassName="active" to="/favorites" className="nav__link">
                  Избранное
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink onClick={() => onExitClick()} to="/auth" className="nav__link">
                  Выйти
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Header>
  );
}

export default PageHeader;
