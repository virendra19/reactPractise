import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "../../components/modal";

export default function ReadData() {
  const [storeData, setStoreData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({});

  const getData = async () => {
    try {
      let data = await axios.get(
        "https://65ae80dc1dfbae409a74fab0.mockapi.io/formData1"
      );
      setStoreData(data?.data);
    } catch (error) {
      console.error("error: ", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function handleDelete(item) {
    if (item) {
      try {
        let deleteData = axios
          .delete(
            `https://65ae80dc1dfbae409a74fab0.mockapi.io/formData1/${item?.id}`
          )
          .then((res) => {
            if (res?.status === 200) {
              alert("Deleted Successfully");
              let a = storeData?.filter(
                (elems) => elems?.fname !== item?.fname
              );
              setStoreData(a);
            }
          });
      } catch (error) {
        console.error(error);
      }
    }
  }

  function handleChange(e) {
    setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
  }

  function handleUpdateModal(item) {
    setOpenModal(true);
    setUpdateForm(item);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let response = await axios
        .put(
          `https://65ae80dc1dfbae409a74fab0.mockapi.io/formData1/${updateForm?.id}`,
          {
            fname: updateForm?.fname,
            email: updateForm?.email,
            password: updateForm?.password,
            gender: updateForm?.gender,
          }
        )
        .then((res) => {
          if (res?.status === 200) {
            let showData = storeData?.map((item) =>
              item?.id === updateForm?.id ? updateForm : item
            );
            setStoreData(showData);
            setOpenModal(false);
          }
        });
    } catch (error) {
      console.error("error: ", error);
    }
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>fname</th>
            <th>email</th>
            <th>password</th>
            <th>gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {storeData?.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item?.id}</td>
                <td>{item?.fname}</td>
                <td>{item?.email}</td>
                <td>{item?.password}</td>
                <td>{item?.gender}</td>
                <td>
                  <button onClick={() => handleDelete(item)}>Delete</button>
                  <button onClick={() => handleUpdateModal(item)}>
                    Update
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openModal && (
        <Modal>
          <div className="modal_inside_container">
            <div className="modal_close_container">
              <p>Update Form</p>
              <button onClick={() => setOpenModal(false)}>X</button>
            </div>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                onChange={handleChange}
                value={updateForm.fname}
                name="fname"
                placeholder="First Name"
              />
              <br />
              <input
                type="text"
                onChange={handleChange}
                value={updateForm.email}
                name="email"
                placeholder="Email Name"
              />
              <br />
              <input
                type="text"
                onChange={handleChange}
                value={updateForm.password}
                name="passowrd"
                placeholder="Password"
              />
              <br />
              <select name="gender" id="gender" onChange={handleChange}>
                <option value="">{updateForm?.gender}</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
              <br />

              <button type="submit">Submit</button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
