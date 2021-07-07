const fetchData = async (path) => {
  const response = await fetch(path);
  const photographer = await response.json();
  return photographer;
};

export default fetchData;

export const createNewAttribute = async () => {
  fetchData().then(({ media }) => {
    const mediaWithAlt = [];
    media.map((mediaItem) => mediaWithAlt.push({ ...mediaItem, altText: media.title }));
    const mediaWithAltJSON = JSON.stringify(mediaWithAlt);
    return mediaWithAltJSON;
  });
};
