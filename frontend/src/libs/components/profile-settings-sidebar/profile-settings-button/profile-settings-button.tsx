import styles from './styles.module.scss';

type ProfileSettingsButtonProperties = {
  children: React.ReactNode;
  icon: string;
};

const ProfileSettingsButton: React.FC<ProfileSettingsButtonProperties> = (
  properties,
) => {
  const { icon, children } = properties;

  return (
    <button className={styles['profile-button']}>
      <img src={icon} alt="button icon" />
      <span className={styles['profile-button-text']}>{children}</span>
    </button>
  );
};

export { ProfileSettingsButton };
