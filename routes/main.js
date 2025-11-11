// Create a new router
const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();


// create reusable transporter (use an app password for Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'megazombie130@gmail.com',
        pass: 'jqls vzlb jqhv tgbo'
    }
});

// Handle the main routes
router.get("/", (req, res) => {
    const guestName = getNameById(req.query.id);
    res.render("index.ejs", { name: guestName });
}); 

router.post("/rsvp", (req, res) => {
    
    const guestName = req.body.guest || "Unknown";
    console.log(`RSVP received from ${guestName}`);
    const mailOptions = {
        from: 'megazombie130@gmail.com',
        to: 'megazombie130@gmail.com',
        subject: `RSVP from ${guestName}`,
        text: `${guestName} has clicked RSVP!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.send("Error sending email");
        }
        console.log("RSVP email sent: " + info.response);
        res.render("rsvp_confirmed.ejs");
    });
});

function getNameById(id) {
    const invite = data.invites.find(invite => invite.id === Number(id));
    return invite ? invite.name : "no-one";
}


var data = {
    invites: [
        { id: 4721, name: "James" },
        { id: 9182, name: "Rifat" },
        { id: 1387, name: "Shadiul" },
        { id: 7629, name: "Shane" },
        { id: 6403, name: "John" },
        { id: 2841, name: "Opu" },
        { id: 5990, name: "Stefan" },
        { id: 9913, name: "Ruben" },
        { id: 4122, name: "George" },
        { id: 8347, name: "Issy" },
        { id: 1579, name: "Kausar" },
        { id: 2034, name: "Nahim" },
        { id: 6772, name: "Jeremi" },
        { id: 3599, name: "Alberto" },
        { id: 7448, name: "Ana" },
        { id: 9541, name: "Roan" },
        { id: 2675, name: "Ryan" },
        { id: 8086, name: "Maks" },
        { id: 6210, name: "Wai" },
        { id: 2124, name: "Willow" },
        { id: 4356, name: "Serena" },
        { id: 4444, name: "Gloria" }
    ]
};

// Export the router object so index.js can access it
module.exports = router;
