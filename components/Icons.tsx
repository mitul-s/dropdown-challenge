export const Search = ({ ...props }) => {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 9.167a4.833 4.833 0 1 1-9.667 0 4.833 4.833 0 0 1 9.667 0Zm-.95 4.353a5.833 5.833 0 1 1 .687-.727l3.763 3.763-.707.707-3.743-3.743Z"
        fill="#000"
      />
    </svg>
  );
};
