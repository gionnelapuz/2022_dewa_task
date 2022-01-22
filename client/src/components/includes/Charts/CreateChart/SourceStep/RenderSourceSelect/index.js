import React from "react";

import PasteIcon from "@mui/icons-material/ContentPaste";
import UrlIcon from "@mui/icons-material/Link";

import { useDataSource } from "../../../../../../services/contexts/chartProvider/dataSourceProvider";

import styles from "./renderSourceSelect.module.scss";

function RenderSourceSelect() {
  const { source, setSource } = useDataSource();

  const sourceSelectItems = [
    {
      key: "Url",
      text: "From URL",
      icon: <UrlIcon />,
    },
    {
      key: "Paste",
      text: "Paste Data",
      icon: <PasteIcon />,
    }
  ];

  return (
    <div className={styles.wrapper}>
      {sourceSelectItems.map((data, i) => (
        <button
          key={i}
          className={`btn btn--green btn-sm ${
            source === data.key ? styles.active : ""
          }`}
          onClick={() => setSource(data.key)}
        >
          {data.icon} <span>{data.text}</span>
        </button>
      ))}
    </div>
  );
}

export default RenderSourceSelect;
