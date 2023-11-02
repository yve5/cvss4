// import reducer from './Reducer';
// import { changeValue } from '../actions/All';

// describe('The reducer', () => {
//   const initialState = {
//     data: {
//       salary: 0,
//       satisfaction: 0,
//       employability: 0,
//       sideproject: 0,
//       culture: 0,
//       health: 0,
//       location: 0,
//       teamwork: 0,
//       prospect: 0,
//       interaction: 0,
//     },
//   };

//   xit('should handle initial state', () => {
//     expect(reducer(undefined, {})).toEqual(initialState);
//   });

//   xit('should handle SATISFACTION_CHANGE_VALUE', () => {
//     expect(reducer(undefined, changeValue('culture', 42.5))).toEqual({
//       ...initialState,
//       type: 'SATISFACTION_CHANGE_VALUE',
//       data: {
//         ...initialState.data,
//         culture: 0.0425,
//       },
//     });
//   });
// });
