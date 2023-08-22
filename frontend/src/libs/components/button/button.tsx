type Properties = {
  label: string;
  type?: 'button' | 'submit';
  className?: string | undefined;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  className = '',
}: Properties) => (
  <button type={type} className={className}>
    {label}
  </button>
);

export { Button };
