const RECEIVED_EMPLOYEES = '/employees/received_photo';

const receivedEmployees = (data) => ({
  type: RECEIVED_EMPLOYEES,
  payload: data
});

export const loadEmployees = () => (dispatch) => {
  fetch(`https://yalantis-react-school-api.yalantis.com/api/task0/users`)
    .then((response) => response.json())
    .then((data) => dispatch(receivedEmployees(data)));
};

const initialState = {
  employees: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVED_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
