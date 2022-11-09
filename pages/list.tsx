import React from "react";
import { useRef, useEffect, useState, useReducer } from "react";

const initialState = { selectedIndex: 0 };
const list = ["🍎 apple", "🍊 orange", "🍍 pineapple", "🍌 banana"];

function reducer(state, action) {
  switch (action.type) {
    case "arrowUp":
      return {
        selectedIndex:
          state.selectedIndex !== 0 ? state.selectedIndex - 1 : list.length - 1,
      };
    case "arrowDown":
      return {
        selectedIndex:
          state.selectedIndex !== list.length - 1 ? state.selectedIndex + 1 : 0,
      };
    case "select":
      return { selectedIndex: action.payload };
    default:
      throw new Error();
  }
}

const ListItem = ({ selected, ...props }) => {
  return (
    <li
      data-selected={selected}
      className="data-[selected=true]:bg-red-500"
      {...props}
    >
      List Item
    </li>
  );
};

export default function List() {
  const inputRef = useRef(null);
  const arrowUpPressed = useKeyPress("ArrowUp", inputRef);
  const arrowDownPressed = useKeyPress("ArrowDown", inputRef);
  const enterPressed = useKeyPress("Enter", inputRef);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "arrowUp" });
    }
  }, [arrowUpPressed]);
  useEffect(() => {
    if (enterPressed) {
      dispatch({ type: "select", payload: state.selectedIndex });
      setValue(list[state.selectedIndex]);
    }
  }, [enterPressed, state.selectedIndex]);

  useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown" });
    }
  }, [arrowDownPressed]);
  return (
    <div className="grid w-screen h-screen place-content-center">
      <input
        ref={inputRef}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
          }
        }}
      />
      <ul>
        {list.map((item, i) => {
          return (
            <ListItem
              key={item}
              selected={state.selectedIndex === i}
              onClick={() => {
                dispatch({ type: "select", payload: i });
                setValue(item);
              }}
              onMouseOver={() => dispatch({ type: "select", payload: i })}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  dispatch({ type: "select", payload: i });
                  e.target.blur();
                }
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}
