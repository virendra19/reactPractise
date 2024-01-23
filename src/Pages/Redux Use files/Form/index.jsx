import { useState } from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";

export default function Form() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [inputVals, setinputVals] = useState({});

  function handleChange(e) {
    setinputVals({ ...inputVals, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("inputVals: ", inputVals);
    const data = inputVals;
    dispatch(createUser(data));
    navigate('/EmpData')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          placeholder="enter full name"
          onChange={handleChange}
        />
        <br />
        <span></span>
        <br />
        <input
          type="email"
          name="email"
          placeholder="enter full email"
          onChange={handleChange}
        />
        <br />
        <span></span>
        <br />
        <input
          type="number"
          name="pnumber"
          placeholder="enter phone number"
          onChange={handleChange}
        />
        <br />
        <span></span>
        <br />
        <input
          type="password"
          name="password"
          placeholder="enter password"
          onChange={handleChange}
        />
        <br />
        <span></span>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
