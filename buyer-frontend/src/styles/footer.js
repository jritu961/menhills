import styled from "styled-components";

export const FooterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px;
  background-color:#dc6f00;
  color: #fff;

  /* background-color: #111; */
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

export const FooterCopyright = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #aaa;
  font-size: 12px;
  width: 100%;
`;
