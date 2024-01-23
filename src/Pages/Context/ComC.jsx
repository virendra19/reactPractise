import { useContext } from "react";
import {AppState}  from "./index";

export default function ComC() {
  const getData = useContext(AppState);
  console.log('getData: ', getData.addData);
  
  return <div>{"hi"}</div>;
}
