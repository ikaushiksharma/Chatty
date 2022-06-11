import React from "react";

const ThemeChanger = (props) => {
  return (
    <select id="ThemeChanger" className="my-4 rounded">
      <option
        value="Love"
        onSelect={() => {
          props.loveTheme();
        }}
      >
        Love
      </option>
      <option
        value="BlueHaiPaani"
        onSelect={() => {
          props.blueTheme();
        }}
      >
        Blue Hai Paani
      </option>
      <option
        value="SunKissed"
        onSelect={() => {
          props.sunTheme();
        }}
      >
        Sun Kissed
      </option>
      <option
        value="AllBlack"
        onSelect={() => {
          props.sunTheme();
        }}
      >
        All Black
      </option>
    </select>
  );
};

export default ThemeChanger;
