import React, { useEffect, useState } from "react";

export default function Login() {
  const [inputVal, setInputVal] = useState({});
  const [errors, setErrors] = useState({});
  const [storeData, setStoreData] = useState([]);

  useEffect(() => {
    localStorage.setItem("store", JSON.stringify(inputVal));
  }, [inputVal]);

  function handleChange(e) {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function handleCheck(e) {
    // console.log("e: ", e.target.checked);
    let val = e.target.checked;
    setInputVal({ ...inputVal, [e.target.name]: val });
    setErrors({ ...errors, [e.target.name]: "" });
  }

  function validation() {
    let formIsValid = true;
    let errors = {};

    if (!inputVal?.email) {
      formIsValid = false;
      errors["email"] = "Please enter your email";
    }

    if (!inputVal?.password) {
      formIsValid = false;
      errors["password"] = "Please enter valid password";
    }

    if (!inputVal?.selectCars) {
      formIsValid = false;
      errors["selectCars"] = "please select";
    }

    if (!inputVal?.check1) {
      formIsValid = false;
      errors["check1"] = "please accepts terms & conditions";
    }

    setErrors(errors);

    return formIsValid;
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (validation()) {
      const response = await fetch(
        "https://64fe364d596493f7af7efc3e.mockapi.io/dataPost",
        {
          method: "POST",
          body: JSON.stringify(inputVal),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      console.log(result);

      let datas = JSON.parse(localStorage.getItem("store"));
      setStoreData([...storeData, datas]); // Use spread operator to create a new array
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="enter your email address"
          onChange={handleChange}
        />
        <span>{errors?.email}</span>
        <br />
        <input
          type="password"
          name="password"
          placeholder="enter your password"
          onChange={handleChange}
          autoComplete="on"
        />
        <span>{errors?.password}</span>
        <br />
        <select name="selectCars" id="cars" onChange={handleChange}>
          <option value="">Select Value</option>
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
        <span>{errors?.selectCars}</span>
        <br />
        <input
          type="checkbox"
          id="vehicle1"
          name="check1"
          value="Bike"
          onChange={handleCheck}
        />
        <label htmlFor="vehicle1"> I have a bike &nbsp;</label>
        <span>{errors?.check1}</span>
        <br />

        <button type="submit">Submit</button>
      </form>

      <table>
        <tr>
          <th>email</th>
          <th>Password</th>
        </tr>

        <tbody>
          {storeData?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item?.email}</td>
                <td>{item?.password}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
