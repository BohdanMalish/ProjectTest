import { createSelector } from 'reselect';

const employeesSelector = createSelector(
  (state) => state.employeesReducer,
  (employees) => (employees ? employees : [])
);

export default employeesSelector;
