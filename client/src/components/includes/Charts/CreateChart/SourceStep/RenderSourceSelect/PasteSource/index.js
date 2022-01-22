import React, { useState } from "react";

import { isArrayOrObject } from "../../../../../../../utils/validation";
import { getDataSetsFromObjectOrArray } from "../../../../../../../utils/charts/dataSetHelpers";

import { useDatasets } from "../../../../../../../services/contexts/chartProvider/datasetProvider";
import { useSteps } from "../../../../../../../services/contexts/chartProvider/stepsProvider";

import TextArea from "../../../../../Textarea";

import * as ApiExternal from "../../../../../../../api/external";

import styles from "./pasteSource.module.scss";

function PasteSource() {
  const { moveStep } = useSteps();
  const { setDatasetItems } = useDatasets();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [paste, setPaste] = useState("");

  const handleInputChange = (event) => setPaste(event.target.value);

  const handleValidate = () => {
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

  const handleSubmit = async () => {
    if (handleValidate()) {
      setIsLoading(true);

      resetErrors();
      getExternalData();

      // const dataSets = await getDataSetsFromObjectOrArray(paste);

      // if (dataSets.length > 0) {
      //   moveStep("Preview");
      //   setDatasetItems(dataSets);
      // } else {
      //   setErrors({
      //     paste: "Could not parse input",
      //   });
      // }
    }
  };

  const resetErrors = () => setErrors({});

  const getExternalData = () => {
    ApiExternal.get({
      items: paste,
    })
      .then((res) => {
        setIsLoading(false);
        if (res.data.length > 0) {
          moveStep("Preview");
          setDatasetItems(res.data);
        } else {
          setErrors({
            paste: "Could not parse input",
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

export default PasteSource;
