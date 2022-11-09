import React from "react"

const useKeyPress = (targetKey: string, ref) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  React.useEffect(() => {
    const elementRef = ref.current;
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };
    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    elementRef.addEventListener("keydown", downHandler);
    elementRef.addEventListener("keyup", upHandler);

    return () => {
      elementRef.removeEventListener("keydown", downHandler);
      elementRef.removeEventListener("keyup", upHandler);
    };
  }, [targetKey, ref]);

  return keyPressed;
};

export default useKeyPress;