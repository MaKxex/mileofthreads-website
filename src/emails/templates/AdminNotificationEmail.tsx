// src/emails/templates/AdminNotificationEmail.tsx
import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";

type Props = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function AdminNotificationEmail({ name, email, subject, message }: Props) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>Новое сообщение с сайта</Heading>
          <Text><b>Имя:</b> {name}</Text>
          <Text><b>Email:</b> {email}</Text>
          <Text><b>Тема:</b> {subject}</Text>
          <Text><b>Сообщение:</b> {message}</Text>
        </Container>
      </Body>
    </Html>
  );
}
