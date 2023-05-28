import React from "react";
import styles from "./SortSelect.module.css";

const SortSelect = ({ sort, sortOrder, onSortChange, onSortOrderChange }) => {
  return (
    <div className={styles.sort}>
      <p className={styles.sortLabel}>Sort: </p>
      <div className={styles.sortContainer}>
        <select value={sort} onChange={onSortChange}>
          <option value="name">Name</option>
          <option value="created">Created</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="maxGuests">Max Guests</option>
        </select>
        <select value={sortOrder} onChange={onSortOrderChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default SortSelect;
