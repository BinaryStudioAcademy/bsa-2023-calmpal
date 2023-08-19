type LoaderProperties = {
  loading: boolean;
};
const Loader: React.FC<LoaderProperties> = ({ loading }: LoaderProperties) => {
  return (
    loading && (
      <div className="ld-container">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  );
};

export { Loader };
