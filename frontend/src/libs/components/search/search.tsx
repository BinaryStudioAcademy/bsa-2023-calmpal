import styles from './styles.module.scss';

type Properties = {
  value: string | number;
  handleValueChange: React.ChangeEventHandler<HTMLInputElement>;
};

const Search = ({ value, handleValueChange }: Properties): JSX.Element => {
  return (
    <>
      <input
        className={styles['input-search']}
        placeholder="Search topic"
        value={value}
        onChange={handleValueChange}
      />
    </>
  );
};

export { Search };
