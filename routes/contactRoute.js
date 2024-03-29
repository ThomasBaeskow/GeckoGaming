import express  from "express";
import sgMail from "@sendgrid/mail"
// import path from "path";

const app = express();

// app.route("/").get(function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/src/components/aboutUs/AboutUs.js'));
//  });

app.post('/contact', (req, res) => {
     console.log(req.body);
    const msg = {
        to: `geckogamingstore@gmail.com`, // Change to your recipient
        from: `${req.body.from}`, // Change to your verified sender
         subject: "inquire",
        text: `Message from ${req.body.from}:\n${req.body.text}`,
    }
    try {
        sgMail.send(msg);
        res.send("Message Successfully Sent!");
      } catch (error) {
        res.send("Message Could not be Sent");
      }
 });

 export default app;