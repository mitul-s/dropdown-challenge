import Image, { StaticImageData } from "next/image";
import * as React from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverPortal,
} from "@radix-ui/react-popover";
import useKeyPress from "../hooks/useKeyPress";
import { useReducer } from "react";
import SearchIcon from "../components/SearchIcon";
interface Dropdown {
  useSearch: boolean;
  options: Array<Option>;
}

interface Option {
  id: number;
  title: string;
  image: string | StaticImageData;
  subtitle?: string;
  descriptor?: number;
  selected?: boolean;
  onMouseMove?: () => void;
  onClick?: () => void;
}

type State = {
  selectedIndex: number;
  options: Array<Option>;
};

type Action =
  | { type: "arrowUp" | "arrowDown" }
  | { type: "select"; payload: State }
  | { type: "updateOptions"; payload: { options: Array<Option> } };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "updateOptions":
      return {
        selectedIndex: 0,
        options: action.payload.options,
      };
    case "arrowUp":
      return {
        options: state.options,
        selectedIndex:
          state.selectedIndex !== 0
            ? state.selectedIndex - 1
            : state.options.length - 1,
      };
    case "arrowDown":
      return {
        options: state.options,
        selectedIndex:
          state.selectedIndex !== state.options.length - 1
            ? state.selectedIndex + 1
            : 0,
      };
    case "select":
      return {
        selectedIndex: action.payload.selectedIndex,
        options: action.payload.options,
      };
    default:
      throw new Error();
  }
}

const Option = ({
  image,
  selected,
  title,
  subtitle,
  descriptor,
  onMouseMove,
  onClick,
}: Option) => {
  const formatCurrency = (currency: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(currency);

  return (
    <li
      className="list-none transition rounded data-[selected=true]:bg-gray-light group flex items-center w-full h-full p-2 text-xs leading-none gap-x-3 cursor-pointer"
      role="option"
      aria-selected={selected}
      data-selected={selected}
      tabIndex={-1}
      onClick={onClick}
      onMouseMove={onMouseMove}
    >
      <Image src={image} className="w-5 h-5 rounded-full" alt="" />
      <div className="flex flex-col items-start gap-y-1">
        <div className="font-medium">{title}</div>
        {subtitle && (
          <span className="tracking-tight uppercase text-black/50">
            ${subtitle}
          </span>
        )}
      </div>
      <div className="flex items-center ml-auto gap-x-2">
        <div className="invisible px-1.5 py-0.5 leading-none transition rounded bg-gray text-gray-dark group-data-[selected=true]:visible">
          Enter ↵
        </div>
        {descriptor && formatCurrency(descriptor)}
      </div>
    </li>
  );
};

const Dropdown = ({ useSearch, options }: Dropdown) => {
  const initialState: State = { selectedIndex: 0, options: options };
  const inputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLUListElement>(null);
  const [searchValue, setSearchValue] = React.useState("");
  const [filter, setFilter] = React.useState({
    query: "",
    list: options,
  });

  const arrowUpPressed = useKeyPress("ArrowUp", inputRef);
  const arrowDownPressed = useKeyPress("ArrowDown", inputRef);
  const [state, dispatch] = useReducer(reducer, initialState);

  const [open, setOpen] = React.useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!open) {
      setOpen(true);
    }
    setSearchValue(e.target.value);

    const results = options.filter((item) => {
      if (e.target.value === "") return options;
      return item.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    setFilter({
      query: e.target.value,
      list: results,
    });
    dispatch({
      type: "updateOptions",
      payload: { options: results },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && e.key === "ArrowDown") {
      setOpen(true);
    }

    if (e.key === "Enter") {
      setOpen(false);
      setSearchValue(filter.list[state.selectedIndex]?.title);
    }

    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
    }
  };

  const handleClick = () => {
    // select should happen on any opening interaction, not just click
    if (inputRef.current?.value !== "") {
      inputRef.current?.select();
    }
    setOpen(true);
  };

  const handleSelect = (title: string) => {
    setOpen(false);
    setSearchValue(title);
    inputRef?.current?.focus();
  };

  React.useEffect(() => {
    if (arrowUpPressed) {
      dispatch({ type: "arrowUp" });
    }
  }, [arrowUpPressed]);

  React.useEffect(() => {
    if (arrowDownPressed) {
      dispatch({ type: "arrowDown" });
    }
  }, [arrowDownPressed]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor>
        {useSearch ? (
          <div className="relative transition-all rounded overflow-clip border gap-x-1.5 leading-none w-[346px] focus-within:ring-2 focus-within:ring-offset-2 hover:border-blue-200 focus-within:border-blue-200 group">
            <label className="sr-only" id="cmpd-label" htmlFor="assetSearch">
              Search for assets
            </label>
            <input
              className="py-3.5 px-4 outline-none w-full transition group-hover:opacity-80 group-focus-within:opacity-80 opacity-60"
              placeholder="Search for an asset"
              id="assetSearch"
              role="combobox"
              aria-controls="cmpd-currencies"
              aria-expanded={open}
              aria-labelledby="cmpd-label"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              type="text"
              value={searchValue}
              onChange={handleChange}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
            <div
              aria-hidden="true"
              className="absolute top-3.5 right-3 shrink-0 pointer-events-none"
            >
              <SearchIcon />
            </div>
          </div>
        ) : (
          <button
            className="w-full py-2 text-white transition border rounded shadow-sm bg-gray-darker hover:bg-gray-darker/90 active:shadow-none hover:shadow"
            onClick={() => setOpen(!open)}
          >
            Search
          </button>
        )}
      </PopoverAnchor>
      <PopoverPortal>
        <PopoverContent
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-[346px]"
          id="cmpd-currencies"
          sideOffset={8}
        >
          <ul
            className="flex flex-col px-2 overflow-auto bg-white border rounded shadow-xl h-fit max-h-64 py-1.5"
            role="listbox"
            ref={containerRef}
          >
            {filter.list.map((item, index) => {
              return (
                <Option
                  key={item.title}
                  selected={state.selectedIndex === index}
                  onMouseMove={() =>
                    dispatch({
                      type: "select",
                      payload: {
                        selectedIndex: index,
                        options: filter.list,
                      },
                    })
                  }
                  onClick={() => handleSelect(item.title)}
                  {...item}
                />
              );
            })}
            {/* {searchValue !== "" && filter.list.length <= 2 ? (
              <Option title={`Add "${searchValue}" manually`} />
            ) : null} */}
          </ul>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  );
};

export default Dropdown;
