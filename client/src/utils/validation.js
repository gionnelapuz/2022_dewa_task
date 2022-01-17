export const regex_url =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;

export const isValidUrl = (data) => {
  if (regex_url.test(data)) {
    return true;
  }
  return false;
};

export const isValidArray = (data) => {
  try {
    const parseData = JSON.parse(data);
    if (Array.isArray(parseData)) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const isArrayOrObject = (data) => {
  try {
    const parseData = JSON.parse(data);
    if (Array.isArray(parseData) || Object.keys(parseData).length >= 0) {
      return true;
    }
  } catch (error) {
    return false;
  }
};

export const isObjectEmpty = (data) => {
  if(Object.keys(data).length === 0){
    return true;
  }
  return false;
};
