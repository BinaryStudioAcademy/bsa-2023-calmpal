import styles from './styles.module.scss';

type Properties = {
  label: string;
  checked?: boolean;
  name?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disableDefaultStyles?: boolean;
};

const Checkbox: React.FC<Properties> = ({
  label,
  checked,
  name,
  onChange,
  disableDefaultStyles,
}) => {
  const checkboxClassName = disableDefaultStyles ? '' : styles['checkbox'];
  const containerClassName = disableDefaultStyles ? '' : styles['container'];
  const labelClassName = disableDefaultStyles ? '' : styles['label'];

  return (
    <label>
      <input
        className={checkboxClassName}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <div className={containerClassName}>
        <span className={labelClassName}>{label}</span>
      </div>
    </label>
  );
};

export { Checkbox };
