const db = require("../../connections");
// const response = require("../../response");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const secret = process.env.SECRET;

const registrasi = async (req, res) => {
    const {
        username,
        password,
        usia,
        gender,
        pekerjaan,
        status_pernikahan,
        pendapatan,
    } = req.body;
    const handle_password = await bcrypt.hash(password, 10);
    console.log(req.body);
    const sql = `SELECT username FROM users WHERE username = '${username}'`;
    db.query(sql, (error, result) => {
        if (error) {
            return res.status(500).json({
                responseCode: "002",
                message: "Users server error",
                error:error
            });
        } else if (result.length > 0) {
            return res.status(500).json({
                responseCode: "003",
                message: "Your account has been registered",
            });
        } else {
            const insertSql = `INSERT INTO users (username,  password, usia, gender, pekerjaan, status_pernikahan, pendapatan) VALUES ('${username}', '${handle_password}','${usia}','${gender}','${pekerjaan}','${status_pernikahan}','${pendapatan}')`;

            db.query(insertSql, (error, result) => {
                if (error) {
                    return res.status(500).json({
                        responseCode: "001",
                        message: "Error Insert to Database",
                    });
                } else if (result.affectedRows > 0) {
                    return res.status(200).json({
                        responseCode: "00",
                        message: "Success",
                    });
                }
            });
        }
    });
};
const updatePassword = async (req, res) => {
    try {
        // Dapatkan data dari request
        const { username, currentPassword, newPassword } = req.body;

        //  Ambil hashed password dari database
        const selectSql = "SELECT password FROM users WHERE username=?";

        db.query(selectSql, [username], async (error, results) => {
            if (error) {
                return res.status(500).json({
                    responseCode: "007",
                    message: "Error fetching password from database",
                });
            }

            // Jika username tidak ditemukan
            if (results.length === 0) {
                return res.status(401).json({
                    responseCode: "008",
                    message: "Username not found",
                });
            }

            const hashedPasswordFromDatabase = results[0].password;

            // Bandingkan currentPassword dengan hashedPasswordFromDatabase
            const passwordMatch = await bcrypt.compare(
                currentPassword,
                hashedPasswordFromDatabase
            );

            // Jika password cocok, lakukan update
            if (passwordMatch) {
                const newHashedPassword = await bcrypt.hash(newPassword, 10);

                const updateSql =
                    "UPDATE users SET password=? WHERE username=?";

                db.query(
                    updateSql,
                    [newHashedPassword, username],
                    (error, result) => {
                        if (error) {
                            return res.status(500).json({
                                responseCode: "009",
                                message: "Error updating password in database",
                            });
                        } else if (result.affectedRows > 0) {
                            return res.status(200).json({
                                responseCode: "00",
                                message: "Password successfully updated",
                            });
                        }
                    }
                );
            } else {
                res.status(401).json({
                    message: "Current password is invalid",
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating the password",
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        // Dapatkan data dari request
        const {
            username,
            usia,
            gender,
            pekerjaan,
            status_pernikahan,
            pendapatan,
        } = req.body;

        // Ambil data profile dari database
        const selectSql = "SELECT * FROM users WHERE username=?";

        db.query(selectSql, [username], async (error, results) => {
            if (error) {
                return res.status(500).json({
                    responseCode: "011",
                    message: "Error fetching profile from database",
                });
            }

            // Jika username tidak ditemukan
            if (results.length === 0) {
                return res.status(401).json({
                    responseCode: "008",
                    message: "Username not found",
                });
            }

            // operasi update profile
            const updateSql =
                "UPDATE users SET usia=?, gender=?, pekerjaan=?, status_pernikahan=?, pendapatan=? WHERE username=?";

            db.query(
                updateSql,
                [
                    usia,
                    gender,
                    pekerjaan,
                    status_pernikahan,
                    pendapatan,
                    username,
                ],
                (error, result) => {
                    if (error) {
                        return res.status(500).json({
                            responseCode: "009",
                            message: "Error updating profile in database",
                        });
                    } else if (result.affectedRows > 0) {
                        return res.status(200).json({
                            responseCode: "00",
                            message: "Profile successfully updated",
                        });
                    }
                }
            );
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "An error occurred while updating the profile",
        });
    }
};


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Menggunakan parameterized query untuk mencegah SQL injection
        const sql = "SELECT * FROM users WHERE username = ?";
        db.query(sql, [username], async (error, result) => {
            if (error) {
                return res.status(500).json({
                    message: "Server error",
                });
            }

            if (result.length === 0) {
                return res.status(400).json({
                    responseCode: "012",
                    message: "Incorrect username or password",
                });
            }

            const hashedPasswordFromDatabase = result[0].password;

            // Membandingkan password dengan hashed password dari database menggunakan bcrypt
            const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDatabase);

            if (passwordMatch) {
                return res.status(200).json({
                    responseCode: "00",
                    message: "Success Login",
                    user: result[0].username,
                });
            } else {
                return res.status(400).json({
                    responseCode: "012",
                    message: "Incorrect username or password",
                });
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
        });
    }
};





module.exports = {
    registrasi,
    updatePassword,
    updateProfile,
    login,
};
