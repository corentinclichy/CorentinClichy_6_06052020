const fetchData = async (path) => {
<<<<<<< HEAD
  console.log(path);
=======
>>>>>>> 91efbb4cba74db77ec4a27888ac298b691c2098b
  const response = await fetch(path);
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
