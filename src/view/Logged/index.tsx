import React from 'react';
import Login from './Login';
import SignUp from './SignUp';
import './styles.scss';

const Hero = () => {
  const [active, setActive] = React.useState(true);

  return (
    <div className="container">
      <div className="container__content">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus dolore dolores
        voluptates assumenda doloremque quod. Rem quisquam consectetur a obcaecati sed quo,
        temporibus alias labore non beatae at ullam? Mollitia. Minima in repellendus neque excepturi
        molestias ipsa. Dolores possimus itaque magni adipisci! Possimus perspiciatis dicta ratione,
        quae aliquid quisquam perferendis! Maiores exercitationem sit quas at dolor adipisci odit
        blanditiis deserunt? Sint recusandae accusantium magnam fugiat hic corrupti deleniti
        repudiandae tenetur odit. Nihil labore magni accusamus reiciendis. Facere expedita, nemo
        ullam dolores sapiente distinctio culpa eius et quia nostrum sequi provident. Eum nesciunt
        ab tempore vel cumque? Ad quos esse, ea numquam tempore quia obcaecati neque magnam fuga
        voluptates reiciendis commodi rerum optio nulla magni molestiae provident nihil consequatur
        repellat labore!
      </div>
      <div className="container__view">
        {active ? <Login /> : <SignUp />}
        <div className="container__view__button" onClick={() => setActive(!active)}>
          {active ? "If you don't have an account. Sign Up" : 'If you have an account. Login'}
        </div>
      </div>
    </div>
  );
};

export default Hero;
