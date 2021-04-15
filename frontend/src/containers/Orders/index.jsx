import React from "react";
import Layout from "../../components/Layout";

const Orders = () => {
  const order = useSelector((state) => state.order);
  return (
    <Layout sidebar>
      Orders
      <Card headerLeft="ORDER_ID">
        <div
          style={{
            boxSizing: "border-box",
            padding: "100px",
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
        </div>
      </Card>
    </Layout>
  );
};

export default Orders;
