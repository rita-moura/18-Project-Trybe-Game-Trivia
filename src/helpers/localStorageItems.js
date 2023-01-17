const savePlayerToLocalStorage = (player) => {
  if (!localStorage.ranking) {
    const emptyRanking = [];
    localStorage.setItem('ranking', JSON.stringify(emptyRanking));
  }
  const rankingLocalStorage = localStorage.getItem('ranking');
  const parsedRanking = JSON.parse(rankingLocalStorage);
  const rankingList = [...parsedRanking, player];
  localStorage.setItem('ranking', JSON.stringify(rankingList));
};

export default savePlayerToLocalStorage;
