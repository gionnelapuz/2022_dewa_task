export const getDataSetsFromObjectOrArray = (data) => {
  try {
    const parseData = JSON.parse(data);

    if (Array.isArray(parseData)) {
      return getDatasetsFromArray(parseData);
    }

    if (Object.keys(parseData).length >= 0) {
      return getDatasetsFromObject(parseData);
    }
  } catch (error) {
    return false;
  }
};

const getDatasetsFromArray = (array) => {
  let dataSet = [];

  for (let index = 0; index < array.length; index++) {
    const object = array[index];

    let formattedArrayObjects = {};
    for (const key in object) {
      if (typeof object[key] !== "object") {
        formattedArrayObjects[key] = object[key];
      }
    }
    dataSet.push(formattedArrayObjects);
  }

  return [
    {
      title: null,
      items: JSON.stringify(dataSet, undefined, 2),
    },
  ];
};

const getDatasetsFromObject = (object) => {
  let dataSets = [];
  for (const key in object) {
    const arrayFromObject = object[key];

    if (Array.isArray(arrayFromObject)) {
      let arrayToAttach = [];
      for (let index = 0; index < arrayFromObject.length; index++) {
        const object = arrayFromObject[index];

        let formattedArrayObjects = {};
        for (const key in object) {
          if (typeof object[key] !== "object") {
            formattedArrayObjects[key] = object[key];
          }
        }

        arrayToAttach.push(formattedArrayObjects);
      }

      dataSets.push({
        title: key,
        items: JSON.stringify(arrayToAttach, undefined, 2),
      });
    }
  }
  return dataSets;
};

const formatObjectsFromArray = (object) => {
  let obj = {};
  for (const key in object) {
    if (typeof object[key] !== "object") {
      obj[key] = object[key];
    }
  }
  return obj;
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
    items: mappedChartItems,
  };
};
