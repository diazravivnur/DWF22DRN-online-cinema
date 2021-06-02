import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "../../config/api";
import { Table } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import DropdownAction from "../Navbar/DropdownAction";

const TransactionList = () => {
  const [trans, setTrans] = useState([]);
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

  console.log(trans);
  return (
    <div>
      <div className="table-container">
        <h3>Incoming Transaction </h3>

        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Users</th>
                <th>Bukti Transfer</th>
                <th>Film</th>

                <th>Order Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {trans.map((trx) => {
                console.log("trx", trx);
                return (
                  <tr>
                    <td>{trx.id}</td>
                    <td>{trx.user.fullName}</td>
                    <td>{trx.transferProof}</td>
                    <td>{trx.film.tittle}</td>
                    <td>{trx.orderDate}</td>
                    <td>{trx.status}</td>
                    <td>
                      <DropdownAction id={trx?.id}></DropdownAction>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
