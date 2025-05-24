const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint
app.post('/api/send-form-email', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Replace with your email and app password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kushwahaaekansh98@gmail.com',        // Replace with your Gmail
      pass: 'aswtzqyebnylvckd'      // Use an App Password from Google
    }
  });

  const mailOptions = {
    from: email,
    to: 'abhi1020.kanpur@gmail.com',      // Receiver
    subject: 'New Contact Form Submission',
    text: `
      First Name: ${firstName}
      Last Name: ${lastName}
      Email: ${email}
      Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email sending failed:', error);
    res.status(500).json({ message: 'Failed to send email.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
