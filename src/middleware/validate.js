const validateRegisterFields = (req, res, next) => {
    const allowedFields = [
        "username",
        "password",
        "usia",
        "gender",
        "pekerjaan",
        "status_pernikahan",
        "pendapatan",
    ];

    // Pemeriksaan field mandatory
    for (const field of allowedFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                responseCode: "005",
                message: `Field '${field}' merupakan mandatory`,
            });
        }
    }

    // Pemeriksaan field  yang tidak diinginkan
    const receivedFields = Object.keys(req.body);
    const unwantedFields = receivedFields.filter(
        (field) => !allowedFields.includes(field)
    );

    if (unwantedFields.length > 0) {
        return res.status(400).json({
            responseCode: "006",
            message: `Field tidak diizinkan: ${unwantedFields.join(", ")}.`,
        });
    }

    next();
};
//username, currentPassword, newPassword
const validateUpdatePassFields = (req, res, next) => {
    const allowedFields = [
        "username",
        "currentPassword",
        "newPassword",
    ];

    // Pemeriksaan field mandatory
    for (const field of allowedFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                responseCode: "005",
                message: `Field '${field}' merupakan mandatory`,
            });
        }
    }

    // Pemeriksaan field  yang tidak diinginkan
    const receivedFields = Object.keys(req.body);
    const unwantedFields = receivedFields.filter(
        (field) => !allowedFields.includes(field)
    );

    if (unwantedFields.length > 0) {
        return res.status(400).json({
            responseCode: "006",
            message: `Field tidak diizinkan: ${unwantedFields.join(", ")}.`,
        });
    }

    next();
};
const validateUpdateProfileFields = (req, res, next) => {
    const allowedFields = [
        "username", "usia", "gender", "pekerjaan", "status_pernikahan", "pendapatan"
    ];

    // Pemeriksaan field mandatory
    for (const field of allowedFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                responseCode: "005",
                message: `Field '${field}' merupakan mandatory`,
            });
        }
    }

    // Pemeriksaan field  yang tidak diinginkan
    const receivedFields = Object.keys(req.body);
    const unwantedFields = receivedFields.filter(
        (field) => !allowedFields.includes(field)
    );

    if (unwantedFields.length > 0) {
        return res.status(400).json({
            responseCode: "006",
            message: `Field tidak diizinkan: ${unwantedFields.join(", ")}.`,
        });
    }

    next();
};
const validateLoginFields = (req, res, next) => {
    const allowedFields = [
        "username", "password"
    ];

    // Pemeriksaan field mandatory
    for (const field of allowedFields) {
        if (!req.body[field]) {
            return res.status(400).json({
                responseCode: "005",
                message: `Field '${field}' merupakan mandatory`,
            });
        }
    }

    // Pemeriksaan field  yang tidak diinginkan
    const receivedFields = Object.keys(req.body);
    const unwantedFields = receivedFields.filter(
        (field) => !allowedFields.includes(field)
    );

    if (unwantedFields.length > 0) {
        return res.status(400).json({
            responseCode: "006",
            message: `Field tidak diizinkan: ${unwantedFields.join(", ")}.`,
        });
    }

    next();
};
module.exports = { validateRegisterFields, validateUpdatePassFields,validateUpdateProfileFields,validateLoginFields };
