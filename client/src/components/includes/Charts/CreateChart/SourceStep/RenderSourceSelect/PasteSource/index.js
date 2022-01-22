import React, { useState } from "react";

import { isArrayOrObject } from "../../../../../../../utils/validation";
import { getDataSetsFromObjectOrArray } from "../../../../../../../utils/charts/dataSetHelpers";

import TextArea from "../../../../../Textarea";

import { useDatasets } from "../../../../../../../services/contexts/chartProvider/datasetProvider";

import { useSteps } from "../../../../../../../services/contexts/chartProvider/stepsProvider";
import styles from "./pasteSource.module.scss";

function PasteSource() {
  const { moveStep } = useSteps();
  const { setDatasetItems } = useDatasets();

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
      resetErrors();

      const dataSets = await getDataSetsFromObjectOrArray(paste);

      if (dataSets.length > 0) {
        moveStep("Preview");
        setDatasetItems(dataSets);
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
      <button className="btn btn-sm btn--green" onClick={handleSubmit}>
        Format Data
      </button>
    </div>
  );
}

export default PasteSource;
