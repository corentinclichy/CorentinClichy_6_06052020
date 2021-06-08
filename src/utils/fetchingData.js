const fetchData = async () => {
  const response = await fetch("/src/ressources/data.json");
  const photographer = await response.json();
  return photographer;
};

export default fetchData;

export const createNewAttribute = async () => {
  fetchData().then(({ media }) => {
    let mediaWithAlt = [];
    media.map((media) => {
      mediaWithAlt.push({ ...media, altText: media.title });
    });
    console.log(mediaWithAlt);
    const mediaWithAltJSON = JSON.stringify(mediaWithAlt);
    console.log(mediaWithAltJSON);
  });
};
