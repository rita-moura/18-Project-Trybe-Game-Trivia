export const USER_INFO = 'USER_INFO';
export const SAVE_SCORE = 'SAVE_SCORE';

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
