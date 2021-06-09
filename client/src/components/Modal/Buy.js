import React, { useContext, useState, useEffect } from "react";
import { API } from "../../config/api";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";

import { UserContext } from "../../contexts/userContext";

import Transferpayment from "../../components/pictures/Transferpayment.svg";
import "bootstrap/dist/css/bootstrap.min.css";

import FormModal from "../Modal/Modal";

function BuyModal({ toggle, filmid, title, price, show, handleClose }) {
  const params = useParams();
  const { id } = params;
  const [preview, setPreview] = useState();
  const [state, dispatch] = useContext(UserContext);

  const [showPopUp, setShowPopUp] = useState(false);

  const handleShowPopUp = () => setShowPopUp(true);
  // const handleClosePopUp = () => setShowPopUp(false);

  const [form, setForm] = useState({
    filmid: "",

    transferProof: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();

      formData.append("filmid", filmid);
      formData.append("transferProof", form.transferProof[0]);

      await API.post(`/transaction`, formData, config);

      handleClose();
      handleShowPopUp();
    } catch (error) {
      console.log(error);
    }
  };

  if (!show) return null;
  return (
    <>
      <div className="modal-content" onClick={handleClose}></div>
      <div className="modal-buy">
        <div className="header">
          <h3>Cinema Online : </h3>
        </div>
        <h3>{title}</h3>
        <div className="total-payment">
          <h4> Total : </h4>
          <div className="total-payment-number">
            <h4> Rp. {price}</h4>
          </div>
        </div>
        <div className="title-modal1">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="form-modal1">
              <div
                className="img-proof"
                style={{
                  marginBottom: "20px",
                }}
              >
                <input
                  className="input-modal1"
                  type="file"
                  id="add-thumb"
                  name="transferProof"
                  onChange={(e) => onChange(e)}
                  hidden
                />
                <div className="attach-note">
                  <label className="hero-link" for="add-thumb" id="label-thumb">
                    Attach Payment
                    <img alt="icon payment" src={Transferpayment} />
                  </label>

                  <div className="noteBuyModal">
                    <p>*transfers can be made to cinema accounts</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              style={{ textAlign: "center" }}
              className="pay-hero-link"
              onClick={toggle}
            >
              Pay
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default BuyModal;
