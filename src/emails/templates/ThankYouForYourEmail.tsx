import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import {useTranslations} from 'next-intl';

type Props = { firstName: string; locale: string };

export default async function ThankYouForYourEmail({ firstName, locale }: Props) {
  const t = useTranslations('emails.thankYouForYourEmail');

  return (
    <Html>
      <Body>
        <Container>
          <Heading>{t('heading', { firstName })}</Heading>
          <Text>{t('body')}</Text>
        </Container>
      </Body>
    </Html>
  );
}


