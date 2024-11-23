const nodemailer = require("nodemailer");
const mailgun = require("nodemailer-mailgun-transport");

// Set up Mailgun transport with API key and domain
const transporter = nodemailer.createTransport(
  mailgun({
    auth: {
      api_key: process.env.API_MailGun,  // Your Mailgun API key
      domain: process.env.API_Domain // Your Mailgun domain
    },
  })
);

// Controller function to send email
const sendEmailController = (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // Email options
    const mailOptions = {
      to: "roytushar98@gmail.com",
      from: "Excited User <mailgun@sandboxb57089de57a54d1fbdc79995c3da9573.mailgun.org>",
      subject: "Regarding Mern Portfolio App",
      html: `
        <h5>Detail Information</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Send Email API Error",
          error,
        });
      }
      return res.status(200).send({
        success: true,
        message: "Your Message Send Successfully",
        info,
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error,
    });
  }
};

module.exports = { sendEmailController };
