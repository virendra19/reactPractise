import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Context from "./Pages/Context";
import ApiCalls from "./Pages/APICalls";
import SignUp from "./Pages/SignUp";
import Form from "./Pages/Redux Use files/Form";
import EmpData from "./Pages/Redux Use files/Form/EmpData";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/Context" exact element={<Context />} />
          <Route path="/ApiCalls" exact element={<ApiCalls />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/Form" exact element={<Form />} />
          <Route path="/EmpData" exact element={<EmpData />} />
        </Routes>
      </Router>
    </>
  );
}
