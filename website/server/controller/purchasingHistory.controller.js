import mysql from "mysql";
import createError from "../utils/createError.js";
import ProductModel from "../model/product.model.js";

// Function to create a MySQL connection
const createMySQLConnection = () => {
  const config = {
    host: "localhost", // Replace with the hostname of your local database server
    user: "root", // Replace with your local database username
    password: "", // Replace with your local database password
    database: "fashionkart", // Replace with the name of your local database
  };

  return mysql.createConnection(config);
};

// Add data to purchasing history table
export const addToPurchasing = async (req, res, next) => {
  const products = req.body; // Assuming req.body is an array of product objects
  const userId = req.userId;

  const connection = createMySQLConnection();

  try {
    connection.connect();

    for (const product of products) {
      const {
        product_id: productId,
        product_name: productName,
        brand,
        category,
        occasion,
        productUsage,
        color,
        price,
        rating,
      } = product;
      const purchaseDate = new Date().toISOString().slice(0, 10);

      const query = `
        INSERT INTO Purchasing_History (
          userId,
          productId,
          productName,
          purchaseDate,
          brand,
          category,
          occasion,
          productUsage,
          color,
          price,
          rating
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      connection.query(
        query,
        [
          userId,
          productId,
          productName,
          purchaseDate,
          brand,
          category,
          occasion,
          productUsage,
          color,
          price,
          rating,
        ],
        (err, results) => {
          if (err) {
            console.error("Error adding to purchasing history:", err);
            createError(
              req,
              res,
              next,
              "Error adding to purchasing history",
              500
            );
          }
        }
      );
    }

    connection.end();

    res.status(201).json({
      success: true,
      message: "Data added successfully",
    });
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    createError(req, res, next, "Error connecting to MySQL", 500);
  }
};

// Function to get purchasing data for a user
export const getPurchasingData = async (req, res, next) => {
  const userId = req.params.userId;

  const connection = createMySQLConnection();

  try {
    connection.connect();

    const query = `
      SELECT * FROM Purchasing_History
      WHERE userId = ?
    `;

    connection.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error fetching purchasing history:", err);
        createError(req, res, next, "Error fetching purchasing history", 500);
      } else {
        res.status(200).json({
          success: true,
          data: results,
        });
      }
    });

    connection.end();
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    createError(req, res, next, "Error connecting to MySQL", 500);
  }
};

// Rest of the functions (addToRecommendedPurchasing, addToGeneratedPurchasing, getBothData) can be updated similarly.

// Export the functions
export const addToRecommendedPurchasing = async (req, res, next) => {
  const userId = req.params.userId;
  const { productsData } = req.body;

  const connection = createMySQLConnection();

  try {
    connection.connect();

    // Check the count of existing products
    const countQuery = `
      SELECT COUNT(*) AS productCount
      FROM Recommended_Purchasing_History
      WHERE userId = ?
    `;

    connection.query(countQuery, [userId], async (countErr, countResults) => {
      if (countErr) {
        console.error("Error checking product count:", countErr);
        createError(req, res, next, "Error checking product count", 500);
      } else {
        const productCount = countResults[0].productCount;

        if (productCount >= 5) {
          // Delete previous data for the userId
          const deleteQuery = `
            DELETE FROM Recommended_Purchasing_History
            WHERE userId = ?
          `;

          connection.query(
            deleteQuery,
            [userId],
            async (deleteErr, deleteResults) => {
              if (deleteErr) {
                console.error("Error deleting previous data:", deleteErr);
                createError(
                  req,
                  res,
                  next,
                  "Error deleting previous data",
                  500
                );
              }
            }
          );
        }

        // Create current date in string
        const date = new Date().toISOString().slice(0, 10);

        // Insert new data
        const insertQuery = `
          INSERT INTO Recommended_Purchasing_History (
            userId,
            productId,
            productName,
            purchaseDate,
            brand,
            category,
            occasion,
            productUsage,
            color,
            price,
            rating
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        for (const productId of productsData) {
          // Find the product using productId from MongoDB
          const product = await ProductModel.findOne({ product_id: productId });

          connection.query(
            insertQuery,
            [
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
            ],
            (insertErr, insertResults) => {
              if (insertErr) {
                console.error(
                  "Error adding to recommended purchasing history:",
                  insertErr
                );
                createError(
                  req,
                  res,
                  next,
                  "Error adding to recommended purchasing history",
                  500
                );
              }
            }
          );
        }

        connection.end();

        res.status(201).json({
          success: true,
          message: "Data added successfully",
        });
      }
    });
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    createError(req, res, next, "Error connecting to MySQL", 500);
  }
};

