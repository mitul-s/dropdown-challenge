export default function Backup() {
  return <div>u</div>;
}

// import Head from "next/head";
// import Image from "next/image";
// import * as React from "react";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverAnchor,
//   PopoverContent,
//   PopoverPortal,
// } from "@radix-ui/react-popover";
// import useSearch from "../hooks/useSearch";
// import bitcoin from "../public/images/bitcoin.png";

// const data = [
//   {
//     id: 1,
//     title: "Bitcoin",
//     subtitle: "BTC",
//     descriptor: 50000,
//     image: bitcoin,
//   },
//   {
//     id: 2,
//     title: "Ethereum",
//     subtitle: "ETH",
//     descriptor: 3000,
//     image: "",
//   },
//   {
//     id: 3,
//     title: "Dogecoin",
//     subtitle: "Doge",
//     descriptor: 3000,
//     image: "",
//   },
//   {
//     id: 4,
//     title: "Cosmos",
//     subtitle: "Cos",
//     descriptor: 3000,
//     image: "",
//   },
//   {
//     id: 5,
//     title: "Cosmos-d",
//     subtitle: "Cosd",
//     descriptor: 3000,
//     image: "",
//   },
//   {
//     id: 6,
//     title: "Cosmd",
//     subtitle: "Codd",
//     descriptor: 3000,
//     image: "",
//   },
// ];

// type Option = {
//   id: number;
//   title: string;
//   image: string;
//   subtitle?: string;
//   descriptor?: number;
// };

// const SearchIcon = () => (
//   <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path
//       fillRule="evenodd"
//       clipRule="evenodd"
//       d="M14 9.167a4.833 4.833 0 1 1-9.667 0 4.833 4.833 0 0 1 9.667 0Zm-.95 4.353a5.833 5.833 0 1 1 .687-.727l3.763 3.763-.707.707-3.743-3.743Z"
//       fill="#000"
//     />
//   </svg>
// );

// const AddIcon = (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width={20}
//     height={20}
//     viewBox="0 0 256 256"
//   >
//     <path fill="none" d="M0 0h256v256H0z" />
//     <circle
//       cx={128}
//       cy={128}
//       r={96}
//       fill="none"
//       stroke="#000"
//       strokeMiterlimit={10}
//       strokeWidth={16}
//     />
//     <path
//       fill="none"
//       stroke="#000"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={16}
//       d="M88 128h80M128 88v80"
//     />
//   </svg>
// );

// type Dropdown = {
//   useSearch_: boolean;
//   options: Array<Option>;
// };

// const Dropdown = ({ useSearch_, options }: Dropdown) => {
//   const inputRef = React.useRef<HTMLInputElement>(null);
//   const { results, searchValue, setSearchValue } = useSearch<Option>({
//     dataSet: options,
//     keys: ["title", "subtitle"],
//   });
//   const [selected, setSelected] = React.useState<number>(0);
//   const [open, setOpen] = React.useState<boolean>(false);
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!open) {
//       setOpen(true);
//     }
//     setSearchValue(e.target.value);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "ArrowDown") {
//       setOpen(true);
//     }
//   };

//   const handleClick = () => {
//     if (inputRef.current?.value !== "") {
//       inputRef.current?.select();
//     }
//     setOpen(true);
//   };

//   const handleSelect = (title: string) => {
//     setOpen(false);
//     // setSelected(id);
//     setSearchValue(title);
//     inputRef?.current?.focus();
//   };

//   const Option = ({ image, title, subtitle, descriptor }: Option) => {
//     return (
//       <li
//         className="list-none transition rounded focus:bg-gray-light hover:bg-gray-light"
//         role="option"
//         aria-selected="false"
//       >
//         <button
//           className="flex items-center w-full h-full p-2 text-xs leading-none gap-x-3 group"
//           onClick={() => handleSelect(title)}
//         >
//           <>
//             {/* <Image src={image} className="w-5 h-5 rounded-full" alt="" /> */}
//             <div className="flex flex-col items-start gap-y-1">
//               <div className="font-medium">{title}</div>
//               {subtitle && (
//                 <span className="tracking-tight uppercase text-black/50">
//                   ${subtitle}
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center ml-auto gap-x-2">
//               <div className="invisible px-1.5 py-0.5 leading-none transition rounded group-hover:visible bg-gray text-gray-dark">
//                 Enter ↵
//               </div>
//               {descriptor &&
//                 new Intl.NumberFormat("en-US", {
//                   style: "currency",
//                   currency: "USD",
//                 }).format(descriptor)}
//             </div>
//           </>
//         </button>
//       </li>
//     );
//   };

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverAnchor>
//         {useSearch_ ? (
//           <div className="relative transition-all rounded overflow-clip border gap-x-1.5 leading-none w-[346px] focus-within:ring-2 focus-within:ring-offset-2 hover:border-blue-200 focus-within:border-blue-200 group">
//             <label className="sr-only" id="cmpd-label" htmlFor="search">
//               Search for assets
//             </label>
//             <input
//               className="py-3.5 pl-4 outline-none w-full transition group-hover:opacity-80 group-focus-within:opacity-80 opacity-60"
//               placeholder="Search"
//               role="combobox"
//               aria-controls="cmpd-currencies"
//               aria-expanded={open}
//               aria-labelledby="cmpd-label"
//               autoCorrect="off"
//               autoComplete="off"
//               spellCheck={false}
//               type="text"
//               value={searchValue}
//               onChange={handleChange}
//               onClick={handleClick}
//               onKeyDown={handleKeyDown}
//               ref={inputRef}
//             />
//             <div
//               aria-hidden="true"
//               className="absolute top-3.5 right-3 shrink-0 pointer-events-none"
//             >
//               <SearchIcon />
//             </div>
//           </div>
//         ) : (
//           <button>Search</button>
//         )}
//       </PopoverAnchor>
//       <PopoverPortal>
//         <PopoverContent
//           onOpenAutoFocus={(e) => e.preventDefault()}
//           className="w-[346px]"
//           id="cmpd-currencies"
//           sideOffset={8}
//         >
//           <ul
//             className="flex flex-col px-2 overflow-auto bg-white border rounded shadow-xl h-fit max-h-64 py-1.5"
//             role="listbox"
//           >
//             {/* {options
//               .filter(
//                 (option) => option.title.includes(filter) || filter === ""
//               )
//               .map((item) => (
//                 <Option key={item.title} {...item} />
//               ))} */}
//             {results.map((item) => (
//               <Option key={item.title} {...item} />
//             ))}
//             {searchValue !== "" && results.length <= 2 ? (
//               <Option image={AddIcon} title={`Add "${searchValue}" manually`} />
//             ) : null}
//           </ul>
//         </PopoverContent>
//       </PopoverPortal>
//     </Popover>
//   );
// };

// export default function Backup() {
//   const [open, setOpen] = React.useState(true);
//   return (
//     <div className="grid w-screen h-screen place-content-center">
//       <Dropdown useSearch_={true} options={data} />
//     </div>
//   );
// }
