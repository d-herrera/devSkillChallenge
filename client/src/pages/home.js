import React, { useEffect, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import useGetUserToken from "../hooks/getUserToken";
import { getUserList } from "../api/index";
import AddUserForm from "../components/form/addUserForm";
import UserList from "../components/list/userList";
import "./home.styles.css";
const Home = (props) => {
  const [userList, setUserList] = useState([]);
  const userToken = useGetUserToken();

  useEffect(() => {
    getUserList(userToken).then((list) => setUserList(list));
  }, [userToken]);

  const handleOnIdle = async (event) => {
    console.log("user is idle", event);
    getUserList(userToken).then((list) => setUserList(list));
    reset();
  };

  const handleOnActive = async (event) => {
    console.log("user is active");
  };

  const handleAddUser = (newUser) => {
    console.log("new User added locally: ", newUser);
    setUserList(newUser);
  };

  const { reset } = useIdleTimer({
    timeout: 120000,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    debounce: 500,
  });

  const isLoading = !userList || !userList.length;

  return (
    <div className="app">
      <AddUserForm handleAddUser={handleAddUser} />
      {isLoading ? <p>Loading...</p> : <UserList list={userList} />}
    </div>
  );
};

export default Home;
