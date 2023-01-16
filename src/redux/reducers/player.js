import { USER_INFO, SAVE_SCORE } from '../action';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_INFO:
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  case SAVE_SCORE:
    return { ...state,
      score: action.payload,
    };
  default: return state;
  }
};

export default player;
