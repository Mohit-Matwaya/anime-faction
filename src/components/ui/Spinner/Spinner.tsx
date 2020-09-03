import * as React from "react";
import { FaCircleNotch } from "react-icons/fa";
import "./spinner.scss";

const Loader: React.FC = () => {
  return (
    <div className="spinner">
      <FaCircleNotch />
    </div>
  );
};
export default Loader;
