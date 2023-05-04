import React from "react";
import styles from "./Search.module.css";

export const Search = ({ handleQuery, query }) => {
  return (
    <div className={styles.searchContainer}>
      <p className={styles.searchLabel}>Search products: </p>
      <input
        value={query}
        onChange={(v) => handleQuery(v)}
        type="text"
        className={styles.search}
      />
    </div>
  );
};
