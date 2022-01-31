import React, { useState } from "react";
import getUserToken from "../../hooks/getUserToken";
import { saveNewUser } from "../../api";
import AppModal from "../modal/modal";
import "./addUserForm.styles.css";

const AddUserForm = ({ handleAddUser }) => {
  const formDefaultState = {
    firstName: "",
    lastName: "",
    address: "",
    ssn: "",
  };
  const [userFormData, setUserFormData] = useState(formDefaultState);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const userToken = getUserToken();

  const handleUserInput = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const regex = /^\d{3}-\d{2}-\d{4}$/;
    const isSSNValid = regex.test(userFormData.ssn) === true;
    const areNameLastnameAddressValid =
      userFormData.firstName.trim().length > 1 &&
      userFormData.lastName.trim().length > 1 &&
      userFormData.address.trim().length > 1;
    console.log("sssn: ", isSSNValid, " //// ", areNameLastnameAddressValid);
    return isSSNValid && areNameLastnameAddressValid;
  };

  const resetForm = () => {
    setUserFormData(formDefaultState);
  };

  const submitUserData = () => {
    const newUser = {
      username: "sarah",
      password: "connor",
      ...userFormData,
    };

    saveNewUser(newUser, userToken).then((response) => {
      const { data, hasError, isSuccess, errorMsg } = response;

      if (hasError) {
        setShowModal(true);
        setErrorMsg(errorMsg);
      }
      if (isSuccess) {
        handleAddUser(data);
        resetForm();
      }
    });
  };

  return (
    <form className="addUserForm">
      <AppModal
        isOpen={showModal}
        handleClose={() => setShowModal(false)}
        message={errorMsg}
      />
      <label forhtml="fname">First name:</label>
      <input
        type="text"
        id="firstName"
        name="firstName"
        value={userFormData.firstName}
        onChange={(e) => {
          handleUserInput(e);
        }}
      />
      <label forhtml="lname">Last name:</label>
      <input
        type="text"
        id="lastName"
        name="lastName"
        value={userFormData.lastName}
        onChange={(e) => {
          handleUserInput(e);
        }}
      />
      <label forhtml="lname">Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={userFormData.address}
        onChange={(e) => {
          handleUserInput(e);
        }}
      />
      <label forhtml="lname">SSN</label>
      <input
        type="text"
        id="SSN"
        name="ssn"
        value={userFormData.ssn}
        onChange={(e) => {
          handleUserInput(e);
        }}
      />
      <div className="form-footer">
        <input
          className="btn add"
          type="submit"
          value="submit"
          disabled={!validateForm()}
          onClick={(e) => {
            e.preventDefault();
            submitUserData();
          }}
        />
        <input
          className="btn reset"
          type="submit"
          value="reset"
          onClick={() => resetForm()}
        />
      </div>
    </form>
  );
};

export default AddUserForm;
