import "./Loading.css";
export const LoadingSpinner = () => {
  return (
    <div
      className="spinner-border text-light"
      role="status"
      style={{ width: "2rem", height: "2rem", borderWidth: "0.2rem" }}
    ></div>
  );
};

export const LoadingBig = () => {
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="bounce-dot delay-0"></div>
      <div className="bounce-dot delay-1"></div>
      <div className="bounce-dot delay-2"></div>
    </div>
  );
};

export const LoadingSmall = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="bounce-dot2 delay-0"></div>
      <div className="bounce-dot2 delay-1"></div>
      <div className="bounce-dot2 delay-2"></div>
    </div>
  );
};
