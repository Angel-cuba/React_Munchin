import React from 'react';

type InputProps = {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({ type, name, placeholder, value, onChange }: InputProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10px 30px',
        margin: '10px',
        borderRadius: '15px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.15)',
      }}
    >
      <label
        style={{
          color: '#7e7e7e',
          width: '80%',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
        htmlFor={name}
      >
        {name[0].toLocaleUpperCase() + name.slice(1)}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        style={{
          width: '98%',
          height: '30px',
          border: 'none',
          borderRadius: '5px',
          padding: '0 5px',
          fontSize: '16px',
          outline: 'none',
        }}
      />
    </div>
  );
};

export const InputForWeeks = ({ type, name, placeholder, value, onChange }: InputProps) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <input type="text" />
      <input type="text" />
    </div>
  );
};

export const RangeInputComponent = ({ value, handleInputChange }: any) => {
  return (
    <>
      <input
        type="range"
        id="cowbell"
        name="cowbell"
        min="0"
        max="7"
        value={value}
        step="1"
        onChange={handleInputChange}
        style={{
          width: '205px',
          height: '30px',
          borderRadius: '5px',
        }}
      />
      <label htmlFor="cowbell">
        {value} {value === 1 ? 'day' : 'days'}
      </label>
    </>
  );
};
