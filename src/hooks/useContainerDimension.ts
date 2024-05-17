import { useEffect, useState } from "react";

export const useContainerDimensions = (
  myRef: React.MutableRefObject<HTMLElement | null>
) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getDimensions = () => ({
      width: myRef.current?.offsetWidth || 0,
      height: myRef.current?.offsetHeight || 0,
    });

    const handleResize = () => {
      setDimensions(getDimensions());
    };

    if (myRef.current) {
      setDimensions(getDimensions());
    }

    const resizeObserver = new ResizeObserver(() => {
      setDimensions(getDimensions());
    });

    if (myRef.current) {
      resizeObserver.observe(myRef.current);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [myRef]);

  console.log("testing dimensions: ", dimensions, "myRef: ", myRef.current);

  return dimensions;
};
