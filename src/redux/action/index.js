export const USER_INFO = 'USER_INFO';
export const SAVE_SCORE = 'SAVE_SCORE';
export const PICK_ANSWERS = 'PICK_ANSWERS';
export const CLEAR_STATE = 'CLEAR_STATE';
export const SAVE_ASSERTIONS = 'SAVE_ASSERTIONS';

export const fetchAPIToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const jsonData = await response.json();
  return jsonData;
};

export const userInfo = (payload) => ({
  type: USER_INFO,
  payload,
});

export const saveScore = (payload) => ({
  type: SAVE_SCORE,
  payload,
});

export const savePickedAnswers = (payload) => ({
  type: PICK_ANSWERS,
  payload,
});

export const saveAssertions = (payload) => ({
  type: SAVE_ASSERTIONS,
  payload: payload.length,
});

export const resetState = () => ({
  type: CLEAR_STATE,
});
