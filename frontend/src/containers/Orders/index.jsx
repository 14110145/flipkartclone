import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateOrder } from "../../actions/order.actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import "./style.css";

const Orders = () => {
  const order = useSelector((state) => state.order);
  const [type, setType] = useState("");
  const dispatch = useDispatch();

  const onOrderUpdate = (orderId) => {
    const payload = {
      orderId,
      type,
    };
    dispatch(updateOrder(payload));
  };
  return (
    <Layout sidebar>
      {order.orders.map((orderItem, index) => (
        <Card key={index} headerLeft={orderItem._id}>
          <div
            style={{
              boxSizing: "border-box",
              padding: "100px",
              display: "flex",
            }}
          >
            <div className="orderTrack">
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Ordered</div>
                  <div className="date">Fri, 2020</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Packed</div>
                  <div className="date">Fri, 2020</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Shipped</div>
                  <div className="date">Fri, 2020</div>
                </div>
              </div>
              <div className="orderStatus">
                <div className="point"></div>
                <div className="orderInfo">
                  <div className="status">Delivered</div>
                  <div className="date">Fri, 2020</div>
                </div>
              </div>
            </div>
            {/* select input to apply order */}
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <select onChange={(e) => setType(e.target.value)}>
                <option value="">Select status</option>
                {orderItem.orderStatus.map((status) => {
                  return !status.isCompleted ? (
                    <>
                      <option key={status.type} value={status.type}>
                        {status.type}
                      </option>
                    </>
                  ) : null;
                })}
              </select>
            </div>
            <div
              style={{
                padding: "0 50px",
                boxSizing: "border-box",
              }}
            >
              <button onClick={() => onOrderUpdate(orderItem._id)}>confirm</button>
            </div>
          </div>
        </Card>
      ))}
    </Layout>
  );
};

export default Orders;
