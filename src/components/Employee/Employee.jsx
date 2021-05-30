import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Employee.module.css';

const Employee = ({ employee, changeListId }) => {
  const { firstName, lastName, id } = employee;

  const [active, setActive] = useState(false);

  useEffect(() => {
    const employeesId = JSON.parse(window.localStorage.getItem('employees'));
    const employeesIdList = employeesId ? employeesId : [];
    employeesIdList.forEach((element) => {
      if (element === id) {
        setActive(true);
      }
    });
  }, [id]);

  const changeLocalStorage = (idEmployee) => {
    const employees = JSON.parse(window.localStorage.getItem('employees'));
    changeListId(employees);

    const employeesList = employees ? employees : [];
    const list = !active
      ? employeesList.concat([idEmployee])
      : employees.filter((id) => id !== idEmployee);

    window.localStorage.setItem('employees', JSON.stringify(list));
  };

  const handleChangeCheckbox = (e) => {
    changeLocalStorage(e.target.value);
    setActive(!active);
  };

  return (
    <div
      className={styles['employee']}
      style={{
        backgroundColor: active ? 'white' : 'black',
        color: active ? '' : 'white'
      }}
    >
      <div className={styles['employee-lastname']}>
        <div className={styles['employee-name']}>
          <div className={styles['employee-lastname']}>{lastName}</div>
          <div className={styles['employee-firstname']}>{firstName}</div>
        </div>
        <div>
          <input
            className={styles['not-active']}
            type="checkbox"
            checked={!active}
            value={id}
            onChange={handleChangeCheckbox}
          />
          not active
        </div>
        <div>
          <input
            className={styles['active']}
            type="checkbox"
            checked={active}
            value={id}
            onChange={handleChangeCheckbox}
          />
          active
        </div>
      </div>
    </div>
  );
};

Employee.propTypes = {
  employee: PropTypes.object.isRequired,
  changeListId: PropTypes.func.isRequired
};

export default Employee;
