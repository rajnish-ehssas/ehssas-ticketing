import { EMAIL_PASSWORD, EMAIL_USERNAME } from '@/env';
import nodemailer, { Transporter } from 'nodemailer';

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

interface RegisterMailOptions {
  email: string;
  password: string;
}

interface ForgotPasswordData {
  email: string;
  origin: string;
  tempPassword: string;
  userId: string;
}

// Configure the transporter
const transport: Transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USERNAME as string,
    pass: EMAIL_PASSWORD as string,
  },
});

// Function to get mail options
const getMailOptions = (receiver: string, subject: string, html: string): MailOptions => {
  return {
    from: EMAIL_USERNAME as string,
    to: receiver,
    subject,
    html,
  };
};

// Function to send email
const sendEmail = (mailOptions: MailOptions): void => {
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Error sending email:', err);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Feature 1: Send registration email
export const clientRegistrationMail = (data: RegisterMailOptions): void => {
  const { email, password } = data;
  const html = `
    <p>Dear User,</p>
    <p>Thank you for registering. Below are your account details:</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Password:</strong> ${password}</p>
    <p>Please keep your credentials secure.</p>
  `;
  const mailOptions = getMailOptions(email, 'Registration Successful', html);
  sendEmail(mailOptions);
};

export const ticketGenerateMail = (email: string, ticketNumber: string): void => {
  const html = `
    <p>Dear User,</p>
    <p>We have successfully generated your support ticket.</p>
    <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
    <p>Our team will get back to you shortly. Thank you for reaching out!</p>
    <p>If you have further queries, reply to this email.</p>
  `;

  const mailOptions = getMailOptions(email, 'Ticket Generated Successfully', html);
  sendEmail(mailOptions);
};

export const ticketClosedMail = (email: string, ticketNumber: string): void => {
  const html = `
    <p>Dear User,</p>
    <p>We are writing to inform you that your support ticket has been closed.</p>
    <p><strong>Ticket Number:</strong> ${ticketNumber}</p>
    <p>If you have any additional concerns, feel free to create a new ticket or reply to this email.</p>
    <p>Thank you for choosing our support services!</p>
  `;

  const mailOptions = getMailOptions(email, 'Ticket Closed Notification', html);
  sendEmail(mailOptions);
};


export const forgotPasswordMail = (data: ForgotPasswordData): void => {
  const { email, origin, tempPassword, userId } = data;
  const html = `
    <div class="content" style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2 style="font-weight: lighter;">Hello ${email},</h2>
      <h3>A request has been received to change the password of your Ehssas Digitech account.</h3>
      <div class="container" style="margin: 20px 0;">
        <a href="${origin}/in/en/setpassword?tempPassword=${tempPassword}&userId=${userId}"
           style="background-color: rgb(78, 132, 132); color: white; border-radius: 4px; padding: 12px 20px; text-decoration: none; cursor: pointer; border: 2px solid rgb(78, 132, 132);">
          Reset Password
        </a>
      </div>
      <p>If you did not initiate this request, please contact us immediately at <a href="mailto:contact@ehssas.co.in">contact@ehssas.co.in</a>.</p>
      <h4>Thank you,</h4>
      <h4>Team Ehssas Digitech Pvt. Ltd</h4>
    </div>
  `;
  const mailOptions = getMailOptions(email, 'Password Reset Request', html);
  sendEmail(mailOptions);
};

