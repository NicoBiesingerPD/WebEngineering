var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require("path");
const {log} = require("debug");

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send("respond with a resource");
});

/* POST login details */
router.post("/login", function (req, res, next) {
    const loginDetails = req.body;
    const filePath = path.join(__dirname, "../data/loginDetails.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err && err.code !== "ENOENT") {
            return next(err);
        }

        let loginData = [];
        if (data) {
            try {
                loginData = JSON.parse(data);
            } catch (parseErr) {
                return next(parseErr);
            }
        }
        if (proofOfExistingUser(loginData, loginDetails)) {
            console.log("Der User " + loginDetails.username + " existiert bereits.")
        } else {
            loginData.push(loginDetails);
        }
        fs.writeFile(filePath, JSON.stringify(loginData, null, 2), (err) => {
            if (err) {
                return next(err);
            }
            res.status(200).send("Login details saved successfully");
        });
    });
});

module.exports = router;

function proofOfExistingUser(loginData, loginDetails) {
    for (let user of loginData) {
        if (loginDetails.username === user.username) {
            console.log(user.username)
            return true;
        }
    }
    return false;
}
