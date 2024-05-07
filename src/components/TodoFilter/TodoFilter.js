import React from 'react';
import './TodoFilter.scss';

const Filter = ({ value, onChange }) => {
  return (
    <div className="TodoFilter">
      <p className="TodoFilter__label">Фільтр за ім'ям: </p>
      <input type="text" value={value} className="TodoFilter__input" onChange={onChange}></input>
    </div>
  );
};

export default Filter;
