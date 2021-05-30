import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import selector from './Employees.selector';
import { loadEmployees } from '../../ducks/employees';

import EmployeesBirthday from '../EmployeesBirthday/EmployeesBirthday';
import Employee from '../Employee/Employee';
import styles from './Employees.module.css';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z'
];

const Employees = () => {
  const dispatch = useDispatch();
  const { employees } = useSelector(selector);
  const [listId, setListId] = useState([]);

  useEffect(() => {
    dispatch(loadEmployees());

    const employeesId = JSON.parse(window.localStorage.getItem('employees'));
    const employeesIdList = employeesId ? employeesId : [];

    setListId(employeesIdList);
  }, [dispatch]);

  const renderEmployees = (letter) => {
    const filteredList = employees?.filter(
      ({ lastName }) => lastName[0] === letter
    );
    if (filteredList?.length > 0) {
      const sortedList = filteredList.sort((a, b) => {
        if (a.lastName < b.lastName) {
          return -1;
        } else {
          return 1;
        }
      });
      return sortedList.map((employee) => (
        <Employee
          changeListId={setListId}
          key={employee.id}
          employee={employee}
        />
      ));
    } else {
      return <div className={styles['empty-letter']}>-</div>;
    }
  };

  return (
    <div className={styles['employees']}>
      <div className={styles['employees-page']}>
        <div className={styles['employees-title']}>Employees</div>
        <div className={styles['employees-letters']}>
          {alphabet.map((letter, index) => (
            <div key={index}>
              <div className={styles['employees-letter']}>{letter}</div>
              {renderEmployees(letter)}
            </div>
          ))}
        </div>
      </div>
      <EmployeesBirthday listIds={listId} />
    </div>
  );
};

export default Employees;
