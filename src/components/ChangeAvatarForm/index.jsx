import React from "react";
import styles from "./ChangeAvatarForm.module.css";

const ChangeAvatarForm = ({
  avatarUrl,
  setAvatarUrl,
  setIsEditingAvatar,
  handleAvatarSubmit,
}) => {
  return (
    <form className={styles.avatarForm} onSubmit={handleAvatarSubmit}>
      <div className={styles.avatarInputContainer}>
        <label className={styles.avatarLabel}>New Avatar URL:</label>
        <input
          className={styles.avatarInput}
          type="url"
          value={avatarUrl}
          onChange={(event) => setAvatarUrl(event.target.value)}
          required
        />
      </div>

      <div className={styles.avatarButtons}>
        <button className="btn-link" type="submit">
          Update Avatar
        </button>
        <button
          className="btn-link"
          type="button"
          onClick={() => setIsEditingAvatar(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ChangeAvatarForm;
