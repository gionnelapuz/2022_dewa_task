import React, { useEffect, useState } from "react";

import Input from "../../../../../Input";

import * as ApiExternal from "../../../../../../../api/external";

import { isValidUrl } from "../../../../../../../utils/validation";
import { getDataSetsFromObjectOrArray } from "../../../../../../../utils/charts/dataSetHelpers";

import { useDatasets } from "../../../../../../../services/contexts/chartProvider/datasetProvider";

import { useSteps } from "../../../../../../../services/contexts/chartProvider/stepsProvider";
import { useDataSource } from "../../../../../../../services/contexts/chartProvider/dataSourceProvider";

import styles from "./urlSource.module.scss";

function SourceFromURL() {
  const { moveStep } = useSteps();
  const { setUrl } = useDataSource();

  const { setDatasetItems } = useDatasets();

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [sourceUrl, setSourceUrl] = useState("");

  const handleInputChange = (event) => setSourceUrl(event.target.value);

  const handleValidate = () => {
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
    if (handleValidate()) {
      resetErrors();
      setIsLoading(true);
      getExternalData();
    }
  };

  const resetErrors = () => setErrors({});

  const getExternalData = () => {
    ApiExternal.get(sourceUrl)
      .then(async (res) => {
        setIsLoading(false);

        const dataSets = await getDataSetsFromObjectOrArray(
          JSON.stringify(res.data)
        );

        if (dataSets.length > 0) {
          moveStep("Preview");
          setUrl(sourceUrl);
          setDatasetItems(dataSets);
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
        Note: Enter a URL that will contain an array of data, if it is an API
        from a server please ensure CORS is enabled to access the data.
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

export default SourceFromURL;
