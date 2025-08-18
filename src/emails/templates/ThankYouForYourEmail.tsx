import { Html } from "@react-email/html";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
type Props = {
  firstName: string;
  heading: string;
  body: string;
};

export default function ThankYouForYourEmail({ firstName, heading, body }: Props) {
  return (
    <Html>
      <Body>
        <Container>
          <Heading>{heading}</Heading>
          <Text>{body}</Text>
        </Container>
      </Body>
    </Html>
  );
}


