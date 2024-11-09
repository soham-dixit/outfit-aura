import React from "react";
import { useState } from "react";

import {
  AppBar,
  Toolbar,
  styled,
  Box,
  Typography,
  IconButton,
  Drawer,
  List,
  Button
} from "@mui/material";

import { Menu } from "@mui/icons-material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import Search from "./Search";
import CustomButtons from "./CustomButtons";

import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import flask from "../../axios/flask";
import img from "./Fashion.png"
import { useSelector } from "react-redux";

const StyledHeader = styled(AppBar)`
  background: #0071dc;
  height: 55px;
`;

const Component = styled(Link)`
  margin-right: 2%;
  line-height: 0;
  text-decoration: none;
  color: inherit;
`;

const SubHeading = styled(Typography)`
  font-size: 10px;
  font-style: italic;
`;

const PlusImg = styled("img")({
  width: 10,
  height: 10,
  marginLeft: 4,
});

const CustomButtonWrapper = styled("span")(({ theme }) => ({
  margin: "0 2% 0 auto",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const logoUrl =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png";
  const subUrl =
    "https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png";

  const [buttonText, setButtonText] = useState('Reverse Product');
  const [buttonColor, setButtonColor] = useState('#E5E4E2'); // default color for the button
  const [txtc, settxtc] = useState('#000000'); // dfefault color for the button

  const [tryOnButtonText, setTryOnButtonText] = useState('Try On');
  const [tryOnbuttonColor, setTryOnButtonColor] = useState('#E5E4E2'); // default color for the button
  const [txtcTry, settxtcTry] = useState('#000000');

  const { user } = useSelector((state) => state.user);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      submitFile(event);
      // submitTryOnFile(event);
      setButtonText('Uploaded');
      setButtonColor('#0a2036ac');
      settxtc('#ffffff')
    }
  };

  const handleTryOnFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // submitFile(event);
      submitTryOnFile(event);
      setTryOnButtonText('Uploaded');
      setTryOnButtonColor('#0a2036ac');
      settxtcTry('#ffffff')
    }
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const submitFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const { data } = await axios.post("/upload", formData);
      console.log(data);
      const id = await flask.post("/get_image_id", {
        imageUrl: `http://localhost:8000/uploads/${data.image.filename}`,
      });

      navigate(`/home/product/${id.data.image_id}`);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const submitTryOnFile = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const userId = user.userId;
    formData.append("userId", userId);
    console.log("userId", userId);
  
    try {
      const { data } = await axios.post("http://localhost:8000/api/v4/try-on", formData);
      console.log(data); // Debug to see if the response is received
      navigate(`/`);
      setLoading(false);
    } catch (error) {
      console.log(error); // Debug to see the error
      setLoading(false);
    }
  };

  const list = () => (
    <Box style={{ width: 250 }} onClick={handleClose}>
      <List>
        <listItem button>
          <CustomButtons />
        </listItem>
      </List>
    </Box>
  );

  return (
    <StyledHeader position="fixed" style={{backgroundColor:'#15B392'}}>
      <Toolbar style={{ minHeight: 55 }}>
        <MenuButton aria-label="delete" color="inherit" onClick={handleOpen}>
          <Menu />
        </MenuButton>

        <Drawer open={open} onClose={handleClose}>
          {list()}
        </Drawer>

        <Component to="/">
          {/* <img src={img} alt="logo" style={{ width: 75 }} /> */}
          {/* <Box style={{ display: "flex" }}>
            <SubHeading>
              Explore{" "}
              <Box component="span" style={{ color: "#FFE500" }}>
                Plus
              </Box>{" "}
            </SubHeading>
            <PlusImg src={subUrl} alt="subLogo" />
          </Box> */}
          <Typography style={{
            fontWeight: 'bold',
            fontSize: '24px',
            color: 'inherit',
            transition: 'color 0.3s ease',
          }}
            onMouseOver={(e) => e.currentTarget.style.color = '#267b69'}
            onMouseOut={(e) => e.currentTarget.style.color = 'inherit'}>
            FashionGen
          </Typography>
        </Component>
        <Search />

        {/* <AddAPhotoIcon style={{ marginLeft: "16px", cursor: "pointer" }} />
         */}

        {/* <form
          encType="multipart/form-data"
          style={{ marginLeft: "16px", cursor: "pointer" }}
        >
          <input type="file" name="avatar" onChange={submitFile} />
        </form> */}
        <form encType="multipart/form-data" style={{ marginLeft: '16px', cursor: 'pointer' }}>
          <input
            type="file"
            name="avatar"
            accept="image/*" // only allow image files
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-input"
          />
          <label htmlFor="file-input">
            <Button
              variant="contained"
              component="span"
              style={{ backgroundColor: buttonColor, color:txtc}}
            >
              {buttonText}
            </Button>
          </label>
        </form>

        <form encType="multipart/form-data" style={{ marginLeft: '16px', cursor: 'pointer' }}>
          <input
            type="file"
            name="file"
            accept="image/*" // only allow image files
            onChange={handleTryOnFileChange}
            style={{ display: 'none' }}
            id="file-input1"
          />
          <label htmlFor="file-input1">
            <Button
              variant="contained"
              component="span"
              style={{ backgroundColor: tryOnbuttonColor, color:txtcTry}}
            >
              {tryOnButtonText}
            </Button>
          </label>
        </form>

        <CustomButtonWrapper>
          <CustomButtons />
        </CustomButtonWrapper>
      </Toolbar>
    </StyledHeader>
  );
};

export default Header;