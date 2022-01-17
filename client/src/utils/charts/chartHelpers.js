export const generateRandomHexColor = () => {
  const colors = ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087']
  return colors[Math.floor(Math.random() * colors.length)];
};

export const mapChartData = (
  optionKey,
  dataKey,
  originalDataSet,
  chartData
) => {
  const previousDataKeys = { ...chartData.keys };
  let previousDataItems = [...chartData.items];

  if (optionKey in previousDataKeys) {
    const keyToRemove = previousDataKeys[optionKey];
    previousDataItems = removeObjectItemByKey(
      previousDataItems,
      optionKey,
      keyToRemove
    );
  }

  const combinedOldAndNewData = combineOldAndNewData(
    previousDataItems,
    originalDataSet,
    optionKey,
    dataKey
  );

  const updatedOptionKeys = { ...previousDataKeys, [optionKey]: dataKey };

  return {
    keys: updatedOptionKeys,
    items: combinedOldAndNewData,
  };
};

const removeObjectItemByKey = (array, optionKey, keyToRemove) => {
  for (let index = 0; index < array.length; index++) {
    const objectItem = array[index];
    if (objectItem[optionKey][keyToRemove]) {
      delete objectItem[optionKey][keyToRemove]
    }
  }
  return array;
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
    const previousDataObject = existingArray[index];
    mappedArray.push({
      ...previousDataObject,
      [optionKey]: {
        [dataKey]: element[dataKey],
      },
    });
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
