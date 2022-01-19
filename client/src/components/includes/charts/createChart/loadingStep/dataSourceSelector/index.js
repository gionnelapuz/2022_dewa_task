import React from "react";

import PasteIcon from "@mui/icons-material/ContentPaste";
import UrlIcon from "@mui/icons-material/Link";

import { useDataSource } from "../../../../../../resources/services/contexts/chartProvider/dataSourceProvider";

import styles from "./dataSourceSelector.module.scss";

function DataSourceSelector() {
  const [source, setSource] = useDataSource();

  return (
    <div className={styles.wrapper}>
      <button
        className={`btn btn--green btn-sm ${
          source === "url" ? styles.active : ""
        }`}
        onClick={() => setSource("url")}
      >
        <UrlIcon className="icon-url" /> <span>From URL</span>
      </button>
      <button
        className={`btn btn--green btn-sm  ${
          source === "paste" ? styles.active : ""
        }`}
        onClick={() => setSource("paste")}
      >
        <PasteIcon className="icon-paste" /> <span>Paste data</span>
      </button>
    </div>
  );
}

export default DataSourceSelector;
