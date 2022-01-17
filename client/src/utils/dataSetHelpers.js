export const getDataSetsFromObjectOrArray = (data) => {
  try {
    const parseData = JSON.parse(data);

    if (Array.isArray(parseData)) {
      return [
        { title: null, items: JSON.stringify(parseData, undefined, 2) },
      ];
    }

    if (Object.keys(parseData).length >= 0) {
      return getDatasetsFromObject(parseData);
    }
  } catch (error) {
    return false;
  }
};

const getDatasetsFromObject = (object) => {
  let dataSets = [];
  for (const key in object) {
    if (Array.isArray(object[key])) {
      dataSets.push({
        title: key,
        items: JSON.stringify(object[key], undefined, 2),
      });
    }
  }
  return dataSets;
};

export const removeObjectsAndArrays = (items) => {
  let updatedArray = [];

  for (let index = 0; index < items.length; index++) {
    const element = items[index];

    Object.keys(element).forEach((key) => {
      if (!element[key]) delete element[key];

      if (typeof element[key] === "object") delete element[key];
    });

    updatedArray.push(element);
  }

  return updatedArray;
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
    items: mappedChartItems
  }
};
