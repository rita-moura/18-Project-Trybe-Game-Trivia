import { USER_INFO } from '../action';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default: return state;
  }
};

export default user;
