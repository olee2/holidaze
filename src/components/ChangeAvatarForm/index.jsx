import React from "react";
import styles from "../../pages/Profile/Profile.module.css";
import { updateAvatar } from "../../api/updateAvatar";

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
        <button className="btn" type="submit">
          Update Avatar
        </button>
        <button
          className="btn"
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
