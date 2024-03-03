import React, { useState } from "react";
import "./drive.css";
import OutsideClickHandler from "react-outside-click-handler";
import photo from "../assets/react.svg";

export default function Drive() {
  const [folName, setFolName] = useState({ folder_name: "" });
  const [showInput, setShowInput] = useState(false);

  function handleChange(e) {
    setFolName({ ...folName, [e.target.name]: e.target.value });
  }

  function handleActiveInput() {
    setShowInput(true);
  }

  return (
    <div style={{ display: "flex" }}>
      <button className="plus_btn">Plus</button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={photo} alt="photo" width={50} />

        {showInput ? (
          <OutsideClickHandler
            onOutsideClick={() => {
              setShowInput(false);
            }}
          >
            <input
              type="text"
              name="folder_name"
              placeholder="enter folder name"
              onChange={handleChange}
              value={folName.folder_name}
            />
          </OutsideClickHandler>
        ) : (
          <p onClick={handleActiveInput}>
            {folName?.folder_name || "Folder name"}
          </p>
        )}
      </div>
    </div>
  );
}
