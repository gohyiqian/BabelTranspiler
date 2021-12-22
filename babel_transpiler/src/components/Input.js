import React from "react";
import Error from "./Error";

const Input = ({ input, handleInputChange, errorMsg }) => {
  return (
    <div className="input">
      <h2 style={{ textAlign: "center" }}>ES6 Syntax</h2>
      <textarea
        className="input-box"
        placeholder="Write code here"
        value={input}
        onChange={handleInputChange}
      />
      {errorMsg && (
        <div className="error">
          <Error errorMsg={errorMsg} />
        </div>
      )}
    </div>
  );
};
export default Input;
