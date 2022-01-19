import React, { useEffect, useState } from "react";

import { isArrayOrObject } from "../../../../../../utils/validation";
import { getDataSetsFromObjectOrArray } from "../../../../../../utils/dataSetHelpers";

import TextArea from "../../../../textarea";

import { useDatasets } from "../../../../../../resources/services/contexts/chartProvider/datasetProvider";

import styles from "./dataFromPaste.module.scss";
import { useSteps } from "../../../../../../resources/services/contexts/chartProvider/stepsProvider";

function DataFromPaste() {
  const [step, moveBackward, moveForward] = useSteps();
  const [datasetItems, dataset, setDatasetItems, setDataset] = useDatasets();

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const [paste, setPaste] = useState("");

  const handleInputChange = (event) => {
    const { value } = event.target;
    setPaste(value);
  };

  const validate = () => {
    let errors = {};

    if (paste.length <= 0) {
      errors.paste = true;
    } else {
      if (!isArrayOrObject(paste)) {
        errors.paste = "Malformed input";
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

      const dataSets = getDataSetsFromObjectOrArray(paste);

      if (dataSets.length > 0) {
        setDatasetItems(dataSets);
        moveForward();
      } else {
        setErrors({
          paste: "Could not parse input",
        });
      }
    }
  };

  const resetErrors = () => setErrors({});

  return (
    <div className={styles.wrapper}>
      <TextArea
        name="paste"
        placeholder={"Paste data"}
        onChange={handleInputChange}
        error={errors.paste}
      />
      <button
        className="btn btn-sm btn--green"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        Format Data
      </button>
    </div>
  );
}

export default DataFromPaste;
