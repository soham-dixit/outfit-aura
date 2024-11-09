import mysql from "mysql";
import createError from "../utils/createError.js";
import ProductModel from "../model/product.model.js";

// Function to connect to a MySQL database
const connectToMySQL = () => {
  try {
    const config = {
      host: "localhost",
      user: "root",
      password: "", // Replace with your MySQL password
      database: "fashionkart",
    };

    const connection = mysql.createConnection(config);

    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to MySQL: ", err);
      } else {
        console.log("Connected to MySQL successfully");
      }
    });

    return connection;
  } catch (err) {
    console.error("Error in connectToMySQL function: ", err);
    return null;
  }
};

export default connectToMySQL;

// Add data to MySQL database
export const addToCartHistory = async (req, res, next) => {
  const {
    productId,
    productName,
    brand,
    category,
    occasion,
    productUsage,
    color,
    price,
    rating,
  } = req.body;

  const userId = req.userId;
  const cartDate = new Date().toISOString().slice(0, 10);

  try {
    const connection = connectToMySQL();

    const query = `
      INSERT INTO Cart_History (
        userId,
        productId,
        productName,
        cartDate,
        brand,
        category,
        occasion,
        productUsage,
        color,
        price,
        rating
      )
      VALUES
      (
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
      )
    `;

    const values = [
      userId,
      productId,
      productName,
      cartDate,
      brand,
      category,
      occasion,
      productUsage,
      color,
      price,
      rating,
    ];

    connection.query(query, values, (err, result) => {
      if (err) {
        console.error("Error adding to Cart history:", err);
        createError(req, res, next, "Error adding to Cart history", 500);
      } else {
        console.log("Data added successfully");
        res.status(201).json({
          success: true,
          message: "Data added successfully",
        });
      }

      connection.end(); // Close the MySQL connection
    });
  } catch (err) {
    console.error("Error in addToCartHistory function: ", err);
    createError(req, res, next, "Error adding to Cart history", 500);
  }
};

// Import statements and connectToMySQL function remain the same

// Get cart history from MySQL database
export const getCartHistory = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const connection = connectToMySQL();

    const query = `
      SELECT * FROM Cart_History
      WHERE userId = ?
    `;

    connection.query(query, [userId], async (err, results) => {
      if (err) {
        console.error("Error fetching Cart history:", err);
        createError(req, res, next, "Error fetching Cart history", 500);
        return;
      }

      console.log("Data fetched successfully");
      res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        data: results,
      });

      connection.end(); // Close the MySQL connection
    });
  } catch (err) {
    console.error("Error in getCartHistory function: ", err);
    createError(req, res, next, "Error fetching Cart history", 500);
  }
};

// Modify other functions similarly for MySQL
// Import statements and connectToMySQL function remain the same

// Add data to MySQL Recommended_Cart_History table
export const addToRecommendedCart = async (req, res, next) => {
  const { userId } = req.params;
  const { productsData } = req.body; // Assuming the product data is provided in the request body as an array

  try {
    const connection = connectToMySQL();

    const countQuery = `
      SELECT COUNT(*) AS productCount
      FROM Recommended_Cart_History
      WHERE userId = ?
    `;

    connection.query(countQuery, [userId], async (err, countResult) => {
      if (err) {
        console.error(
          "Error counting records in Recommended_Cart_History:",
          err
        );
        createError(
          req,
          res,
          next,
          "Error adding to recommended Cart history",
          500
        );
        return;
      }

      const productCount = countResult[0].productCount;

      if (productCount >= 5) {
        const deleteQuery = `
          DELETE FROM Recommended_Cart_History
          WHERE userId = ?
        `;

        connection.query(deleteQuery, [userId], async (err) => {
          if (err) {
            console.error(
              "Error deleting records from Recommended_Cart_History:",
              err
            );
            createError(
              req,
              res,
              next,
              "Error adding to recommended Cart history",
              500
            );
            return;
          }
        });
      }

      const date = new Date().toISOString().slice(0, 10);

      const insertQuery = `
        INSERT INTO Recommended_Cart_History (
          userId,
          productId,
          productName,
          cartDate,
          brand,
          category,
          occasion,
          productUsage,
          color,
          price,
          rating
        )
        VALUES
        (
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?,
          ?
        )
      `;

      for (const productId of productsData) {
        const product = await ProductModel.findOne({
          product_id: productId,
        });

        const values = [
          userId,
          productId,
          product.product_name,
          date,
          product.brand,
          product.category,
          product.occasion,
          product.productUsage,
          product.color,
          product.price,
          product.rating,
        ];

        connection.query(insertQuery, values, async (err) => {
          if (err) {
            console.error("Error adding to Recommended_Cart_History:", err);
            createError(
              req,
              res,
              next,
              "Error adding to recommended Cart history",
              500
            );
            return;
          }
        });
      }

      console.log("Data added to Recommended_Cart_History successfully");
      res.status(201).json({
        success: true,
        message: "Data added successfully",
      });

      connection.end(); // Close the MySQL connection
    });
  } catch (err) {
    console.error("Error in addToRecommendedCart function: ", err);
    createError(
      req,
      res,
      next,
      "Error adding to recommended Cart history",
      500
    );
  }
};

