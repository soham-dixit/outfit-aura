import React, { useState, useEffect } from "react";
import { Box, Typography, styled, Paper } from "@mui/material";
import axios from "../../axios/axios";

const Component = styled(Box)`
  padding: 30px 135px;
`;

const OrderCard = styled(Paper)`
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* Align items to the top */
`;

const OrderHeader = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const OrderDetails = styled(Box)`
  margin-top: 10px;
`;

const ProductList = styled(Box)`
  margin-top: 15px;
`;

const ProductImage = styled("img")({
  width: "110px" /* Increase the width */,
  height: "100px" /* Increase the height */,
  objectFit: "cover",
});

// const Orders = () => {
//   const [orders, setOrders] = useState([]);

//   const user = JSON.parse(localStorage.getItem('user'));
//   const userId = user.userId;

//   useEffect(() => {
//     // Fetch orders data from API
//     axios.get(`purchasingHistory/getPurchasing/${userId}`)
//       .then(response => {
//         setOrders(response?.data?.data);
//         console.log("Orders: ", response.data)
//       })
//       .catch(error => {
//         console.error('Error fetching orders:', error);
//       });
//   }, []);

//     const getProductName = async (productId) => {
//         await axios.get(`/product/product/${productId}`).then((res) => {
//             console.log("Product name: ", res.data.product_display_name);
//             return res.data.product_display_name;
//         }).catch((err) => console.log(err));
//     }

//   return (
//     <Component>
//       <Typography variant="h5" gutterBottom>
//         My Orders
//       </Typography>
//       {orders.map(order => (
//         <OrderCard key={order.id}>
//           <ProductList>
//             <Typography variant="body2" color="textSecondary">
//               Product: {getProductName(order.productId)}
//             </Typography>
//           </ProductList>
//           <Box style={{ flex: 1, textAlign: 'right' }}>
//             <ProductImage
//               src={`https://fashionkart.blob.core.windows.net/test/${order.productId}.jpg`}
//               alt={order.productName}
//             />
//             <OrderDetails>
//               <Typography variant="subtitle1">
//                 Total Amount: ₹{order.price}
//               </Typography>
//             </OrderDetails>
//           </Box>
//         </OrderCard>
//       ))}
//       {orders.length === 0 && (
//         <Typography variant="body1">
//           You haven't placed any orders yet.
//         </Typography>
//       )}
//     </Component>
//   );
// };

// export default Orders;

// ... (imports and styled components)

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user.userId;

  useEffect(() => {
    // Fetch orders data from API
    axios
      .get(`purchasingHistory/getPurchasing/${userId}`)
      .then((response) => {
        const fetchedOrders = response?.data?.data;

        // Fetch product names for all orders
        Promise.all(
          fetchedOrders.map((order) => getProductName(order.productId))
        )
          .then((productNames) => {
            const ordersWithProductNames = fetchedOrders.map(
              (order, index) => ({
                ...order,
                productName: productNames[index],
              })
            );
            setOrders(ordersWithProductNames);
          })
          .catch((error) => {
            console.error("Error fetching product names:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  const getProductName = async (productId) => {
    try {
      const response = await axios.get(`/product/product/${productId}`);
      console.log("Product name: ", response.data.product_display_name);
      return response.data.product_display_name;
    } catch (error) {
      console.log(error);
      return "Unknown Product"; // Return a default name in case of an error
    }
  };

  return (
    <Component>
      <Typography variant="h5" gutterBottom>
        My Orders
      </Typography>
      {orders.map((order) => (
        <OrderCard key={order.id}>
          <ProductList>
            <OrderHeader variant="body2">Order ID: {order.id}</OrderHeader>
            <Typography
              variant="body1"
              color="textprimary"
              style={{ marginBottom: 10 }}
            >
              {order.productName}
            </Typography>
            <Box>
              <Typography variant="body2" color="textSecondary">
                Category: {order.category}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Color: {order.color}
              </Typography>
            </Box>
          </ProductList>
          <Box style={{ flex: 1, textAlign: "right" }}>
            <ProductImage
              src={`http://localhost:8000/product_images/images/${order.productId}.jpg`}
              alt={order.productName}
            />
            <OrderDetails>
              <Typography variant="subtitle1">
                Total Amount: ₹{order.price}
              </Typography>
            </OrderDetails>
          </Box>
        </OrderCard>
      ))}
      {orders.length === 0 && (
        <Typography variant="body1">
          You haven't placed any orders yet.
        </Typography>
      )}
    </Component>
  );
};

export default Orders;
