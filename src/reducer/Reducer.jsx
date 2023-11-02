// import {
//   SATISFACTION_CHANGE_VALUE,
//   SATISFACTION_QUESTIONS,
// } from '../resources/constants';

// const data = {};
// SATISFACTION_QUESTIONS.forEach(({ id }) => (data[id] = 0));

const initialState = {
  // data,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // case SATISFACTION_CHANGE_VALUE:
    //   return {
    //     ...state,
    //     ...action,
    //     data: {
    //       ...state.data,
    //       ...action.data,
    //     },
    //   };

    default:
      return state;
  }
};

export default reducer;
