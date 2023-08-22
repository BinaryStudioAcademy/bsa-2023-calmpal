type Properties = {
  label: string;
  type?: 'button' | 'submit';
  className?: string;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  className = '',
}) => (
  <button type={type} className={className}>
    {label}
  </button>
);

export { Button };
