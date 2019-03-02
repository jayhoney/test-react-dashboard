import { SET_SEARCH_FILTER, SET_FILTER_STATUS } from '../actionTypes';
import { STATUS_FILTERS } from 'utils/constants';

const initialState = {
  searchFilter: '',
  statusFilter: STATUS_FILTERS.byIds.ALL
}

const Filter = (state = initialState, action) => {
  const { type = '', payload = {} } = action;

  switch (type) {
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilter: payload.filter
      };
    case SET_FILTER_STATUS:
      return {
        ...state,
        statusFilter: payload.filter
      }
    default:
      return state;
  }
}

export default Filter;
