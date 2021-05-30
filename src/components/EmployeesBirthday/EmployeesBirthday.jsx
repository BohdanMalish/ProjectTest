import React from 'react';
import { useSelector } from 'react-redux';

import selector from '../Employees/Employees.selector';
import styles from './EmployeesBirthday.module.css';

const EmployeesBirthday = ({ listIds }) => {
  const months = [
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    ' December',
    'January',
    'February',
    'March',
    'April'
  ];
  const { employees } = useSelector(selector);

  const getValidDate = (data) => {
    const date = new Date(data);
    const month = date.toLocaleString('en', { month: 'long' });
    const year = date.toLocaleString('en', { year: 'numeric' });
    const day = date.toLocaleString('en', { day: 'numeric' });

    return `${day} ${month}, ${year} year`;
  };

  const renderEmployeesBirthday = (month) => {
    const employeesIds = JSON.parse(window.localStorage.getItem('employees'));
    const employeesListId = employeesIds ? employeesIds : [];
    let list = [];

    employeesListId.forEach((element) => {
      employees.forEach((employee) => {
        if (employee.id === element) {
          list.push(employee);
        }
      });
    });

    const filteredList = list?.filter(({ dob }) => {
      const date = new Date(dob);
      const monthName = date.toLocaleString('en', { month: 'long' });
      if (month === monthName) {
        return true;
      } else {
        return false;
      }
    });

    const sortedList = filteredList.sort((a, b) => {
      if (a.lastName < b.lastName) {
        return -1;
      } else {
        return 1;
      }
    });

    if (sortedList.length > 0) {
      return (
        <div className={styles['ebirthday-month']}>
          <div className={styles['Name-of-month']}>{month}</div>
          {sortedList.map((employee) => (
            <div key={`${employee.id}birth`}>
              {employee.lastName} {employee.firstName} -{' '}
              {getValidDate(employee.dob)}
            </div>
          ))}
        </div>
      );
    } else {
      return;
    }
  };
  const listIDSprot = JSON.parse(window.localStorage.getItem('employees'));

  return (
    <div className={styles['ebirthday']}>
      <div className={styles['ebirthday-title']}>Employees Birthday</div>
      <div className={styles['ebirthday-months']}>
        {listIDSprot?.length === 0 ? (
          <div className={styles['ebirtday-empty']}>
            Employees List is empty
          </div>
        ) : (
          months.map((month, index) => (
            <div key={index}>{renderEmployeesBirthday(month)}</div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeesBirthday;