// Add data to generated purchasing history table
export const addToGeneratedPurchasing = async (req, res, next) => {
  const userId = req.params.userId;
  const { imagesUrl } = req.body;

  const connection = createMySQLConnection();

  try {
    connection.connect();

    // Check the count of existing images
    const countQuery = `
      SELECT COUNT(*) AS productCount
      FROM Generated_Purchasing_History
      WHERE userId = ?
    `;

    connection.query(countQuery, [userId], async (countErr, countResults) => {
      if (countErr) {
        console.error("Error checking image count:", countErr);
        createError(req, res, next, "Error checking image count", 500);
      } else {
        const productCount = countResults[0].productCount;

        if (productCount >= 5) {
          // Delete previous data for the userId
          const deleteQuery = `
            DELETE FROM Generated_Purchasing_History
            WHERE userId = ?
          `;

          connection.query(
            deleteQuery,
            [userId],
            async (deleteErr, deleteResults) => {
              if (deleteErr) {
                console.error("Error deleting previous data:", deleteErr);
                createError(
                  req,
                  res,
                  next,
                  "Error deleting previous data",
                  500
                );
              }
            }
          );
        }

        // Insert new data
        const insertQuery = `
          INSERT INTO Generated_Purchasing_History (
            userId,
            imageUrl
          )
          VALUES (?, ?)
        `;

        for (const imageUrl of imagesUrl) {
          connection.query(
            insertQuery,
            [userId, imageUrl],
            (insertErr, insertResults) => {
              if (insertErr) {
                console.error(
                  "Error adding to generated purchasing history:",
                  insertErr
                );
                createError(
                  req,
                  res,
                  next,
                  "Error adding to generated purchasing history",
                  500
                );
              }
            }
          );
        }

        connection.end();

        res.status(201).json({
          success: true,
          message: "Data added successfully",
        });
      }
    });
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    createError(req, res, next, "Error connecting to MySQL", 500);
  }
};

// Get both recommended and generated purchasing data for a user
export const getBothData = async (req, res, next) => {
  const userId = req.userId;

  const connection = createMySQLConnection();

  try {
    connection.connect();

    const recommendedQuery = `
      SELECT * FROM Recommended_Purchasing_History
      WHERE userId = ?
    `;

    const generatedQuery = `
      SELECT * FROM Generated_Purchasing_History
      WHERE userId = ?
    `;

    connection.query(
      recommendedQuery,
      [userId],
      async (recommendedErr, recommendedResults) => {
        if (recommendedErr) {
          console.error(
            "Error fetching recommended purchasing history:",
            recommendedErr
          );
          createError(
            req,
            res,
            next,
            "Error fetching recommended purchasing history",
            500
          );
        } else {
          connection.query(
            generatedQuery,
            [userId],
            async (generatedErr, generatedResults) => {
              if (generatedErr) {
                console.error(
                  "Error fetching generated purchasing history:",
                  generatedErr
                );
                createError(
                  req,
                  res,
                  next,
                  "Error fetching generated purchasing history",
                  500
                );
              } else {
                connection.end();

                res.status(200).json({
                  success: true,
                  message: "Data fetched successfully",
                  recommendedData: recommendedResults,
                  generatedData: generatedResults,
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.error("Error connecting to MySQL:", err);
    createError(req, res, next, "Error connecting to MySQL", 500);
  }
};
