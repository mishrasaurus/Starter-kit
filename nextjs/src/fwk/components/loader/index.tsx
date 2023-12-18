import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface Props {
  size?: number;
  message?: React.ReactNode;
  className?: string;
}

const Loader: React.FC<Props> = (props) => (
  <div className={`fixed inset-0 flex items-center justify-center bg-opacity-40 bg-white ${props.className}`}>
    <div className="text-center p-4 rounded-lg">
      <CircularProgress size={props.size} />
      {props.message && <div>{props.message}</div>}
    </div>
  </div>
);

export default Loader;