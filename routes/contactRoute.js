import express  from "express";
import sgMail from "@sendgrid/mail"
import path from "path";

const app = express();

app.route("/").get(function (req, res) {
    res.sendFile(path.join(__dirname, '../client/src/components/aboutUs/AboutUs.js'));
 });

app.post('/contact', (req, res) => {
    // console.log(req);
    const msg = {
        to: `thomasbaeskow@web.de`, // Change to your recipient
        from: `baeskowt@gmail.com`, // Change to your verified sender
         subject: "inquire",
        text: `Message from ${req.body.email}:\n${req.body.message}`,
    }
    try {
        sgMail.send(msg);
        res.send("Message Successfully Sent!");
      } catch (error) {
        res.send("Message Could not be Sent");
      }
 });

 export default app;