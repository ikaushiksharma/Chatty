import React from "react";

const Header = (props) => {
  return (
    <div className="flex justify-center py-10 text-2xl ">{props.data}</div>
  );
};

export default Header;
