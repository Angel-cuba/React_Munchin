import React, { useEffect, useState } from 'react';
import { allUsersAvailability, createUserAvailability, getUserAvailability } from '../../api/api';
import { RangeInputComponent } from '../../component/CustomInput/Input';

const UserSchedule = () => {
  const [userAvailability, setUserAvailability] = React.useState<any>([]);
  const [user, setUser] = React.useState<any>([]);
  const [weekAvailability, setWeekAvailability] = React.useState<any>([]);

  const userId = localStorage.getItem('userId') || '';

  React.useEffect(() => {
    const getUserData = async () => {
      const response = await getUserAvailability(userId);
      setUserAvailability(response.availability);
      setUser(response.getUser);
    };
    getUserData();
  }, [userId]);

  const handleAvailability = async () => {
    const availability = {
      userId,
      available: weekAvailability,
    };
    await createUserAvailability(availability);
    // console.log('🚀 ~ file: UserSchedule.tsx:57 ~ handleAvailability ~ response', response);

    const response = await getUserAvailability(userId);
    setUserAvailability(response.availability);
  };

  return (
    <div className="home__user-schedule">
      <div className="home__user-schedule__container">
        <Avaibility userAvailability={userAvailability} />
        <User user={user} />
        <HandleAvailability setWeekAvailability={setWeekAvailability} />
        <div className="home__user-schedule__container__send-info">
          {userAvailability?.available?.length > 0 ? (
            <div
              className="home__user-schedule__container__send-info--button"
              onClick={() => alert('Update your schedule!!!')}
            >
              Update
            </div>
          ) : (
            <div
              className="home__user-schedule__container__send-info--button"
              onClick={handleAvailability}
            >
              Save
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSchedule;

const Avaibility = ({ userAvailability }: any) => {
  const [usersData, setUsersData] = useState([]);
  // console.log('🚀 ~ file: UserSchedule.tsx:57 ~ Avaibility ~ userAvailability:', userAvailability);
  // const avaibility = userAvailability?.available?.map((item: any) => (
  //   <div key={item.week} className="home__user-schedule__container__avaibility--item">
  //     {item.free}
  //   </div>
  // ));
  useEffect(() => {
    const all = async () => {
      const data = await allUsersAvailability();
      setUsersData(data);
    };
    all();
  }, []);
  //Crear funciones para buscar cantidad de usuarios free por cada semana
  const week1Free = () => {
    const week1 = usersData.filter((item: any) => item.available[0].free > 0);
    return week1.length;
  };
  const week2Free = () => {
    const week2 = usersData.filter((item: any) => item.available[1].free > 0);
    return week2.length;
  };
  const week3Free = () => {
    const week3 = usersData.filter((item: any) => item.available[2].free > 0);
    return week3.length;
  };
  const week4Free = () => {
    const week4 = usersData.filter((item: any) => item.available[3].free > 0);
    return week4.length;
  };
  const week5Free = () => {
    const week5 = usersData.filter((item: any) => item.available[4].free > 0);
    return week5.length;
  };
  const week6Free = () => {
    const week6 = usersData.filter((item: any) => item.available[5].free > 0);
    return week6.length;
  };
  const week7Free = () => {
    const week7 = usersData.filter((item: any) => item.available[6].free > 0);
    return week7.length;
  };
  //funcion para sacar la semana con mayor cantidad de personas libres
  const bestWeek = () => {
    const weeks = [
      week1Free(),
      week2Free(),
      week3Free(),
      week4Free(),
      week5Free(),
      week6Free(),
      week7Free(),
    ];
    const max = Math.max(...weeks);
    const index = weeks.indexOf(max);
    return index + 1;
  };

  const WeekSelector = () => {
    return (
      <select name="week" id="week">
        <option value="">Select week</option>
        <option value="week1">Week 1 ({week1Free()})</option>
        <option value="week2">Week 2 ({week2Free()})</option>
        <option value="week3">Week 3 ({week3Free()})</option>
        <option value="week4">Week 4 ({week4Free()})</option>
        <option value="week5">Week 5 ({week5Free()})</option>
        <option value="week6">Week 6 ({week6Free()})</option>
        <option value="week7">Week 7 ({week7Free()})</option>
      </select>
    );
  };
  return (
    <>
      <div className="home__user-schedule__container__avaibility">
        <div>Avaibility</div>
        <div className="home__user-schedule__container__avaibility--item">
          This week ({week1Free()})
        </div>
        <div className="home__user-schedule__container__avaibility--item">
          Next week({week2Free()})
        </div>
        <div className="home__user-schedule__container__avaibility--item">Best ({bestWeek()})</div>
        <div className="home__user-schedule__container__avaibility--selector">{WeekSelector()}</div>
      </div>
      {/* <div className="home__user-schedule__container__avaibility">
      <div>Free</div>
      {avaibility}
    </div> */}
    </>
  );
};

const User = ({ user }: any) => {
  const actions = ['q', 'w', 'e', 'r', 't', 'y'];
  const actionBlock = () => {
    return actions.map((action) => (
      <div key={action} className="home__user-schedule__container__user__data__actions--item">
        {action}
      </div>
    ));
  };
  return (
    <div className="home__user-schedule__container__user">
      <div className="home__user-schedule__container__user__data">
        <div className="home__user-schedule__container__user__data--img-name">
          <img
            src="https://res.cloudinary.com/dqaerysgb/image/upload/v1658247594/Personal%20/Angel_NON-bg_mgyvrs.png"
            alt="img"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'contain',
            }}
          />{' '}
          {user?.name}
        </div>
        <div className="home__user-schedule__container__user__data__availability">Week</div>
        <div className="home__user-schedule__container__user__data__actions">{actionBlock()}</div>
      </div>
    </div>
  );
};

const HandleAvailability = ({ setWeekAvailability }: any) => {
  const [value, setValue] = useState(6);
  const [value1, setValue1] = useState(4);
  const [value2, setValue2] = useState(3);
  const [value3, setValue3] = useState(2);
  const [value4, setValue4] = useState(6);
  const [value5, setValue5] = useState(5);
  const [value6, setValue6] = useState(4);

  const [weekActive, setWeekActive] = useState(false);
  const [week1Active, setWeek1Active] = useState(false);
  const [week2Active, setWeek2Active] = useState(false);
  const [week3Active, setWeek3Active] = useState(false);
  const [week4Active, setWeek4Active] = useState(false);
  const [week5Active, setWeek5Active] = useState(false);
  const [week6Active, setWeek6Active] = useState(false);

  useEffect(() => {
    const settingWeekAvailability = () => {
      setWeekAvailability([
        { week: '1', free: !weekActive ? value : 0 },
        { week: '2', free: !week1Active ? value1 : 0 },
        { week: '3', free: !week2Active ? value2 : 0 },
        { week: '4', free: !week3Active ? value3 : 0 },
        { week: '5', free: !week4Active ? value4 : 0 },
        { week: '6', free: !week5Active ? value5 : 0 },
        { week: '7', free: !week6Active ? value6 : 0 },
      ]);
    };
    settingWeekAvailability();
  }, [
    value,
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    weekActive,
    week1Active,
    week2Active,
    week3Active,
    week4Active,
    week5Active,
    week6Active,
    setWeekAvailability,
  ]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };
  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(Number(event.target.value));
  };
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(Number(event.target.value));
  };
  const handleInputChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue3(Number(event.target.value));
  };
  const handleInputChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue4(Number(event.target.value));
  };
  const handleInputChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue5(Number(event.target.value));
  };
  const handleInputChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue6(Number(event.target.value));
  };
  return (
    <>
      <div className="home__user-schedule__container__handler">
        <label
          htmlFor="week"
          style={{
            position: 'relative',
          }}
        >
          Week
          <div
            style={{
              position: 'absolute',
              top: '1px',
              left: '70px',
              width: '208px',
              height: '16px',
              backgroundColor: '#7E7E7E00',
              opacity: '0.5',
              borderRadius: '5px',
              display: weekActive ? 'block' : 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#B14040',
                borderRadius: '6px',
              }}
            ></div>
          </div>
        </label>
        <div
          className=""
          style={{
            position: 'relative',
            width: '12px',
            height: '12px',
            borderRadius: '3px',
            border: '1px solid black',
            backgroundColor: weekActive ? '#7E7E7E' : 'white',
            color: 'whitesmoke',
            margin: '0 10px 0 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setWeekActive(!weekActive)}
        >
          x
        </div>
        <RangeInputComponent value={value} handleInputChange={handleInputChange} />
      </div>
      <div className="home__user-schedule__container__handler">
        <label
          htmlFor="week1"
          style={{
            position: 'relative',
          }}
        >
          Week 1
          <div
            style={{
              position: 'absolute',
              top: '1px',
              left: '80px',
              width: '208px',
              height: '16px',
              backgroundColor: '#7E7E7E00',
              opacity: '0.5',
              borderRadius: '5px',
              display: week1Active ? 'block' : 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#B14040',
                borderRadius: '6px',
              }}
            ></div>
          </div>
        </label>
        <div
          className=""
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '3px',
            border: '1px solid black',
            backgroundColor: week1Active ? '#7E7E7E' : 'white',
            color: 'whitesmoke',
            margin: '0 10px 0 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setWeek1Active(!week1Active)}
        >
          x
        </div>
        <RangeInputComponent value={value1} handleInputChange={handleInputChange1} />
      </div>
      <div className="home__user-schedule__container__handler">
        <label
          htmlFor="week2"
          style={{
            position: 'relative',
          }}
        >
          Week 2
          <div
            style={{
              position: 'absolute',
              top: '1px',
              left: '80px',
              width: '208px',
              height: '16px',
              backgroundColor: '#7E7E7E00',
              opacity: '0.5',
              borderRadius: '5px',
              display: week2Active ? 'block' : 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#B14040',
                borderRadius: '6px',
                marginLeft: '2px',
              }}
            ></div>
          </div>
        </label>
        <div
          className=""
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '3px',
            border: '1px solid black',
            backgroundColor: week2Active ? '#7E7E7E' : 'white',
            color: 'whitesmoke',
            margin: '0 10px 0 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setWeek2Active(!week2Active)}
        >
          x
        </div>
        <RangeInputComponent value={value2} handleInputChange={handleInputChange2} />
      </div>
      <div className="home__user-schedule__container__handler">
        <label
          htmlFor="week3"
          style={{
            position: 'relative',
          }}
        >
          Week 3
          <div
            style={{
              position: 'absolute',
              top: '1px',
              left: '80px',
              width: '208px',
              height: '16px',
              backgroundColor: '#7E7E7E00',
              opacity: '0.5',
              borderRadius: '5px',
              display: week3Active ? 'block' : 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#B14040',
                borderRadius: '6px',
                marginLeft: '3px',
              }}
            ></div>
          </div>
        </label>
        <div
          className=""
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '3px',
            border: '1px solid black',
            backgroundColor: week3Active ? '#7E7E7E' : 'white',
            color: 'whitesmoke',
            margin: '0 10px 0 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setWeek3Active(!week3Active)}
        >
          x
        </div>
        <RangeInputComponent value={value3} handleInputChange={handleInputChange3} />
      </div>
      <div className="home__user-schedule__container__handler">
        <label
          htmlFor="week4"
          style={{
            position: 'relative',
          }}
        >
          Week 4
          <div
            style={{
              position: 'absolute',
              top: '1px',
              left: '80px',
              width: '208px',
              height: '16px',
              backgroundColor: '#7E7E7E00',
              opacity: '0.5',
              borderRadius: '5px',
              display: week4Active ? 'block' : 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#B14040',
                borderRadius: '6px',
                marginLeft: '4px',
              }}
            ></div>
          </div>
        </label>
        <div
          className=""
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '3px',
            border: '1px solid black',
            backgroundColor: week4Active ? '#7E7E7E' : 'white',
            color: 'whitesmoke',
            margin: '0 10px 0 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setWeek4Active(!week4Active)}
        >
          x
        </div>
        <RangeInputComponent value={value4} handleInputChange={handleInputChange4} />
      </div>
      <div className="home__user-schedule__container__handler">
        <label
          htmlFor="week5"
          style={{
            position: 'relative',
          }}
        >
          Week 5
          <div
            style={{
              position: 'absolute',
              top: '1px',
              left: '80px',
              width: '208px',
              height: '16px',
              backgroundColor: '#7E7E7E00',
              opacity: '0.5',
              borderRadius: '5px',
              display: week5Active ? 'block' : 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#B14040',
                borderRadius: '6px',
                marginLeft: '3.5px',
              }}
            ></div>
          </div>
        </label>
        <div
          className=""
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '3px',
            border: '1px solid black',
            backgroundColor: week5Active ? '#7E7E7E' : 'white',
            color: 'whitesmoke',
            margin: '0 10px 0 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setWeek5Active(!week5Active)}
        >
          x
        </div>
        <RangeInputComponent value={value5} handleInputChange={handleInputChange5} />
      </div>
      <div className="home__user-schedule__container__handler">
        <label
          htmlFor="week6"
          style={{
            position: 'relative',
          }}
        >
          Week 6
          <div
            style={{
              position: 'absolute',
              top: '1px',
              left: '80px',
              width: '208px',
              height: '16px',
              backgroundColor: '#7E7E7E00',
              opacity: '0.5',
              borderRadius: '5px',
              display: week6Active ? 'block' : 'none',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#B14040',
                borderRadius: '6px',
                marginLeft: '4px',
              }}
            ></div>
          </div>
        </label>
        <div
          className=""
          style={{
            width: '12px',
            height: '12px',
            borderRadius: '3px',
            border: '1px solid black',
            backgroundColor: week6Active ? '#7E7E7E' : 'white',
            color: 'whitesmoke',
            margin: '0 10px 0 5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => setWeek6Active(!week6Active)}
        >
          x
        </div>
        <RangeInputComponent value={value6} handleInputChange={handleInputChange6} />
      </div>
    </>
  );
};
