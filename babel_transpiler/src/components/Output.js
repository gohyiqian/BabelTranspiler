import React from "react";

const Output = ({ output, hasError }) => {
  return (
    <div className="output">
      <h2 style={{ textAlign: "center" }}>ES5 Syntax</h2>
      <textarea
        className="output-box"
        value={hasError ? "" : output}
        readOnly={true}
        placeholder="Compiled output will be shown here"
      />
    </div>
  );
};
export default Output;
