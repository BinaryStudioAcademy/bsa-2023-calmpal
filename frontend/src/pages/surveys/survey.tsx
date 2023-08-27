import { Header } from '#libs/components/components.js';
import { useCallback } from '#libs/hooks/hooks.js';

import { PreferencesStep } from './components/components.js';
import styles from './styles.module.scss';

const Survey: React.FC = () => {
  const onSubmit = useCallback((options: string[]) => {
    return options;
  }, []);

  return (
    <div className={styles['container']}>
      <Header />

      <div className={styles['survey']}>
        <div className={styles['name']}>
          Serenity is your trusted companion on the journey to mental well-being
        </div>

        <PreferencesStep onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export { Survey };
