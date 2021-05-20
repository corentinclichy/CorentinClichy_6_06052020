const fetchData = async () => {
  const response = await fetch("./utils/data.json");
  const photographer = await response.json();
  return photographer;
};

export default fetchData;
