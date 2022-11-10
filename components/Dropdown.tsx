import Image, { StaticImageData } from "next/image";
import * as React from "react";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverPortal,
} from "@radix-ui/react-popover";
import useKeyPress from "../hooks/useKeyPress";
import { Search } from "./Icons";

interface State {
  selectedIndex: number;
  options: Array<DropdownOptionProps>;
}

type Action =
  | { type: "arrowUp" | "arrowDown" }
  | { type: "select"; payload: State }
  | { type: "updateOptions"; payload: { options: Array<DropdownOptionProps> } };

// UTILS
// We use this to keep track of a DropdownOption via keyboard actions
function reducer(state: State, action: Action) {
  switch (action.type) {
    // Whenever the input value changes, we need to update the data with the new filtered data
    // The keyboad selection resets to the start of the list
    // It would be nice to make the selection persist and only reset if the item no longer part of the data
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
    // "Select" an item whenever you navigated with keyboard or mouseOver
    case "select":
      return {
        selectedIndex: action.payload.selectedIndex,
        options: action.payload.options,
      };
    default:
      throw new Error();
  }
}

// Using native JS to convert numbers into a readable currency
const formatCurrency = (currency: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(currency);
//

interface DropdownOptionProps {
  id: number;
  title: string;
  image: string | StaticImageData;
  subtitle?: string;
  descriptor?: number;
  selected?: boolean;
  onMouseMove?: () => void;
  onClick?: () => void;
}

export const DropdownOption = ({
  image,
  selected,
  title,
  subtitle,
  descriptor,
  onMouseMove,
  onClick,
  id,
  ...props
}: DropdownOptionProps) => {
  return (
    <li
      className="list-none transition rounded data-[selected=true]:bg-gray-light group flex items-center w-full h-full p-2 text-xs leading-none gap-x-3 cursor-pointer"
      // Role + aria attributes to meet accessibility specs
      role="option"
      aria-selected={selected}
      data-selected={selected}
      // Use tabIndex -1 so the list item can't be focused by tabbing
      // Focus should always stay on the input so user can type
      tabIndex={-1}
      onClick={onClick}
      onMouseMove={onMouseMove}
      {...props}
    >
      <Image
        src={image}
        className="w-5 h-5 rounded-full"
        alt={`Logo for ${title} cryptocurrency`}
      />
      <div className="flex flex-col items-start gap-y-1">
        <div
          // Set width to truncate text + overflow clip, ellipsis
          className="w-28 font-medium overflow-clip whitespace-nowrap text-ellipsis leading-[normal]"
        >
          {title}
        </div>
        {subtitle ? (
          <span className="tracking-tight uppercase text-black/50">
            ${subtitle}
          </span>
        ) : null}
      </div>
      <div className="flex items-center ml-auto gap-x-2">
        <span
          // "Invisible" rather than "hidden" so that it still exists in the DOM and can be read by screen readers
          className="invisible px-1.5 py-0.5 leading-none transition rounded bg-gray text-gray-dark group-data-[selected=true]:visible"
        >
          Enter ↵
        </span>
        {descriptor ? formatCurrency(descriptor) : null}
      </div>
    </li>
  );
};

interface DropdownInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  expanded: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const DropdownInput = ({
  value,
  onChange,
  onClick,
  onKeyDown,
  expanded,
  inputRef,
}: DropdownInputProps) => {
  return (
    <div className="relative transition-all rounded overflow-clip border gap-x-1.5 leading-none w-[346px] focus-within:ring-2 focus-within:ring-offset-2 hover:border-blue-200 focus-within:border-blue-200 group">
      {/* Hidden label that only appears for screenreaders! Always include a label with an input :) */}
      <label className="sr-only" id="cmpd-label" htmlFor="assetSearch">
        Search for assets
      </label>
      <input
        // subtle placeholder transition effects to make things more lively
        className="py-3.5 px-4 outline-none w-full transition-all placeholder:opacity-80 group-hover:placeholder:opacity-100 group-focus-within:placeholder:opacity-100"
        placeholder="Search for an asset"
        id="assetSearch"
        name="assetSearch"
        role="combobox"
        aria-controls="cmpd-currencies"
        aria-expanded={expanded}
        aria-labelledby="cmpd-label"
        autoCorrect="off"
        autoComplete="off"
        spellCheck={false}
        type="text"
        value={value}
        onChange={onChange}
        onClick={onClick}
        onKeyDown={onKeyDown}
        ref={inputRef}
      />
      <div
        aria-hidden="true"
        className="absolute top-3.5 right-3 shrink-0 pointer-events-none"
      >
        <Search />
      </div>
    </div>
  );
};

interface DropdownListProps {
  containerRef: React.RefObject<HTMLUListElement>;
  children: React.ReactNode;
}

export const DropdownList = ({ containerRef, children }: DropdownListProps) => {
  return (
    <PopoverPortal>
      <PopoverContent
        // Don't drive focus to the popover on open, keep on input
        onOpenAutoFocus={(e) => e.preventDefault()}
        // Exit animations are failing on Radix Components & Next.js 13
        // So I only included enter animation for now
        className="w-[346px] data-[state=open]:animate-slide-down"
        id="cmpd-currencies"
        sideOffset={8}
        asChild
      >
        <ul
          className="flex flex-col px-2 overflow-auto bg-white border rounded shadow-xl h-fit max-h-64 py-1.5"
          role="listbox"
          ref={containerRef}
        >
          {children}
        </ul>
      </PopoverContent>
    </PopoverPortal>
  );
};

interface DropdownProps {
  useSearch: boolean;
  options: Array<DropdownOptionProps>;
}

export const Dropdown = ({ useSearch, options }: DropdownProps) => {
  // State controlled by useReducer
  const initialState: State = { selectedIndex: 0, options: options };
  const [state, dispatch] = React.useReducer(reducer, initialState);

  // Refs
  const inputRef = React.useRef<HTMLInputElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const elementRef = useSearch ? inputRef : buttonRef;
  const containerRef = React.useRef<HTMLUListElement>(null);

  // States
  // I could have contolled these with the dispatch function,
  // but for legibility I felt splitting it up was better
  const [open, setOpen] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [filter, setFilter] =
    React.useState<Array<DropdownOptionProps>>(options);

  // useKeyPress custom hook to detect arrow key navigation
  // Only activates if the selected ref is focused
  const arrowUpPressed = useKeyPress("ArrowUp", elementRef);
  const arrowDownPressed = useKeyPress("ArrowDown", elementRef);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!open) {
      setOpen(true);
    }
    setSearchValue(event.target.value);

    // Filte through data depending on the search query
    const results = options.filter((item) => {
      if (event.target.value === "") return options;
      return item.title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    setFilter(results);
    // Update the data with the filtered results
    dispatch({
      type: "updateOptions",
      payload: { options: results },
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!open && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setOpen(true);
    }

    if (event.key === "Enter") {
      setOpen(false);
      // No need to dispatch, item already set as selected by keyboard or mouseOver
      setSearchValue(filter[state.selectedIndex]?.title);
    }

    // Avoid the input caret from moving when navigating with arrow keys
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
    }
  };

  const handleClick = () => {
    // Open dropdown, but also select any text so user can overwrite it
    if (inputRef.current?.value !== "") {
      inputRef.current?.select();
    }
    setOpen(true);
  };

  const handleSelect = (title: string) => {
    setOpen(false);
    setSearchValue(title);
    // When selecting an item, return focus to the input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Allows the DropdownList to be scrolled while user is navigatating with their keyboard
  React.useEffect(() => {
    if (open) {
      const container = containerRef.current;
      if (!container) return;

      // Account for container padding "py-1.5"
      // This also allows user to scroll up / down by hovering their mouse on the edge
      let edgePadding = 6.5;

      window.requestAnimationFrame(() => {
        // Select the element that is currently as `state.SelectedIndex`
        // Could have also used `data-selected` attribute that I added myself
        const element = container.querySelector(
          "[aria-selected=true]"
        ) as HTMLElement;
        if (element) {
          const top = element.offsetTop - container.scrollTop - edgePadding;
          const bottom =
            container.scrollTop +
            container.clientHeight -
            (element.offsetTop + element.clientHeight + edgePadding);

          if (bottom < 0) container.scrollTop -= bottom;
          if (top < 0) container.scrollTop += top;
        }
      });
    }
  }, [open, state.selectedIndex]);

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
    // Popover is a controlled component now to
    // ensure we can control `open` state how we like
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor>
        {useSearch ? (
          <DropdownInput
            expanded={open}
            value={searchValue}
            onChange={handleChange}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
          />
        ) : (
          <button
            className="w-full px-4 py-2 text-white transition border rounded shadow-sm bg-gray-darker hover:bg-gray-darker/90 active:shadow-none hover:shadow"
            onClick={() => setOpen(!open)}
            ref={buttonRef}
          >
            Add Asset
          </button>
        )}
      </PopoverAnchor>
      <DropdownList containerRef={containerRef}>
        <>
          {filter.map((item, index) => {
            return (
              <DropdownOption
                key={item.id}
                selected={state.selectedIndex === index}
                // Select should occur when a mouse is moving OR a keyboard is navigating, not both
                // You wouldn't use css hover states here, because it wouldn't allow you to set a selected item
                onMouseMove={() =>
                  dispatch({
                    type: "select",
                    payload: {
                      selectedIndex: index,
                      options: filter,
                    },
                  })
                }
                onClick={() => handleSelect(item.title)}
                {...item}
              />
            );
          })}
          {searchValue !== "" && filter.length <= 0 ? (
            <div className="py-2 mx-auto text-xs font-medium">
              No assets found
            </div>
          ) : null}
        </>
      </DropdownList>
    </Popover>
  );
};

export default Dropdown;
