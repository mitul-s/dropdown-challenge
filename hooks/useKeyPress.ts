import React from "react";

type HandlerProps = {
  key: string;
};

// Abstracted and modified from https://usehooks.com/useKeyPress/
const useKeyPress = (targetKey: string, ref: React.RefObject<HTMLElement>) => {
  const [keyPressed, setKeyPressed] = React.useState(false);

  React.useEffect(() => {
    const elementRef = ref.current;
    const downHandler = ({ key }: HandlerProps) => {
      if (key === targetKey) {
        setKeyPressed(true);
      }
    };
    const upHandler = ({ key }: HandlerProps) => {
      if (key === targetKey) {
        setKeyPressed(false);
      }
    };

    elementRef?.addEventListener("keydown", downHandler);
    elementRef?.addEventListener("keyup", upHandler);

    return () => {
      elementRef?.removeEventListener("keydown", downHandler);
      elementRef?.removeEventListener("keyup", upHandler);
    };
  }, [targetKey, ref]);

  return keyPressed;
};

export default useKeyPress;
