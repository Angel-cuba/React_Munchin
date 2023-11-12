import React from 'react';
import Navbar from '../../component/Navbar/Navbar';
import UserSchedule from './UserSchedule';
import './Home.scss';

const Home = ({ setUser }: any) => {
  return (
    <div className='home'>
      <Navbar setUser={setUser} />
      <UserSchedule />
    </div>
  );
};

export default Home;
