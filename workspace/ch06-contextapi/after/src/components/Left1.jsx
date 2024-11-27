import Left2 from "@components/Left2";
import { SimpleContext } from "@context/SimpleContext";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";

function Left1() {
  useEffect(() => {
    console.log("  # Left1 렌더링.");
  });

  return (
    <div>
      <h1>Left1</h1>
      <Left2 />
    </div>
  );
}

export default Left1;
