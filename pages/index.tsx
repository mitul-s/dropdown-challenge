import * as React from "react";
import Dropdown from "../components/Dropdown";
import { currencies as data } from "../consts";

export default function Home() {
  return (
    <div className="grid w-screen h-screen gap-y-12 place-content-center">
      <Dropdown useSearch={true} options={data} />
      {/* <Dropdown useSearch={false} options={data} /> */}
    </div>
  );
}
