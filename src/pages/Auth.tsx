import { Button, Input } from 'antd';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import logoSvg from '../img/sibdev-logo.svg';

import { fetchUser, UserI } from '../redux/actions/auth';

function Auth(): ReactElement {
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const [passwordValue, setPasswordValue] = React.useState('');
  const [nameValue, setNameValue] = React.useState('');
  const [errorValue, setErrorValue] = React.useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const onVisiblePasswordClick = (visiblePassword: boolean) => {
    setVisiblePassword(visiblePassword);
  };

  const onNameChange = (value: string) => {
    setNameValue(value);
  };

  const onPasswordChange = (value: string) => {
    setPasswordValue(value);
  };

  const handlerSubmit = async (e: React.FormEvent, name: string, password: string) => {
    e.preventDefault();
    const user: UserI = await axios
      .get(`http://localhost:3001/users?name=${name}`)
      .then(({ data }) => data[0]);

    if (!!!user || user.password !== password) {
      setErrorValue('Непрвильное имя пользователя или пароль');
    } else {
      history.push('/');
      localStorage.setItem('token', `${user.id}`);
      dispatch(fetchUser(user.id));
    }
  };
  return (
    <section className="auth">
      <div className="auth__content">
        <div className="logo">
          <img src={logoSvg} alt="logo" />
        </div>
        <h2 className="auth__title">Вход</h2>
        <form
          onSubmit={(e) => handlerSubmit(e, nameValue, passwordValue)}
          action=""
          className="auth__form">
          <div className="auth__form-input">
            <label htmlFor="" className="auth__form-label">
              Логин
            </label>
            <Input
              value={nameValue}
              onChange={(e) => onNameChange(e.target.value)}
              className="input"
              name="name"
              id="name"
            />
          </div>
          <div className="auth__form-input">
            <label htmlFor="" className="auth__form-label">
              Пароль
            </label>
            <Input
              value={passwordValue}
              onChange={(e) => onPasswordChange(e.target.value)}
              name="password"
              id="password"
              type={visiblePassword ? 'text' : 'password'}
              className="input password-input"
            />
            <i>
              {visiblePassword ? (
                <svg
                  onClick={() => onVisiblePasswordClick(false)}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                    stroke="#D1D1D1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#D1D1D1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  onClick={() => onVisiblePasswordClick(true)}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14.12 14.12C13.8454 14.4148 13.5141 14.6512 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.4811 9.80385 14.1962C9.51897 13.9113 9.29439 13.572 9.14351 13.1984C8.99262 12.8249 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2219 9.18488 10.8539C9.34884 10.4859 9.58525 10.1547 9.88 9.88003M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68192 3.96914 7.65663 6.06 6.06003L17.94 17.94ZM9.9 4.24002C10.5883 4.0789 11.2931 3.99836 12 4.00003C19 4.00003 23 12 23 12C22.393 13.1356 21.6691 14.2048 20.84 15.19L9.9 4.24002Z"
                    stroke="#D1D1D1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1L23 23"
                    stroke="#D1D1D1"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </i>
          </div>
          <p className="auth__error">{errorValue}</p>
          <div className="auth__submit-btn">
            <Button className="auth__submit-btn" htmlType="submit" type="primary" size="large">
              Войти
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Auth;
