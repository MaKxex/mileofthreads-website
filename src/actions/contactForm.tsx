'use server';

import { Resend } from 'resend';
import ThankYouForYourEmail from '@/emails/templates/ThankYouForYourEmail';
import { AdminNotificationEmail } from "@/emails/templates/AdminNotificationEmail";
import { validateTurnstileToken } from "next-turnstile";
import { v4 } from "uuid";
import { getTranslations } from 'next-intl/server';
import { render } from '@react-email/components';

const resend = new Resend(process.env.RESEND_API_TOKEN!);

type State = { success?: boolean; error?: string };

export async function contactAction(
  prevState: State,
  formData: FormData
): Promise<State> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;
  const token = formData.get('turnstileToken') as string;

  const te = await getTranslations('emails.thankYouForYourEmail');
  const e = await getTranslations('errors');

  console.log("asd");
  

  if (!name || !email || !subject || !message || !token) {
    return { error: e('allFieldsAreRequired') };
  }

  const validationResponse = await validateTurnstileToken({
    token,
    secretKey: process.env.TURNSTILE_SECRET_KEY!,
    // Optional: Add an idempotency key to prevent token reuse
    idempotencyKey: v4(),
    sandbox: process.env.NODE_ENV === "development",
  });

  if (!validationResponse.success) {
    return { error: e('captchaErrorOnVerification') };
  }

  console.log(name, email, subject, message, token);
  console.log(resend.sta);
  

  try {
    // 1. Письмо клиенту
    await resend.emails.send({
      from: 'Milena <mileofthreads@gmail.com>',
      to: [email],
      subject: te('subject'),
      react: render(<ThankYouForYourEmail
        firstName={name}
        heading={te('heading', { firstName: name })}
        body={te('body')}
      />),
    });

    console.log(1);
    
    await resend.emails.send({
      from: 'portfolio <mileofthreads@gmail.com>',
      to: [process.env.ADMIN_EMAIL!],
      subject: 'Новое сообщение с сайта от ' + name,
      react: render(<AdminNotificationEmail name={name} email={email} subject={subject} message={message} />),
    });


    console.log(2);
    

    return { success: true };
  } catch (error) {
    console.error(error);
    const t = await getTranslations('errors');
    return { error: t('errorsOnSendingEmails') };
  }
}
