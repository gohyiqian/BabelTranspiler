import * as babel from "@babel/standalone";
import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import Input from "./components/Input";
import Output from "./components/Output";
import "./styles.css";

const App = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const ref = useRef();

  useEffect(() => {
    // delay calling generateResult by 1sec after user stop typing
    ref.current = _.debounce(generateResult, 1000);
  }, []);

  useEffect(() => {
    try {
      setInput(JSON.parse(localStorage.getItem("babel_code")));
    } catch (e) {
      setInput("");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("babel_code", JSON.stringify(input));
  }, [input]);

  const generateResult = (value) => {
    try {
      // transform method of Babel
      // providng the env presets to convert ES6 code & React
      // "env" includes all other presets like ES2015, ES2016, ES2017
      const result = babel.transform(value, {
        presets: ["env", "react"],
        filename: "/App.js",
      }).code;
      setOutput(result);
      setErrorMsg("");
    } catch (e) {
      setErrorMsg(e.message);
    }
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    ref.current(value);
  };

  return (
    <div>
      <h1>Babel Transpiler</h1>
      <Input
        input={input}
        handleInputChange={handleInputChange}
        errorMsg={errorMsg}
      />
      <Output output={output} hasError={!_.isEmpty(errorMsg)} />
    </div>
  );
};

export default App;
