export const generateRandomHexColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const mapLineChartData = (
  optionKey,
  dataKey,
  originalDataSet,
  chartData
) => {
  const previousDataKeys = { ...chartData.keys };
  const previousDataItems = [...chartData.items];

  if (optionKey in previousDataKeys) {
    const dataKey = previousDataKeys[optionKey];
    removeObjectItemByKey(previousDataItems, optionKey, dataKey);
  }

  const combinedOldAndNewData = combineOldAndNewData(
    previousDataItems,
    originalDataSet,
    optionKey,
    dataKey
  );

  const updatedOptionKeys = { ...previousDataKeys, [optionKey]: dataKey };

  let obj = {
    keys: updatedOptionKeys,
    items: combinedOldAndNewData,
  };

  return obj;
};

const removeObjectItemByKey = (array, optionKey, dataKey) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    if (element[optionKey][dataKey]) {
      delete element[optionKey][dataKey];
    }
  }
};

const combineOldAndNewData = (
  existingArray,
  originalDataArray,
  optionKey,
  dataKey
) => {
  let mappedArray = [];
  for (let index = 0; index < originalDataArray.length; index++) {
    const element = originalDataArray[index];
    if (element[dataKey]) {
      const previousDataObject = existingArray[index];
      mappedArray.push({
        ...previousDataObject,
        [optionKey]: {
          [dataKey]: element[dataKey],
        },
      });
    }
  }
  return mappedArray;
};


export const removeObjectItemByKeyV2 = (array, optionKey, dataKey) => {
  const previousDataKeys = { ...array.keys };
  const previousDataItems = [...array.items];

  // REMOVING KEYS
  let newKeys = {};
  for (const key1 in previousDataKeys) {
    if (key1 !== optionKey) {
      newKeys[key1] = previousDataKeys[key1];
    }
  }

  // REMOVING OBJECT FROM ITEMS
  let newArray = [];
  for (let index = 0; index < previousDataItems.length; index++) {
    const element = previousDataItems[index];

    let newObj = {};
    for (const key2 in element) {
      if (key2 !== optionKey) {
        newObj[key2] = element[key2];
      }
    }
    if (Object.keys(newObj).length !== 0) {
      newArray.push(newObj);
    }
  }

  let obj = {
    keys: newKeys,
    items: newArray,
  };

  return obj;
};
