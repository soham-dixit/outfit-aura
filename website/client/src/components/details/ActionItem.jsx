import { Box, Button, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../redux/actions/cartActions";
import axios from "../../axios/axios";
import flaskAxios from "../../axios/flask";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 0 0 80px", // Adjust padding here
  paddingLeft: "20px", // Add left padding for space from the border
  paddingRight: "20px", // Optional: Add right padding if needed
  paddingTop: "20px", // Add top padding for space from the top border
  paddingBottom: "20px", // Optional: Add bottom padding for space from the bottom border
  [theme.breakpoints.down("lg")]: {
    padding: "20px 40px",
  },
}));

const Image = styled("img")({
  padding: "15px 20px",
  width: "95%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  width: "46%",
  height: "50px",
  borderRadius: "2px",
  [theme.breakpoints.down("lg")]: {
    width: "44%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "46%",
  },
}));

const ActionItem = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(()=>{
  //     console.log("first: ", product)
  // },[product])

  const { product_id } = product;

  const addItemToCart = async () => {
    const { _id, imageUrl, product_display_name, __v, ...restProducts } =
      product;
    const data = {
      productId: product_id,
      productName: restProducts.product_name,
      ...restProducts,
    };
    await axios
      .post("/cartHistory/addToCartHistory", data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    dispatch(addToCart(product_id, 1));
    navigate("/cart");
    await flaskAxios.get("/content_based_filtering_cart_history");
  };

  return (
    <LeftContainer>
      <Box
        style={{
          padding: "15px 20px",
          border: "1px solid #f0f0f0",
          width: "90%",
        }}
      >
        <Image
          src={`http://localhost:8000/product_images/images/${product_id}.jpg`}
          alt="product-img"
        />
      </Box>
      <StyledButton
        variant="contained"
        onClick={() => addItemToCart()}
        style={{ marginRight: 10.5, background: "#73EC8B", color:'#000000', fontWeight: "bold" }}
      >
        <Cart /> Add to Cart
      </StyledButton>
      <StyledButton
        variant="contained"
        style={{ marginRight: 10, background: "#73EC8B", color:'#000000', fontWeight: "bold"}}
      >
        <Flash /> Buy Now
      </StyledButton>
    </LeftContainer>
  );
};

export default ActionItem;
