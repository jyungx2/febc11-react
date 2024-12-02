import { useAtom } from "jotai";
import { useEffect } from "react";
import { counterAtom } from "@jotai/atoms";

function Left3() {
  useEffect(() => {
    console.log("      # Left3 렌더링.");
  });

  const [count] = useAtom(counterAtom);

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
