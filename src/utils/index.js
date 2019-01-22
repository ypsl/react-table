const ascendingSortByToken = (sortToken) => (a,b) => {
  if (a[sortToken] < b[sortToken]) return -1;
  if (a[sortToken] > b[sortToken]) return 1;
  return 0;
}

const descendingSortByToken = (sortToken) => (a,b) => {
  if (a[sortToken] < b[sortToken]) return 1;
  if (a[sortToken] > b[sortToken]) return -1;
  return 0;
}

export{
  ascendingSortByToken,
  descendingSortByToken
}