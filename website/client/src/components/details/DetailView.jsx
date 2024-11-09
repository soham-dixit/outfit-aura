import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Grid, styled, CircularProgress, Typography } from "@mui/material"; // Import CircularProgress and Typography
import ActionItem from "./ActionItem";
import ProductDetail from "./ProductDetail";
import axios from "../../axios/axios";
import flaskAxios from "../../axios/flask"

const Component = styled(Box)`
  background: #f2f2f2;
  margin-top: 55px;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: "#ffffff",
  display: "flex",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const RightContainer = styled(Grid)`
  margin-top: 50px;
  & > p {
    margin-top: 10px;
  }
`;

const DetailView = () => {
  const { id } = useParams();
  const [product, setProduct] = React.useState([]);

  const fetchData = async () => {
    await axios
      .get(`/product/product/${id}`)
      .then(async (res) => {
        setProduct(res?.data);
        await axios.post(`frequentData/addToFrequentData`, {
          productId: res?.data?.product_id,
          productName: res?.data?.product_name,
          ...res?.data
        }).then((res) => console.log(res.data.message)).catch((err) => console.log(err));
      }).catch((err) => console.log(err));
    await flaskAxios.get("/content_based_filtering_frequentData_history");
  };

  useEffect(() => {
    fetchData();
  },[id]);

  return (
    <Component>
      {product.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="300px"
        >
          <CircularProgress />
          <Typography variant="body1" color="textSecondary" mt={2}>
            "Fashion is the armor to survive the reality of everyday life." —
            Bill Cunningham
          </Typography>
        </Box>
      ) : (
        <Container container>
          <Grid item lg={4} md={4} sm={8} xs={12}>
            <ActionItem product={product} />
          </Grid>
          <RightContainer item lg={8} md={8} sm={8} xs={12}>
            <ProductDetail product={product} />
          </RightContainer>
        </Container>
      )}
    </Component>
  );
};

export default DetailView;
