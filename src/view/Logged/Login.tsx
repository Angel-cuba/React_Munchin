import React from 'react';
import { Input } from '../../component/CustomInput/Input';
import { loginUser } from '../../api/api';
import './styles.scss';

const Login = () => {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const login = async () => {
    if(!user.email || !user.password) {
      return alert('Please fill all fields');
    }
    const response = await loginUser(user.email, user.password);
    if(response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.findUser._id);
      window.location.href = '/';
    }
  }


  return (
    <div className="login">
      <h2>Login</h2>
      <div className="login__container">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInput}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleInput}
        />
        <div
          className="login__container__button"
          onClick={login}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
