import { CVSS4_CHANGE_VALUE, CVSS4_RESET_SCORE } from '../resources/constants';
import { cvssConfig } from '../references/cvssConfig';
import { initMetrics } from '../utils';

const initialState = {
  metrics: initMetrics(cvssConfig),
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CVSS4_RESET_SCORE:
      return {
        ...state,
        ...action,
      };

    case CVSS4_CHANGE_VALUE: {
      const updatedMetric = {};
      updatedMetric[action.metric] = action.value;

      const copyAction = { ...action };
      delete copyAction.metric;
      delete copyAction.value;

      return {
        ...state,
        ...copyAction,
        metrics: {
          ...state.metrics,
          ...updatedMetric,
        },
      };
    }

    default:
      return state;
  }
};

export default reducer;
