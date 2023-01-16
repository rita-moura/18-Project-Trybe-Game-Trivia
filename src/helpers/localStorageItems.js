const savePlayerToLocalStorage = (player) => {
  if (!localStorage.ranking) {
    const emptyRanking = [];
    localStorage.setItem('ranking', emptyRanking);
  }
  const rankingLocalStorage = JSON.parse(localStorage.getItem('ranking'));
  const rankingList = [...rankingLocalStorage, player];
  localStorage.setItem('ranking', JSON.stringify(rankingList));
};

export default savePlayerToLocalStorage;
