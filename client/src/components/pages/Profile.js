import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../contexts/userContext";
import Default from "../pictures/Default.svg";

function Profile() {
  const [profile, setProfile] = useState([]);
  const [trans, setTrans] = useState([]);
  const [state, dispatch] = useContext(UserContext);
  const loadProfile = async (id) => {
    try {
      const response = await API.get(`/users/` + id);
      setProfile(response.data.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  const loadTrans = async () => {
    try {
      const response = await API.get(`/transactions`);
      console.log(response);
      setTrans(response.data.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadTrans();
  }, []);

  useEffect(() => {
    loadProfile();
  }, []);
  console.log(trans);

  return (
    <div className="container-profile">
      <div className="profile">
        <h1>My Profile</h1>
        <div className="profile-detail">
          <div className="profile-img">
            <img src={Default} alt="#" />
          </div>

          <div className="profile-content">
            <h6>Full Name</h6>
            <div>
              <p>{state.user.fullName}</p>
            </div>
            <h6>Email</h6>

            <p>{state.user.email}</p>

            <h6>Phone</h6>

            <p>{state.user.phone}</p>
            {/* <h3>My Films</h3>
            films goes here */}
          </div>
        </div>
        <Link to={`/updateprofile/${state.user.id}`}>
          <button className="hero-link">Edit Profile</button>
        </Link>
      </div>
      <div className="profile">
        <h1>History Transaction</h1>

        {trans.map((trx) => {
          console.log(trx);
          return (
            <div className="history-trans">
              <h5>{trx.status}</h5>
              <h6></h6>
              <div className="history-price">
                <div>
                  <h6>Total Price</h6>
                </div>
                <div>
                  <h6>status</h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;
