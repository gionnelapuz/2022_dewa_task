import React, { useEffect, useState } from "react";

import Input from "../../../../../includes/input";

import * as ApiExternal from "../../../../../../api/external";

import { isValidUrl } from "../../../../../../utils/validation";
import { getDataSetsFromObjectOrArray } from "../../../../../../utils/dataSetHelpers";

import { useDatasets } from "../../../../../../resources/services/contexts/chartProvider/datasetProvider";

import { useSteps } from "../../../../../../resources/services/contexts/chartProvider/stepsProvider";
import { useDataSource } from "../../../../../../resources/services/contexts/chartProvider/dataSourceProvider";

import styles from "./dataFromUrl.module.scss";

function DataFromURL() {
  const [datasetItems, dataset, setDatasetItems, setDataset] = useDatasets();
  const [step, moveBackward, moveForward] = useSteps();
  const [source, setSource, renderSource, url, setUrl] = useDataSource();

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [sourceUrl, setSourceUrl] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSourceUrl(value);
  };

  const validate = () => {
    let errors = {};

    if (sourceUrl.length <= 0) {
      errors.sourceUrl = true;
    } else {
      if (!isValidUrl(sourceUrl)) {
        errors.sourceUrl = "Please enter a valid URL";
      }
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (validate()) {
      resetErrors();
      setIsLoading(true);
      getExternalData();
    }
  };

  const getExternalData = () => {
    ApiExternal.getData(sourceUrl)
      .then((res) => {
        setIsLoading(false);

        const dataSets = getDataSetsFromObjectOrArray(JSON.stringify(res.data));

        if (dataSets.length > 0) {
          setUrl(sourceUrl)
          setDatasetItems(dataSets);
          moveForward();
        } else {
          setErrors({
            sourceUrl:
              "Could not parse, please check if URL response retrieves an array",
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Error occurred please refresh the page");
      });
  };

  const resetErrors = () => setErrors({});

  return (
    <div className={styles.wrapper}>
      <Input
        name="url"
        value={sourceUrl}
        type="text"
        placeholder="Enter URL"
        onChange={handleInputChange}
        error={errors.sourceUrl}
      />
      <small className={styles.note}>
        Note: Enter a URL that will contain an array of data, if it is an API from
        a server please ensure CORS is enabled to access the data.
      </small>
      <button
        className="btn btn-sm btn--green"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Get Data
      </button>
    </div>
  );
}

export default DataFromURL;
