import React, { useState, useEffect } from "react";
import {
  InputBase,
  Box,
  styled,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../redux/actions/productActions";

import { Link } from "react-router-dom";
import axios from "../../axios/axios";

const SearchContainer = styled(Box)`
  border-radius: 20px; // Changed this line to round the borders
  margin-left: 10px;
  width: 38%;
  background-color: #fff;
  display: flex;
  position: relative;
`;

const InputSearchBase = styled(InputBase)`
  padding-left: 20px;
  width: 100%;
  font-size: unset;
`;

const SearchIconWrapper = styled(Box)`
  color: blue;
  padding: 5px;
  display: flex;
  margin-left: auto;
`;

const ListWrapper = styled(List)`
  position: absolute;
  background: #ffffff;
  color: #000;
  margin-top: 36px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 0 0 20px 20px; // Added rounded corners to the bottom of the list
`;

const Search = () => {
  const [text, setText] = useState("");

  const { products } = useSelector((state) => state.getProducts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const getText = (text) => {
    setText(text);
  };

  const handleClick = async () => {
    setText("");
    try {
      const productToInsert = products.find((product) =>
        product.product_display_name.toLowerCase().includes(text.toLowerCase())
      );

      if (productToInsert) {
        await axios.post("/browsingHistory/addToBrowsing", {
          productId: productToInsert.product_id,
          productName: productToInsert.product_display_name,
          ...productToInsert,
        });
        console.log(productToInsert);
      }
    } catch (error) {
      console.log("Error adding to browsing history:", error);
    }
  };

  return (
    <SearchContainer>
      <InputSearchBase
        placeholder="Search for products, brands and more in FashionGen"
        onChange={(e) => getText(e.target.value)}
        value={text}
      />
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      {text && (
        <ListWrapper>
          {products
            .filter((product) =>
              product.product_display_name
                .toLowerCase()
                .includes(text.toLowerCase())
            )
            .map((product) => (
              <ListItem
                key={product.product_id}
                button
                component={Link}
                to={`/home/product/${product.product_id}`}
                onClick={handleClick}
              >
                <ListItemAvatar>
                  <Avatar
                    alt={product.product_display_name}
                    src={product.imageUrl}
                  />
                </ListItemAvatar>
                <ListItemText primary={product.product_display_name} />
              </ListItem>
            ))}
        </ListWrapper>
      )}
    </SearchContainer>
  );
};

export default Search;
