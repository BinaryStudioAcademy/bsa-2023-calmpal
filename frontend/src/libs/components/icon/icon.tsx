type Properties = {
  name: string;
};

const Icon: React.FC<Properties> = ({ name }) => {
  return <img src={name} alt="" />;
};

export { Icon };
