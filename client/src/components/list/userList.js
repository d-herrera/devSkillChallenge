import "./userList.styles.css";

const UserList = ({ list }) => {
  return (
    <table>
      <tbody>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>SSN</th>
        </tr>
        {list?.map((user, index) => {
          const { firstName, lastName, address, ssn } = user;
          return (
            <tr>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{address}</td>
              <td>{ssn}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserList;
