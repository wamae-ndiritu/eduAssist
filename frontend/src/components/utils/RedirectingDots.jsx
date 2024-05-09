import { useState, useEffect } from "react";

const RedirectingDots = ({ redirecting }) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    let intervalId;

    if (redirecting) {
      intervalId = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots === "...") {
            return "";
          } else {
            return prevDots + ".";
          }
        });
      }, 500);
    } else {
      clearInterval(intervalId);
      setDots("");
    }

    return () => clearInterval(intervalId);
  }, [redirecting]);

  return <span>{redirecting && <span className="">redirecting{dots}</span>}</span>;
};

export default RedirectingDots;
