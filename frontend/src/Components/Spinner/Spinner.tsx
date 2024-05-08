import "./spinner.css";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="spinner-overlay">
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
