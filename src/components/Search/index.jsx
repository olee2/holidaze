import React from "react";
import styles from "./Search.module.css";

export const Search = ({ handleQuery, query }) => {
  return (
    <div className={styles.searchContainer}>
      <p className={styles.searchLabel}>Search products: </p>
      <input
        value={query}
        onChange={handleQuery}
        type="text"
        className={styles.search}
        onKeyDown={(v) => {
          if (v.key === "a") {
            v.key = "b";
          }
        }}
      />
    </div>
  );
};
