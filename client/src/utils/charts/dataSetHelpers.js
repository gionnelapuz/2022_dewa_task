export const getDataSetsFromObjectOrArray = async (data) => {
  try {
    const parseData = JSON.parse(data);

    if (Array.isArray(parseData)) {
      let array = [];

      let items = await getDataSetFromArray(parseData);
      let headers = await getHeaders(items);
      if (items.length > 0) {
        array = [
          {
            title: null,
            items,
            headers,
          },
        ];
      }

      return array;
    }

    if (Object.keys(parseData).length >= 0) {
      return await getDataSetFromObject(parseData);
    }
  } catch (error) {
    return false;
  }
};

const getDataSetFromObject = async (object) => {
  let dataSets = [];
  for (const key in object) {
    const arrayFromObject = object[key];

    if (Array.isArray(arrayFromObject) && arrayFromObject.length > 0) {
      let items = await getDataSetFromArray(arrayFromObject);
      let headers = await getHeaders(items);
      dataSets.push({
        title: key,
        items,
        headers,
      });
    }
  }
  return dataSets;
};

const getHeaders = async (array) => {
  if (array.length > 0) {
    return Object.keys(array[0]);
  }
};

const getDataSetFromArray = async (array) => {
  let dataSet = [];
  if (array.length > 0) {
    for (let index = 0; index < array.length; index++) {
      const object = array[index];
      let formattedDataSetObjects = await formatDataSetObject(object);
      dataSet.push(formattedDataSetObjects);
    }
  }
  return dataSet;
};

const formatDataSetObject = async (object) => {
  for (const key in object) {
    if (object[key] === "" || typeof object[key] === "object")
      object[key] = null;
  }
  return object;
};

export const retrieveDataSet = (dataSet, key) => {
  let retrievedDataSet;
  if (key !== null) {
    retrievedDataSet = dataSet[key];
  } else {
    retrievedDataSet = dataSet;
  }
  return retrievedDataSet;
};

export const generateChartData = (dataSet, keys) => {
  let mappedChartItems = [];

  for (let index = 0; index < dataSet.length; index++) {
    const element = dataSet[index];

    let obj = {};

    Object.keys(element).forEach((data) => {
      for (const key in keys) {
        const keyValue = keys[key];
        if (keyValue === data) {
          obj[key] = {
            [keyValue]: element[data],
          };
        }
      }
    });

    mappedChartItems.push(obj);
  }

  return {
    keys,
    items: mappedChartItems,
  };
};