// Add data to MySQL Generated_Cart_History table
export const addToGeneratedCart = async (req, res, next) => {
  const { userId } = req.params;
  const { imagesUrl } = req.body;

  try {
    const connection = connectToMySQL();

    const countQuery = `
      SELECT COUNT(*) AS productCount
      FROM Generated_Cart_History
      WHERE userId = ?
    `;

    connection.query(countQuery, [userId], async (err, countResult) => {
      if (err) {
        console.error("Error counting records in Generated_Cart_History:", err);
        createError(
          req,
          res,
          next,
          "Error adding to recommended Cart history",
          500
        );
        return;
      }

      const productCount = countResult[0].productCount;

      if (productCount >= 5) {
        const deleteQuery = `
          DELETE FROM Generated_Cart_History
          WHERE userId = ?
        `;

        connection.query(deleteQuery, [userId], async (err) => {
          if (err) {
            console.error(
              "Error deleting records from Generated_Cart_History:",
              err
            );
            createError(
              req,
              res,
              next,
              "Error adding to recommended Cart history",
              500
            );
            return;
          }
        });
      }

      const insertQuery = `
        INSERT INTO Generated_Cart_History (
          userId,
          imageUrl
        )
        VALUES
        (
          ?,
          ?
        )
      `;

      for (const imageUrl of imagesUrl) {
        const values = [userId, imageUrl];

        connection.query(insertQuery, values, async (err) => {
          if (err) {
            console.error("Error adding to Generated_Cart_History:", err);
            createError(
              req,
              res,
              next,
              "Error adding to recommended Cart history",
              500
            );
            return;
          }
        });
      }

      console.log("Data added to Generated_Cart_History successfully");
      res.status(201).json({
        success: true,
        message: "Data added successfully",
      });

      connection.end(); // Close the MySQL connection
    });
  } catch (err) {
    console.error("Error in addToGeneratedCart function: ", err);
    createError(
      req,
      res,
      next,
      "Error adding to recommended Cart history",
      500
    );
  }
};

// Get data from both Recommended_Cart_History and Generated_Cart_History tables
export const getBothData = async (req, res, next) => {
  const userId = req.userId;

  try {
    const connection = connectToMySQL();

    const query1 = `
      SELECT * FROM Recommended_Cart_History
      WHERE userId = ?
    `;

    const query2 = `
      SELECT * FROM Generated_Cart_History
      WHERE userId = ?
    `;

    connection.query(query1, [userId], async (err, recommendedData) => {
      if (err) {
        console.error("Error fetching Recommended_Cart_History:", err);
        createError(req, res, next, "Error fetching Cart history", 500);
        return;
      }

      connection.query(query2, [userId], async (err, generatedData) => {
        if (err) {
          console.error("Error fetching Generated_Cart_History:", err);
          createError(req, res, next, "Error fetching Cart history", 500);
          return;
        }

        console.log("Data fetched successfully");
        res.status(200).json({
          success: true,
          message: "Data fetched successfully",
          recommendedData,
          generatedData,
        });

        connection.end(); // Close the MySQL connection
      });
    });
  } catch (err) {
    console.error("Error in getBothData function: ", err);
    createError(req, res, next, "Error fetching Cart history", 500);
  }
};
