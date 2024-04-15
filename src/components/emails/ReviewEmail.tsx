import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    render,
  } from "@react-email/components";
  
  import * as React from "react";
  
  // add craftSync logo/image
  
  interface ReviewEmailTemplateProps {
    actionLabel: string;
    buttonText: string;
    href: string;
    workspaceName: string;
    editorName: string;
  }
  
  export const ReviewEmailTemplate = ({
    actionLabel,
    buttonText,
    href,
    workspaceName,
    editorName,
  }: ReviewEmailTemplateProps) => {
    return (
      <Html>
        <Head />
        <Preview>Elevate Creativity, CraftSync Hub for Collaboration.</Preview>
        <Body style={main}>
          <Container style={container}>
            {/* <Img
                src=""
                width='150'
                height='150'
                alt='Digital Market'
                style={logo}
              /> */}
            <Text style={paragraph}>Hi there,</Text>
            <Text style={paragraph}>
              Welcome to Craft<samp className="text-blue-600">Sync</samp>, {editorName}
              has invited you to review the content of {workspaceName} workspace
            </Text>
            <Section style={btnContainer}>
              <Button style={button} href={href}>
                {buttonText}
              </Button>
            </Section>
            <Text style={paragraph}>
              Best,
              <br />
              The CraftSync team
            </Text>
            <Hr style={hr} />
            {/* <Text style={footer}>
              If you did not request this email, you can safely ignore it.
            </Text> */}
          </Container>
        </Body>
      </Html>
    );
  };
  
  export const ReviewEmailTemplateHtml = (props: ReviewEmailTemplateProps) =>
    render(<ReviewEmailTemplate {...props} />, { pretty: true });
  
  const main = {
    backgroundColor: "#ffffff",
    fontFamily:
      '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
  };
  
  const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
  };
  
  const logo = {
    margin: "0 auto",
  };
  
  const paragraph = {
    fontSize: "16px",
    lineHeight: "26px",
  };
  
  const btnContainer = {
    textAlign: "center" as const,
  };
  
  const button = {
    padding: "12px 12px",
    backgroundColor: "#2563eb",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
  };
  
  const hr = {
    borderColor: "#cccccc",
    margin: "20px 0",
  };
  
  const footer = {
    color: "#8898aa",
    fontSize: "12px",
  };
  