import { Button, Header } from '#libs/components/components.js';
import { useCallback, useState } from '#libs/hooks/hooks.js';

import { SurveyOption } from './components/components.js';
import styles from './styles.module.scss';

const Survey: React.FC = () => {
  const [activeOptions, setActiveOptions] = useState<string[]>([]);

  const options: string[] = [
    'Get emotional support',
    'Reduce stress or anxiety',
    'Improve sleep quality',
    'Get over with depression',
    'Improve focus',
  ];

  const handleOnActivate = useCallback(
    (label: string) => {
      setActiveOptions([...activeOptions, label]);
    },
    [activeOptions],
  );

  const handleOnDisable = useCallback(
    (label: string) => {
      const optionIndex = activeOptions.indexOf(label);
      setActiveOptions(
        activeOptions.filter((option, index) => index !== optionIndex),
      );
    },
    [activeOptions],
  );

  const handleOtherActivate = useCallback((label: string) => {
    handleOnActivate(label);
  }, []);

  const handleOtherDisable = useCallback((label: string) => {
    handleOnDisable(label);
  }, []);

  return (
    <div className={styles['container']}>
      <Header />

      <div className={styles['page']}>
        <div className={styles['name']}>
          Serenity is your trusted companion on the journey to mental well-being
        </div>

        <div className={styles['survey']}>
          <div className={styles['title']}>What can we help you with?</div>

          <div className={styles['select']}>
            {options.map((option, index) => (
              <SurveyOption
                key={index}
                label={option}
                onActivate={handleOnActivate}
                onDisable={handleOnDisable}
              />
            ))}
            <SurveyOption
              label={'Other'}
              onActivate={handleOtherActivate}
              onDisable={handleOtherDisable}
            />
          </div>

          <Button
            type={'submit'}
            label={'Continue'}
            className={styles['submit'] as string}
          />
        </div>
      </div>
    </div>
  );
};

export { Survey };
