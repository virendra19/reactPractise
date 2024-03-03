import axios from "axios";
import React, { useState } from "react";
import ReadData from "./ReadData";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate()
  const [inputVal, setInputVal] = useState({});
  const [err, setErr] = useState({});
  const [photoError, setPhotoError] = useState("");

  function handleChange(e) {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
    setErr({ ...err, [e.target.name]: "" });
  }

  function handleImgChange(e) {
    setInputVal({ ...inputVal, [e.target.name]: e.target.files[0] });
    setErr({ ...err, [e.target.name]: "" });
    setPhotoError("");
  }

  function validation() {
    let formIsValid = true;
    let errors = {};

    // if (!inputVal?.photo) {
    //   formIsValid = false;
    //   errors["photo"] = "Please Enter Image";
    // }

    if (!inputVal?.fname) {
      formIsValid = false;
      errors["fname"] = "Please Enter first name";
    }

    if (!inputVal?.email) {
      formIsValid = false;
      errors["email"] = "Please Enter email";
    }

    if (!inputVal?.password) {
      formIsValid = false;
      errors["password"] = "Please Enter Password";
    }

    if (!inputVal?.gender) {
      formIsValid = false;
      errors["gender"] = "Please Enter gender";
    }

    setErr(errors);
    return formIsValid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validation()) {
      try {
        const response = await axios.post(
          "https://65ae80dc1dfbae409a74fab0.mockapi.io/formData1",
          inputVal
        );
        setInputVal({})
        navigate(0)
        
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <input
          type="file"
          id="img"
          name="photo"
          accept="image/*"
          onChange={handleImgChange}
        />
        {inputVal?.photo && (
          <img
            src={URL.createObjectURL(inputVal?.photo)}
            alt="photo"
            loading="lazy"
            width={50}
            height={50}
          />
        )}
        <br />
        <span>{photoError || err.photo}</span>
        <br /> */}

        <input
          type="text"
          placeholder="Enter your full name"
          onChange={handleChange}
          name="fname"
        />
        <br />
        <span>{err.fname}</span>
        <input
          type="email"
          placeholder="Enter your email"
          onChange={handleChange}
          name="email"
        />
        <br />
        <span>{err.email}</span>
        <input
          type="password"
          placeholder="Enter password"
          onChange={handleChange}
          name="password"
        />
        <br />
        <span>{err.password}</span>
        <select name="gender" id="gender" onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <br />
        <span>{err.gender}</span>
        <button>Submit</button>
      </form>

      <ReadData />
    </div>
  );
}
