
export const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

export const findQuoteById = (id, arr) => {
  return arr.find(item => item.id === id);
}

export const findIndexByQuote = (id, arr) => {
  const itemToBeSearched = findQuoteById(id, arr);
  return arr.indexOf(itemToBeSearched);
}
