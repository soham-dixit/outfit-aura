import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { Box, Typography, Button, Divider, styled } from "@mui/material";
import CountDown from "react-countdown";

import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Component = styled(Box)`
  margin-top: 10px;
  background: #ffffff;
`;
const Deal = styled(Box)`
  padding: 15px 20px;
  display: flex;
`;

const Timer = styled(Box)`
  display: flex;
  margin-left: 10px;
  align-items: center;
  color: #7f7f7f;
`;

const DealText = styled(Typography)`
  font-size: 16px;
  font-weight: 600;
  margin-right: 25px;
  line-height: 32px;
`;

const ViewAllButton = styled(Button)`
  margin-left: auto;
  background-color: #0071dc;
  border-radius: 2px;
  font-size: 13px;
  font-weight: 600;
`;

const Image = styled("img")({
  width: "auto",
  height: 150,
});

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
`;

const Slide = ({
  products,
  title,
  timer,
  recommended = false,
  more = false,
}) => {
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <Box variant="span">
        {" "}
        {hours} : {minutes} : {seconds} left{" "}
      </Box>
    );
  };

  return (
    <Component>
      <Deal>
        <DealText> {title} </DealText>
        {timer && (
          <Timer>
            <img src={timerURL} alt="timer" style={{ width: 24 }} />
            <CountDown date={Date.now() + 5.04e7} renderer={renderer} />
          </Timer>
        )}

        {/* <ViewAllButton variant="contained">View All</ViewAllButton> */}
      </Deal>
      <Divider />

      {products?.length == 0 ? (
        <div>Loading...</div>
      ) : (
        <Carousel
          swipeable={false}
          draggable={false}
          // infinite={true}
          autoPlay={true}
          autoPlaySpeed={4000}
          keyBoardControl={true}
          responsive={responsive}
          centerMode={true}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
        >
          {products?.map((product, i) => (
            <>
              {recommended ? (
                <Link
                  to={`product/${product?.productId}`}
                  style={{ textDecoration: "none" }}
                  key={i}
                >
                  <Box textAlign="center" style={{ padding: "25px 15px" }}>
                    <Image
                      src={`http://localhost:8000/product_images/images/${product.productId}.jpg`}
                      alt="product"
                    />
                    <Text style={{ fontWeight: 600, color: "#212121" }}>
                      {" "}
                      {product?.product_name}{" "}
                    </Text>
                    <Text style={{ color: "green" }}> ₹{product?.price} </Text>
                    <Text style={{ color: "#212121", opacity: ".6" }}>
                      {" "}
                      {product?.category}{" "}
                    </Text>
                  </Box>
                </Link>
              ) : more ? (
                <Link
                  to={`product/${product?.product_id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Box textAlign="center" style={{ padding: "25px 15px" }}>
                    <Image
                      src={`http://localhost:8000/product_images/images/${product.product_id}.jpg`}
                      alt="product"
                    />
                    <Text style={{ fontWeight: 600, color: "#212121" }}>
                      {" "}
                      {product?.product_name}{" "}
                    </Text>
                    <Text style={{ color: "green" }}> ₹{product?.price} </Text>
                    <Text style={{ color: "#212121", opacity: ".6" }}>
                      {" "}
                      {product?.category}{" "}
                    </Text>
                  </Box>
                </Link>
              ) : (
                <Box textAlign="center" style={{ padding: "25px 15px" }}>
                  <Image
                    src={product?.image_url || product?.imageUrl}
                    alt="product"
                  />
                  <Text style={{ fontWeight: 600, color: "#212121" }}>
                    {product.festival ? product.festival : " "}     
                    {product?.product_name}{" "}
                  </Text>
                  <Text style={{ color: "green" }}> {product?.price} </Text>
                  <Text style={{ color: "#212121", opacity: ".6" }}>
                    {" "}
                    {product?.category}{" "}
                  </Text>
                </Box>
              )}
            </>
          ))}
        </Carousel>
      )}
    </Component>
  );
};

export default Slide;
