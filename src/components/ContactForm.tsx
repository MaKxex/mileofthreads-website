"use client";

import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import Form from "next/form"; 
import { useActionState, useEffect, useState } from 'react';
import { contactAction } from '@/actions/contactForm';
import {useTranslations} from 'next-intl';
import { useLocale } from "next-intl";
import { Turnstile } from "next-turnstile";


export default function ContactForm() {
  const initial = { error: undefined, success: false };
  const [turnstileStatus, setTurnstileStatus] = useState('required');
  const [token, setToken] = useState<string | null>(null);
  const [state, formAction, pending] = useActionState(contactAction, initial);
  const t = useTranslations('ContactForm');
  const locale = useLocale()
  

  useEffect(() => {
    if (state?.success) {
      toast.success(t('toastMessageSuccessful'));
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  console.log(locale === 'lv' ? 'en' : locale);
  console.log(process.env.NODE_ENV === "development");
  console.log(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '');

  useEffect(() => {
    console.log(turnstileStatus);
  }, [turnstileStatus]);

  return (
    <Card className="h-fit border-4 border-foreground shadow-[8px_8px_0px_0px_#000000] bg-card rotate-1">
      <CardHeader>
        <CardTitle className="text-3xl font-black uppercase tracking-tight bg-primary text-primary-foreground px-4 py-2 border-2 border-foreground shadow-[4px_4px_0px_0px_#000000] inline-block -rotate-1">
          {t('Title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form action={formAction} className="space-y-6">
          <input type="hidden" name="turnstileToken" value={token || ''} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="block mb-2 font-black uppercase tracking-wide">{t('name')}</Label>
              <Input
                id="name"
                name="name"
                placeholder={t('namePlaceholder')}
                required
                className="border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] bg-input-background font-medium"
                maxLength={50}
              />
            </div>
            <div>
              <Label htmlFor="email" className="block mb-2 font-black uppercase tracking-wide">{t('email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
                className="border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] bg-input-background font-medium"
                maxLength={100}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="subject" className="block mb-2 font-black uppercase tracking-wide">{t('theme')}</Label>
            <Input
              id="subject"
              name="subject"
              placeholder={t('subjectPlaceholder')}
              required
              className="border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] bg-input-background font-medium"
              maxLength={250}
            />
          </div>

          <div>
            <Label htmlFor="message" className="block mb-2 font-black uppercase tracking-wide">{t('message')}</Label>
            <Textarea
              id="message"
              name="message"
              placeholder={t('messagePlaceholder')}
              rows={5}
              required
              className="border-2 border-foreground shadow-[3px_3px_0px_0px_#000000] bg-input-background font-medium resize-none"
              maxLength={2000}
            />
          </div>

          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
            theme="light"
            retry="auto"
            language={locale === 'lv' ? 'en' : locale}
            sandbox={process.env.NODE_ENV === "development"}

            onError={() => {
              setTurnstileStatus('error');
            }}

            onExpire={() => {
              setTurnstileStatus('expired');
            }}

            onVerify={(token) => {
              setTurnstileStatus('success');
              setToken(token);
            }}
          />

          <Button
            type="submit"
            disabled={pending || turnstileStatus !== 'success'}
            className="w-full px-8 py-4 bg-primary text-primary-foreground border-4 border-foreground font-black uppercase tracking-wide shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all duration-200 cursor-pointer"
          >
            {pending ? t('sending') : t('sendButton')}
            {!pending && <Send className="ml-3 w-5 h-5" />}
          </Button>
        </Form>
      </CardContent>
    </Card>
  );
}
