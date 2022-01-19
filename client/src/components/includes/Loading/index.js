import React from "react";

import styles from "./loading.module.scss";

function Loading() {
  return (
    <div className={styles.loading}>
      <div className={`spinner-border ${styles.spinner} text-primary`}>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}

export default Loading;
