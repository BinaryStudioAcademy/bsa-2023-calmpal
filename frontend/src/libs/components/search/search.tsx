import styles from './styles.module.scss';

type Properties = {
  value: string | number;
  onValueChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Search = ({ value, onValueChange }: Properties): JSX.Element => {
  return (
    <>
      <input
        className={styles['input-search']}
        placeholder="Search topic"
        value={value}
        onChange={onValueChange}
      />
    </>
  );
};

export { Search };
