import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUser,
  setUpdateStoreData,
  updateUser,
} from "../../../features/userSlice";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/Modal";
import { MdClose } from "react-icons/md";

export default function EmpData() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userData, loading, updateStoreData } = useSelector(
    (state) => state.userApp
  );
  const [dataLength, setDataLength] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVal,setSelectedVal] = useState({})
  const [inputVal, setInputVal] = useState({});

  useEffect(() => {
    dispatch(getUser()).then((res) => {
      // console.log('res: ', res.payload);
      // setDataLength(res.payload.length)
    });
  }, []);

  // useEffect(() => {
  //   if (userData?.length === 0) {
  //     console.log('userData: ', userData?.length);
  //     navigate("/Form");
  //   }
  // });

  function handleDelete(item) {
    let id = item?.id;
    dispatch(deleteUser(id));
  }

  function handleChange1(e) {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  }

  function updateModal(item) {
    setOpenModal(true);
    // dispatch(setUpdateStoreData(item));
    setInputVal(item)
  }
  function handleUpdateVal(e) {
    e.preventDefault();
    // console.log(inputVal, "");
    let fname = inputVal?.fname
    let email = inputVal?.email
    let id = inputVal?.id
    dispatch(updateUser(inputVal))
    .then((res) => {
      console.log('res: ', res);

    })
    setOpenModal(false)


  }


  if (loading) {
    return <p>loading</p>;
  }
  return (
    <div>
      {userData?.map((item, index) => {
        return (
          <div
            className="card my-2 mx-auto"
            style={{ width: "18rem" }}
            key={index}
          >
            <div className="card-body">
              <h5 className="card-title">{item?.fname}</h5>
              <p className="card-text">{item?.email}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">password : {item?.password}</li>
              <li className="list-group-item">
                phone number : {item?.pnumber}
              </li>
              <li className="list-group-item">id : {item?.id}</li>
            </ul>
            <div className="card-body d-flex gx-2">
              <button
                className="btn btn-danger mx-3"
                onClick={() => handleDelete(item)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => updateModal(item)}
              >
                Update
              </button>
            </div>
          </div>
        );
      })}

      {openModal && (
        <Modal>
          <div className="modal_container">
            <button>
              <MdClose />
            </button>

            <div>
              <form onSubmit={(e) => handleUpdateVal(e)}>
                <input
                  type="text"
                  name="fname"
                  placeholder="Enter your full name"
                  onChange={handleChange1}
                  value={inputVal?.fname}
                />

                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChange1}
                  value={inputVal?.email}
                />
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
