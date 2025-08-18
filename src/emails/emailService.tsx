import { Resend } from 'resend';
import ReactDOMServer from 'react-dom/server';
import ThankYouForYourEmail from './templates/ThankYouForYourEmail';

const resend = new Resend(process.env.RESEND_API_TOKEN);

export async function sendThankYouEmail(firstName: string, emailTo:string , locale:string) {
  const htmlContent = ReactDOMServer.renderToStaticMarkup(
    <ThankYouForYourEmail firstName={firstName} locale="en" />
  );

  await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [emailTo],
    subject: 'Thank you for your email',
    html: htmlContent,
  });
}