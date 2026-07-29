import nodemailer from 'nodemailer';

type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  attachments?: any[];
};

// Configure Nodemailer with Hostinger SMTP credentials from .env.local
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.hostinger.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(options: SendEmailOptions) {
  const defaultFromEmail = process.env.SMTP_USER || 'support@beyondyourimagination.shop';
  const fromName = 'Devoxa Technologies';
  const from = options.from || `"${fromName}" <${defaultFromEmail}>`;

  try {
    const info = await transporter.sendMail({
      from,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      text: options.text || '',
      html: options.html,
      attachments: options.attachments,
    });

    console.log("[email] Email successfully sent via Hostinger SMTP: %s", info.messageId);
    return info;
  } catch (error: any) {
    console.error('[email] Failed to send email via SMTP:', error.message);
    throw error;
  }
}
