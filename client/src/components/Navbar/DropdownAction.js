import IconDropdownAction from "../../components/pictures/IconDropdownAction.svg";
import { NavDropdown } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../config/api";

const DropdownAction = ({ id }) => {
  const handleApprove = async () => {
    try {
      const response = await API.patch(`/trans/approve/${id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecline = async () => {
    try {
      const response = await API.patch(`/trans/decline/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavDropdown
        title={
          <div>
            <img src={IconDropdownAction} alt="dropdownAction"></img>
          </div>
        }
      >
        <li>
          <NavDropdown.Item>
            <div
              style={{
                display: "flex",
                color: "green",
              }}
              onClick={handleApprove}
            >
              <p>Approve</p>
            </div>
          </NavDropdown.Item>
        </li>
        <li>
          <NavDropdown.Item>
            <div
              style={{
                display: "flex",
                color: "red",
              }}
              onClick={handleDecline}
            >
              <p>Decline</p>
            </div>
          </NavDropdown.Item>
        </li>
      </NavDropdown>
    </div>
  );
};

export default DropdownAction;
