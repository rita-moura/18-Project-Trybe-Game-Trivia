import { USER_INFO, SAVE_SCORE, PICK_ANSWERS } from '../action';

const INITIAL_STATE = {
  email: '',
  name: '',
  score: 0,
  picked: [],
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
  case PICK_ANSWERS:
    return {
      ...state,
      pickedAnswers: action.payload,
    };
  default: return state;
  }
};

export default player;
