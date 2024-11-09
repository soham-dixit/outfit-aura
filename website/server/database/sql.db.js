import mysql from "mysql";

// Function to connect to a MySQL database
const connectToMySQL = () => {
  try {
    const config = {
      host: "localhost", // Replace with the hostname of your local database server
      user: "root", // Replace with your local database username
      password: "", // Replace with your local database password
      database: "fashionkart", // Replace with the name of your local database
    };

    // const config = {
    //   server: "fashionkart.database.windows.net",
    //   database: "fashionkartdb",
    //   user: process.env.SQL_USERNAME,
    //   password: process.env.SQL_PASSWORD,
    //   options: {
    //     encrypt: true, // Enable if using SSL
    //     trustServerCertificate: false, // Set to true if using a self-signed certificate
    //   },
    // };

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
