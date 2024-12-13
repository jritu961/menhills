import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px;
  background-color: #111;
  color: #fff;
`;

export const FooterSection = styled.div`
  flex: 1;
  margin: 10px;
  min-width: 200px;
`;

export const FooterTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: #fff;
  font-weight: bold;
`;

export const FooterLink = styled.a`
  display: block;
  color: #aaa;
  margin-bottom: 10px;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: #fff;
    text-decoration: underline;
  }
`;

export const FooterData = styled.div`
  font-size: 14px;
  color: #aaa;
  line-height: 1.5;
`;

export const FooterSocialIcons = styled.div`
  display: flex;
  gap: 10px;

  a {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;

export const NewsletterForm = styled.form`
  display: flex;
  gap: 10px;
`;

export const NewsletterInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

export const NewsletterButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff5733;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #c0392b;
  }
`;

export const FooterCopyright = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #aaa;
  font-size: 12px;
  width: 100%;
`;
