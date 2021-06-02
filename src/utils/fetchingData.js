const fetchData = async () => {
  const response = await fetch("../../src/ressources/data.json");
  const photographer = await response.json();
  return photographer;
};

export default fetchData;
