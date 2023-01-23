import nodemailer from "nodemailer"
import dotenv from "dotenv"
import path from "path"
import {htmlToText} from "html-to-text"
import pug from "pug"
import sgMail from "@sendgrid/mail"


const __dirname = path.resolve()

// dotenv.config({ path: './.env' })


// we create an Email class with which we can produce email Objects with belows data (property value pairs).
export class Email {
    constructor(user, url) {
        this.to = user.email
        this.firstName = user.name.split(" ")[0]
        this.url = url
        this.from = `Thomas Baeskow <${process.env.EMAIL_FROM}>`
    }

    // we CREATE different TRANSPORTS for development and production
    newTransport() {
        if (process.env.NODE_ENV === "production") {
            // Sendgrid
            return nodemailer.createTransport({
                service: "SendGrid", // "SendGrid" is predefined and recognized
                auth: { // authentication for sendGrid
                    user: process.env.SENDGRID_USERNAME, // saved in config.env (username and password)
                    pass: process.env.SENDGRID_PASSWORD
                }
            })
        }

        // it will return a nodemailer transport like below (email template) when we are
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user:process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        })
    }
    // SEND the actual EMAIL
    async send(template, subject) {
        // 1) Render HTML based on a pug template
        const html = pug.renderFile(`${__dirname}/utils/email/${template}.pug`, { // here we are creating the connection to our pug file and define locals for pug (firstName, url, subject). Here we create the html.
            firstName: this.firstName,
            url: this.url,
            subject
        })

        // 2) Define email options
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html)
        }

        // 3) Create a transport and send email
        await this.newTransport().sendMail(mailOptions)
    }

    async sendWelcome() { // this is used in authController function "signUp"
        await this.send("welcome", "Welcome to the GeckoGaming Family!") // this.send("pugTemplate for email sign up", "subject for email")
    }

    async sendPasswordReset() { // this will be used in out authController function "forgotPassword"
        await this.send("passwordReset", "Your password reset token (valid for only 10 minutes") // this.send("pugTemplate for email resetPassword", "subject for email")
    }
}

