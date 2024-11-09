import React, { useState, useEffect } from 'react';
import { Box, Typography, styled, Table, TableBody, TableRow, TableCell, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { LocalOffer as Badge } from '@mui/icons-material';
import img1 from './image1.png';
import img2 from './image.png';
import img3 from './image3.png';
import fassured from './fass.svg';
import axios from "../../axios/axios";
import flask from "../../axios/flask";

const SmallText = styled(Box)`
    font-size: 14px;
    vertical-align: baseline;
    & > p {
        font-size: 14px;
        margin-top: 10px;
    }
`;

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

const StyledBadge = styled(Badge)`
    margin-right: 10px;
    color: #00cc00;
    font-size: 15px;
`;

const ColumnText = styled(TableRow)`
    font-size: 14px;
    vertical-align: baseline;
    & > td {
        font-size: 14px;
        margin-top: 10px;
        border: none;
    }
`;

const ProductDetail = ({ product }) => {
    const date = new Date(new Date().getTime() + (5 * 24 * 60 * 60 * 1000));
    
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(null); 

    const handleClickOpen = async () => {
        setImageUrl(null);
        setOpen(true);
      try {
          const productId = `${product.product_id}`;
          const category = product.category;
            const payload = { productId, category };

      const response = await flask.post('/virtual_try_on', payload, {
        withCredentials: true,
      });
        
          if (response.status === 200) {
            console.log('Image Path:', response.data.imagePath);
            setImageUrl(`${response.data.imagePath}?t=${new Date().getTime()}`);
      } else {
        console.log('Failed to get image ID');
      }
    } catch (error) {
      console.error('Error calling API:', error);
      }
  };

    // Function to handle dialog close
    const handleClose = () => {
        setOpen(false);
        setImageUrl(null);
    };

    return (
        <Box sx={{ marginLeft: 5 }}>
            <Typography> {product?.product_display_name} </Typography>

            <Typography style={{ marginTop: 5, color: '#878787', fontSize: 14 }}>
                <Box display="flex" alignItems="center">
                    8 Ratings and 1 Review
                    <Box component="span" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={fassured} alt="fassured" style={{ width: 25, marginLeft: 15 }} />
                    </Box>
                </Box>
            </Typography>
            <Typography>
                <Box component='span' style={{ fontSize: 28 }}>₹{product?.price}</Box>&nbsp;&nbsp;&nbsp;
                <Box component='span' style={{ color: '#388E3C' }}>{product?.category}</Box>
            </Typography>
            
            {/* Button to open the dialog */}
            <StyledButton
                variant="contained"
                onClick={handleClickOpen} // Link to open dialog
                style={{
                    width:'20%',
                    marginRight: 10,
                    background: "#73EC8B",
                    color:'#000000',
                    fontWeight: "bold",
                    marginTop: 20,
                    marginBottom: 10
                }}    
            >
                Virtual Try On
            </StyledButton>

            {/* Dialog component */}
            <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Virtual Try On</DialogTitle>
<DialogContent style={{ overflowY: 'hidden', display: 'flex', justifyContent: 'center' }}>
    {imageUrl ? (
        <img 
            src={imageUrl} 
            alt="Virtual Try On" 
            style={{ 
                maxWidth: '100%',  // Set to 100% to make it responsive horizontally
                maxHeight: '100%', // Set to 100% to make it responsive vertically
                objectFit: 'contain' // Ensure the image fits within the container without stretching
            }} 
        />
    ) : (
        <Typography>Loading image...</Typography>
    )}
</DialogContent>

    <DialogActions>
        <StyledButton onClick={handleClose} color="primary">
            Close
        </StyledButton>
    </DialogActions>
</Dialog>

            <Typography style={{marginTop:30}}>Available Offers</Typography>
            <SmallText>
                <Typography><StyledBadge />5% Cashback on Axis Bank Card T&C</Typography>
                <Typography><StyledBadge />Sign up for Pay Later and get Gift Card worth up to ₹500* Know More</Typography>
            </SmallText>

            <Table style={{marginTop:30}}>
                <TableBody>
                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                        <TableCell style={{ fontWeight: 600 }}>Delivery by {date.toDateString()} | ₹40</TableCell>
                    </ColumnText>

                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                        <TableCell>
                            <Box style={{ color: '#2874f0' }} component='span'>SuperComNet</Box>
                            <Typography>GST Invoice Available</Typography>
                        </TableCell>
                    </ColumnText>

                    <ColumnText>
                        <TableCell style={{ color: '#878787' }}>Quote:</TableCell>
                        <TableCell>"Style is a way to say who you are without having to speak." - Rachel Zoe</TableCell>
                    </ColumnText>
                </TableBody>
            </Table>
            </Box>
    );
}

export default ProductDetail;
