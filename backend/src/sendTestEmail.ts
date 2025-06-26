// backend/src/sendTestEmail.ts
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);


const msg = {
  to: 'chdhan25@gmail.com',
  from: 'admin@clinicnotice.com',
  subject: '🧪 Phishing Simulation Test',
  html: `
    <p>This is a <strong>phishing simulation</strong> from Clinic Notice.</p>
    <p>Click <a href="${process.env.BASE_URL}/api/log-event?email=test@example.com&type=click">here</a> to verify.</p>
  `,
};


sgMail.send(msg)
  .then(() => console.log('✅ Test email sent!'))
  .catch((error) => console.error('❌ Error sending test email:', error));
