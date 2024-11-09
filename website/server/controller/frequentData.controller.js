import mysql from "mysql";
import createError from "../utils/createError.js";
import ProductModel from "../model/product.model.js";

// Function to connect to a MySQL database
const connectToMySQL = () => {
  try {
    const config = {
      host: "localhost", // Replace with your MySQL server host
      user: "root", // Replace with your MySQL username
      password: "", // Replace with your MySQL password
      database: "fashionkart", // Replace with your MySQL database name
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

// Add data to MySQL Frequent_Data table
export const addToFrequentData = async (req, res, next) => {
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

  const viewDate = new Date().toISOString().slice(0, 10);
  const userId = req.userId;

  try {
    const connection = connectToMySQL();

    const query = `
      INSERT INTO Frequent_Data (
        userId,
        productId,
        productName,
        viewDate,
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
      viewDate,
      brand,
      category,
      occasion,
      productUsage,
      color,
      price,
      rating,
    ];

    connection.query(query, values, async (err) => {
      if (err) {
        console.error("Error adding to Frequent data history:", err);
        createError(
          req,
          res,
          next,
          "Error adding to Frequent data history",
          500
        );
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
    console.error("Error in addToFrequentData function: ", err);
    createError(req, res, next, "Error adding to Frequent data history", 500);
  }
};

// Get Frequent_Data from MySQL database
export const getFrequentData = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const connection = connectToMySQL();

    const query = `
      SELECT * FROM Frequent_Data
      WHERE userId = ?
    `;

    connection.query(query, [userId], async (err, results) => {
      if (err) {
        console.error("Error getting Frequent data:", err);
        createError(req, res, next, "Error getting Frequent data", 500);
      } else {
        console.log("Data fetched successfully");
        res.status(200).json({
          success: true,
          message: "Data fetched successfully",
          data: results,
        });
      }

      connection.end(); // Close the MySQL connection
    });
  } catch (err) {
    console.error("Error in getFrequentData function: ", err);
    createError(req, res, next, "Error getting Frequent data", 500);
  }
};

// Add data to MySQL Recommended_Frequent_Data table
export const addToRecommendedFrequentData = async (req, res, next) => {
  const { userId } = req.params;
  const { productsData } = req.body;

  try {
    const connection = connectToMySQL();

    const countQuery = `
      SELECT COUNT(*) AS productCount
      FROM Recommended_Frequent_Data
      WHERE userId = ?
    `;

    connection.query(countQuery, [userId], async (err, countResult) => {
      if (err) {
        console.error(
          "Error counting records in Recommended_Frequent_Data:",
          err
        );
        createError(
          req,
          res,
          next,
          "Error adding to recommended FrequentData history",
          500
        );
        return;
      }

      const productCount = countResult[0].productCount;

      if (productCount >= 5) {
        const deleteQuery = `
          DELETE FROM Recommended_Frequent_Data
          WHERE userId = ?
        `;

        connection.query(deleteQuery, [userId], async (err) => {
          if (err) {
            console.error(
              "Error deleting records from Recommended_Frequent_Data:",
              err
            );
            createError(
              req,
              res,
              next,
              "Error adding to recommended FrequentData history",
              500
            );
            return;
          }
        });
      }

      const date = new Date().toISOString().slice(0, 10);

      const insertQuery = `
        INSERT INTO Recommended_Frequent_Data (
          userId,
          productId,
          productName,
          viewDate,
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
            console.error("Error adding to Recommended_Frequent_Data:", err);
            createError(
              req,
              res,
              next,
              "Error adding to recommended FrequentData history",
              500
            );
            return;
          }
        });
      }

      console.log("Data added to Recommended_Frequent_Data successfully");
      res.status(201).json({
        success: true,
        message: "Data added successfully",
      });

      connection.end(); // Close the MySQL connection
    });
  } catch (err) {
    console.error("Error in addToRecommendedFrequentData function: ", err);
    createError(
      req,
      res,
      next,
      "Error adding to recommended FrequentData history",
      500
    );
  }
};

// Add data to MySQL Generated_Frequent_Data table
export const addToGeneratedFrequentData = async (req, res, next) => {
  const { userId } = req.params;
  const { imagesUrl } = req.body;

  try {
    const connection = connectToMySQL();

    const countQuery = `
      SELECT COUNT(*) AS productCount
      FROM Generated_Frequent_Data
      WHERE userId = ?
    `;

    connection.query(countQuery, [userId], async (err, countResult) => {
      if (err) {
        console.error(
          "Error counting records in Generated_Frequent_Data:",
          err
        );
        createError(
          req,
          res,
          next,
          "Error adding to recommended FrequentData history",
          500
        );
        return;
      }

      const productCount = countResult[0].productCount;

      if (productCount >= 5) {
        const deleteQuery = `
          DELETE FROM Generated_Frequent_Data
          WHERE userId = ?
        `;

        connection.query(deleteQuery, [userId], async (err) => {
          if (err) {
            console.error(
              "Error deleting records from Generated_Frequent_Data:",
              err
            );
            createError(
              req,
              res,
              next,
              "Error adding to recommended FrequentData history",
              500
            );
            return;
          }
        });
      }

      const insertQuery = `
        INSERT INTO Generated_Frequent_Data (
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
            console.error("Error adding to Generated_Frequent_Data:", err);
            createError(
              req,
              res,
              next,
              "Error adding to recommended FrequentData history",
              500
            );
            return;
          }
        });
      }

      console.log("Data added to Generated_Frequent_Data successfully");
      res.status(201).json({
        success: true,
        message: "Data added successfully",
      });

      connection.end(); // Close the MySQL connection
    });
  } catch (err) {
    console.error("Error in addToGeneratedFrequentData function: ", err);
    createError(
      req,
      res,
      next,
      "Error adding to recommended FrequentData history",
      500
    );
  }
};

// Get both Recommended_Frequent_Data and Generated_Frequent_Data from MySQL database
export const getBothData = async (req, res, next) => {
  const userId = req.userId;

  try {
    const connection = connectToMySQL();

    const query1 = `
      SELECT * FROM Recommended_Frequent_Data
      WHERE userId = ?
    `;

    const query2 = `
      SELECT * FROM Generated_Frequent_Data
      WHERE userId = ?
    `;

    const recommendedData = await new Promise((resolve, reject) => {
      connection.query(query1, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const generatedData = await new Promise((resolve, reject) => {
      connection.query(query2, [userId], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    console.log("Data fetched successfully");
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      recommendedData,
      generatedData,
    });

    connection.end(); // Close the MySQL connection
  } catch (err) {
    console.error("Error fetching data:", err);
    createError(req, res, next, "Error fetching data", 500);
  }
};
