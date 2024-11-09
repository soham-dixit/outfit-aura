import { useEffect } from "react";

import React from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import { Box, styled, Button } from "@mui/material";

import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";
import { Link } from "react-router-dom";
import axios from "../../axios/axios";
import flask from "../../axios/flask";

const Component = styled(Box)`
  padding: 10px;
  // background: #dce0e5;
  background: #f2f2f2;
`;

const ButtonContainer = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding: 0 5px;
  margin-bottom: 20px;
`;

const Home = () => {
  const { products } = useSelector((state) => state.getProducts);
  const { cartItems } = useSelector((state) => state.cart);

  const [genCartProducts, setGenCartProducts] = React.useState([]);
  const [genCartProductsFestival, setGenCartProductsFestival] = React.useState([]);
  const [recommendedCartProducts, setRecommendedCartProducts] = React.useState([]);
  const [genFrequentProducts, setGenFrequentProducts] = React.useState([]);
  const [recommendedFrequentProducts, setRecommendedFrequentProducts] =
    React.useState([]);
  const [genPurchaseProducts, setGenPurchaseProducts] = React.useState([]);
  const [recommendedPurchaseProducts, setRecommendedPurchaseProducts] =
    React.useState([]);
  const [genBrowsingProducts, setGenBrowsingProducts] = React.useState([]);
  const [recommendedBrowsingProducts, setRecommendedBrowsingProducts] =
    React.useState([]);
  const [genRegionalPreferences, setGenRegionalPreferences] = React.useState([]);
  
  const getFestivalImages = async () => {
  try {
    const response = await flask.get('/get_festival_images', {
      withCredentials: true, // This allows cookies to be sent with the request
    });
    setGenCartProductsFestival(response.data.data);// Assuming `data` holds the relevant festival information
  } catch (error) {
    console.error("Error fetching festival images", error);
  }
  };
  
    const getRegionalImages = async () => {
  try {
    const response = await flask.get('/get_location_image', {
      withCredentials: true, // This allows cookies to be sent with the request
    });
    setGenRegionalPreferences(response.data.data);// Assuming `data` holds the relevant festival information
  } catch (error) {
    console.error("Error fetching location images", error);
  }
};

  const getCartProducts = async () => {
    await axios
      .get("/cartHistory/getBothData")
      .then((res) => {
        console.log("Cart Both Data: ", res.data);
        setGenCartProducts(res.data.generatedData);
        setRecommendedCartProducts(res.data.recommendedData);
      })
      .catch((err) => console.log(err));
  };

  const getFrequentData = async () => {
    await axios
      .get("/frequentData/getBothData")
      .then((res) => {
        console.log("Frequent Both Data: ", res.data);
        setGenFrequentProducts(res.data.generatedData);
        setRecommendedFrequentProducts(res.data.recommendedData);
      })
      .catch((err) => console.log(err));
  };

  const getPurchaseData = async () => {
    await axios
      .get("/purchasingHistory/getBothData")
      .then((res) => {
        console.log("Purchase Both Data: ", res.data);
        setGenPurchaseProducts(res.data.generatedData);
        setRecommendedPurchaseProducts(res.data.recommendedData);
      })
      .catch((err) => console.log(err));
  };

  const getBrowsingData = async () => {
    await axios
      .get("/browsingHistory/getBothData")
      .then((res) => {
        console.log("Browsing Both Data: ", res.data);
        setGenBrowsingProducts(res.data.generatedData);
        setRecommendedBrowsingProducts(res.data.recommendedData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getFestivalImages();
    getRegionalImages();
    getCartProducts();
    getFrequentData();
    getPurchaseData();
    getBrowsingData();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Home: ", cartItems);
  }, [cartItems]);

  return (
    <>
      {/* <NavBar /> */}
      <Component>
        {/* <Banner /> */}

        <ButtonContainer>
          {/* Add your buttons here */}
          <Link to="/">
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: '#73EC8B', color: 'black' }}
        >
          Ask AI 🤖
        </Button>
      </Link>
      <Link to="/home">
        <Button
          variant="contained"
          size="large"
          style={{ backgroundColor: '#73EC8B', color: 'black' }}
        >
          Explore 🔍
        </Button>
      </Link>
        </ButtonContainer>

        {/* <MidSlide products={products} title='Deal of the Day' timer={true}  /> */}

        {/* <MidSection /> */}

        <Slide
          products={genCartProductsFestival}
          title="Generated Outfits based on Upcoming Festivals"
          timer={false}
        />
        <Slide
          products={genRegionalPreferences}
          title="Generated Outfits based on Regional Style Preferences"
          timer={false}
        />
        <Slide
          products={genCartProducts}
          title="Generated Outfits based on your Cart History"
          timer={false}
        />
        <Slide
          products={recommendedCartProducts}
          recommended={true}
          title="Available Products as per GenAI from your Cart History"
          timer={false}
        />
        <Slide
          products={genFrequentProducts}
          title="Generated Outfits based on Frequently Viewed Products"
          timer={false}
        />
        <Slide
          products={recommendedFrequentProducts}
          recommended={true}
          title="Available Products as per GenAI from Frequently Viewed Items"
          timer={false}
        />
        <Slide
          products={genPurchaseProducts}
          title="Generated Outfits based on your Previous Orders"
          timer={false}
        />
        <Slide
          products={recommendedPurchaseProducts}
          recommended={true}
          title="Available Products as per GenAI from your Previous Orders"
          timer={false}
        />
        <Slide
          products={genBrowsingProducts}
          title="Generated Outfits based on your Browsing History"
          timer={false}
        />
        <Slide
          products={recommendedBrowsingProducts}
          recommended={true}
          title="Available Products as per GenAI from your Browsing History"
          timer={false}
        />
        <Slide
          products={products}
          more={true}
          title="You may also Like..."
          timer={false}
        />
      </Component>
    </>
  );
};

export default Home;
