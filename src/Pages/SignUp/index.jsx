import axios from "axios";
import { useEffect, useState } from "react";
import "./signup.scss";
import Modal from "../../components/Modal";
import { MdClose } from "react-icons/md";

export default function SignUp() {
  const [inputVal, setInputVal] = useState({});
  const [errs, setErrs] = useState({});
  const [storeData, setStoreData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStoreVal, setSelectedStoreVal] = useState();

  const getApi = async () => {
    const getApi = await axios.get(
      "https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm"
    );
    setStoreData(getApi?.data);
  };

  useEffect(() => {
    getApi();
  }, []);

  function handleChange(e) {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
    setErrs({ ...errs, [e.target.name]: "" });
  }

  function handleCheck(e) {
    setInputVal({ ...inputVal, [e.target.name]: e.target.checked });
    setErrs({ ...errs, [e.target.name]: "" });
  }

  function validation() {
    let formIsValid = true;
    let errs = {};

    if (!inputVal.fname) {
      formIsValid = false;
      errs["fname"] = "Please enter your name";
    }

    if (!inputVal.email) {
      formIsValid = false;
      errs["email"] = "Please enter your email";
    }

    if (!inputVal.password) {
      formIsValid = false;
      errs["password"] = "Please enter your password";
    }

    if (!inputVal.repassword) {
      formIsValid = false;
      errs["repassword"] = "Please enter your re-password";
    }

    if (inputVal.repassword !== inputVal.password) {
      formIsValid = false;
      errs["repassword"] = "Please enter your matching password";
    }

    if (!inputVal.sgender) {
      formIsValid = false;
      errs["sgender"] = "Please select gender";
    }

    if (!inputVal.terms) {
      formIsValid = false;
      errs["terms"] = "Please accept terms & conditions";
    }

    setErrs(errs);
    return formIsValid;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (validation()) {
      const postApi = await fetch(
        "https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm",
        {
          method: "POST",
          body: JSON.stringify(inputVal),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await postApi.json();
      location.reload();
      console.log("res: ", res);

      //   const postApi = await axios.post(
      //     "https://64fe364d596493f7af7efc3e.mockapi.io/test",
      //     {
      //       fname: inputVal?.fname,
      //       email: inputVal?.email,
      //       password: inputVal?.password,
      //       repassword: inputVal?.repassword,
      //       sgender: inputVal?.sgender,
      //       terms: inputVal?.terms,
      //     }
      //   );

      //   const updateApi = await fetch(
      //     "https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm/2",
      //     {
      //       method: "PUT",
      //       body: JSON.stringify({sgender:"male"}),
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     }
      //   );
    }
  }

  function handleDelete(item) {
    // method : 1 => locally delete in state
    setStoreData((prevData) => prevData.filter((dataItem) => dataItem.id !== item.id));
    // method 2 :=> locally delete with help splice method
    // const deleteData = storeData?.findIndex((data) => data?.id === item?.id);
    // if (deleteData !== -1) {
    //   const newArr = [...storeData];
    //   newArr.splice(deleteData, 1);
    //   setStoreData(newArr);
    //   console.log("deleteData: ", storeData);
    // }
    // method with Delete API
    if (storeData?.filter((item) => item?.name === item?.name)) {
         axios
        .delete(`https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm/${item?.id}`)
        .then((res) => {
          if (res?.status === 200) {
            alert("Successfully data deleted");
            // location.reload();
          }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  }

  function handleOpen(item) {
    setSelectedStoreVal(item);
    setModalOpen(true);
  }

  function handleChange1(e) {
    setSelectedStoreVal({
      ...selectedStoreVal,
      [e.target.name]: e.target.value,
    });
  }

  async function handleUpdateVal(e, selectedStoreVal) {
    e.preventDefault();
    console.log("selectedStoreVal: ", selectedStoreVal);

    const updateDataStoreInApi = await axios
      .put(
        `https://65ae80dc1dfbae409a74fab0.mockapi.io/ApiForm/${selectedStoreVal?.id}`,
        {
          fname: selectedStoreVal?.fname,
          email: selectedStoreVal?.email,
        }
      )
      .then((res) => {
        if (res?.status == 200) {
          setModalOpen(false);
          location.reload();
        }
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fname"
          placeholder="Enter your full name"
          onChange={handleChange}
        />
        <span>{errs?.fname}</span>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
        <span>{errs?.email}</span>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
        <span>{errs?.password}</span>
        <br />
        <input
          type="password"
          name="repassword"
          placeholder="Enter your re-password"
          onChange={handleChange}
        />
        <span>{errs?.repassword}</span>
        <br />

        <select name="sgender" id="gender" onChange={handleChange}>
          <option value="">Select gender</option>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
        <span>{errs?.sgender}</span>
        <br />
        <input type="checkbox" id="terms" name="terms" onChange={handleCheck} />
        <label htmlFor="terms"> I accept terms and conditions</label>
        <span>{errs?.terms}</span>
        <br />
        <button type="submit">Submit</button>
      </form>

      <table>
        <tr>
          <th>Sr no.</th>
          <th>full name</th>
          <th>email</th>
          <th>password</th>
          <th>Action</th>
        </tr>
        {storeData?.map((item, index) => {
          return (
            <tr key={index}>
              <td>{index}</td>
              <td>{item?.fname}</td>
              <td>{item?.email}</td>
              <td>{item?.password}</td>
              <td>
                <div className="action_btn_container">
                  <button onClick={() => handleDelete(item)}>Delete</button>
                  <button onClick={() => handleOpen(item)}>Update</button>
                </div>
              </td>
            </tr>
          );
        })}
      </table>

      {modalOpen && (
        <Modal>
          <div className="modal_container">
            <button>
              <MdClose />
            </button>

            <div>
              <form onSubmit={(e) => handleUpdateVal(e, selectedStoreVal)}>
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter your full name"
                  onChange={handleChange1}
                  value={selectedStoreVal?.fname}
                />
                <span>{errs?.fname}</span>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange1}
                  value={selectedStoreVal?.email}
                />
                <span>{errs?.email}</span>
                <br />

                <select name="sgender" id="gender" onChange={handleChange1}>
                  <option selected>{selectedStoreVal?.sgender}</option>
                  <option value="">Select gender</option>
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
                <br />
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
