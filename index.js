const express = require("express");
var hdb = require("hdb");
var mysql = require("mysql");
const router = express.Router();
const app = express();
const path = require("path");
// set the view engine to ejs
app.set("view engine", "ejs");

////

let data = [];
router.get("/", function (req, res) {
  res.render("index", { data: [] });
  //__dirname : It will resolve to your project folder.
});

router.get("/getdealer", (req, res) => {
  const { year } = req.query;
  console.log(year);
  var client = hdb.createClient({
    host: "c1256c5a-fa5f-4d4a-afa8-9b05cad748e0.hana.prod-ap10.hanacloud.ondemand.com",
    port: 443,
    user: "HACK2BUILD#PYTHON",
    password: "&zVf@qfQ(2)$Y-M-8/w6xUCDYPz8;Tc.",
  });
  client.on("error", function (err) {
    console.error("Network connection error", err);
  });
  client.connect(function (err) {
    if (err) {
      return console.error("Connect error", err);
    }
    client.exec(
      `SELECT * FROM "HACK2BUILD"."SAP.TIME.VIEW_DIMENSION_DAY" WHERE YEAR=${year} limit 5`,
      function (err, rows) {
        client.end();
        if (err) {
          return console.error, err;
        }
        console.log("Results:", typeof rows, rows);
        res.render("index", { data: rows });
      }
    );
  });
});

app.use("/", router);
const port = process.env.PORT || 4200;

app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});
