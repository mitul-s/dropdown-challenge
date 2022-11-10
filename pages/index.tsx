import * as React from "react";
import Dropdown from "../components/Dropdown";
import { currencies as data } from "../consts";

export default function Home() {
  return (
    <div className="flex items-center w-full h-full -mt-24 justify-evenly">
      <Dropdown useSearch={true} options={data} />
      <Dropdown useSearch={false} options={data} />
    </div>
  );
}
