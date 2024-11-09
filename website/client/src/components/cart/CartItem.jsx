import { Box, Typography, styled, Button } from "@mui/material";
import React from "react";
import { removeFromCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";
import { addEllipsis } from "../../utils/common-utils";
import ButtonGroup from "./ButtonGroup";
import fassured from './fass.svg'

const Component = styled(Box)`
  border-top: 1px solid #f0f0f0;
  display: flex;
  background: #fff;
`;

const LeftComponent = styled(Box)`
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const SmallText = styled(Typography)`
  color: #878787;
  font-size: 14px;
  margin-top: 10px;
`;

const Remove = styled(Button)`
  margin-top: 20px;
  font-size: 16px;
  color: #000;
  font-weight: 600;
`;

const CartItem = ({ item }) => {
  // const fassured ="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png";

  const dispatch = useDispatch();

  const removeItemFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <Component>
      <LeftComponent>
        <img
          src={`http://localhost:8000/product_images/images/${item.product_id}.jpg`}
          alt="product"
          style={{ height: 110, width: 110 }}
        />
        <ButtonGroup />
      </LeftComponent>

      <Box style={{ margin: 20 }}>
        <Typography>{addEllipsis(item.product_display_name)}</Typography>
        <SmallText>
          <Box display="flex" alignItems="center">
                    Seller:RetailNet
                    <Box component="span" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={fassured} alt="fassured" style={{ width: 25, marginLeft: 15 }} />
                    </Box>
                </Box>
        </SmallText>
        <Typography style={{ margin: "20px 0" }}>
          <Box component="span" style={{ fontWeight: 600, fontSize: 18 }}>
            ₹{item.price}
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#878787" }}>
            <strike>₹{item.price}</strike>
          </Box>
          &nbsp;&nbsp;&nbsp;
          <Box component="span" style={{ color: "#388E3C" }}>
            {item.price}
          </Box>
        </Typography>
        <Remove onClick={() => removeItemFromCart(item.product_id)}>
          Remove
        </Remove>
      </Box>
    </Component>
  );
};

export default CartItem;
