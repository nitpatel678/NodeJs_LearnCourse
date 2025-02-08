const express = require('express');
const {getAllUsers} = require('../controllers/user');

// Creating a router than seperate routing url
const router = express.Router();

router.use((req, res, next) => {
    console.log("Testing the middleware");
    fs.appendFile(
        "log.txt",
        `\n${Date.now()}: ${req.ip} ${req.method} ${req.path}\n`,
        (err) => {
            if (err) console.log("Error writing to log file:", err);
            next();
        }
    );
});

// REST API ENDPOINTS
router.get('/', getAllUsers);

router.get('/', async(req, res) => {
    // Creating an HTML render page to list all the users
    const dbAllUsers = await User.find({});
    const html = `
    <ul>
       ${dbAllUsers.map((user) => `<li>${user.first_name}-${user.email}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// To get profile of a particular ID and display in HTML
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (user) {
        return res.send(`<li>${user.first_name}</li>`);
    } else {
        return res.status(404).send({ error: "User not found" });
    }
});

// To get a profile of a particular ID and display in JSON format
router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);
    return res.json(user);
});

// Corrected POST route
router.post('/', async (req, res) => {
    try {
        // Extracting query parameters
        const { first_name, last_name, email, jobtitle } = req.query;

        // Correct validation: Ensure at least one field is provided
        if (!first_name && !last_name && !email && !jobtitle) {
            return res.status(400).json({ msg: "At least one field must be provided." });
        }

        // Create the user in the database
        const result = await User.create({
            first_name,
            last_name,
            email,
            jobtitle,
        });

        console.log("Result", result);
        return res.status(201).json({ msg: "Success", user: result });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});


router.delete('/', (req, res) => {
    // TODO: To update a user details
    return res.json({ status: "Pending" });
});


module.exports = router;