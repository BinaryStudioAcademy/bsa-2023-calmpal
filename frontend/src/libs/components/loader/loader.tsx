import '#assets/css/loader.scss';

const Loader: React.FC = () => {
  return (
    <div className="ld-container">
      <div className="lds-ellipsis">
        <div className="ld-child"></div>
        <div className="ld-child"></div>
        <div className="ld-child"></div>
        <div className="ld-child"></div>
      </div>
    </div>
  );
};

export { Loader };
