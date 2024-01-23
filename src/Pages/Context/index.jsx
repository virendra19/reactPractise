import { createContext, useState } from "react";
import ComA from "./ComA";

export const AppState = createContext();

export default function Context() {
  const [addData, setAddData] = useState("hii");

  return (
    <AppState.Provider value={{ addData }}>
      <div>
        <ComA />
      </div>
    </AppState.Provider>
  );
}
