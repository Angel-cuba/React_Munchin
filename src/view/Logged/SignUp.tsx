import React from 'react';
import './styles.scss';
import { Input } from '../../component/CustomInput/Input';
import { registerUser } from '../../api/api';

const SignUp = () => {
  const [user, setUser] = React.useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
  });
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const register = async () => {
    if (!user.email || !user.password || !user.name || !user.lastname) {
      return alert('Please fill all fields');
    }
    const response = await registerUser(user.name, user.lastname, user.email, user.password);
    if (response.token) {
      console.log(response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.user._id);
      window.location.href = '/';
    }
  };

  return (
    <div className="login">
      <h2>Register</h2>
      <div className="login__container">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={user.name}
          onChange={handleInput}
        />
        <Input
          type="text"
          name="lastname"
          placeholder="Lastname"
          value={user.lastname}
          onChange={handleInput}
        />
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
        <div className="login__container__button" onClick={register}>
          Register
        </div>
      </div>
    </div>
  );
};

export default SignUp;
