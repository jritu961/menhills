import styled from "styled-components";

export const NavbarMainContainer = styled.div`
  display: flex;
  width:100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: linear-gradient(90deg, #333, #555);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

export const NavbarLogo = styled.div`
  font-family: 'Pacifico', cursive;
  font-size: 2rem;
  color: #fff;
  cursor: pointer;
`;

export const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .icon {
    font-size: 24px;
    color: #fff;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #ff6347;
    }
  }
`;

export const Navbar = styled.nav`
display:flex;
  @media (max-width: 768px) {
    ${NavbarMainContainer} {
      flex-direction: column;
      align-items: flex-start;
    }
    ${NavbarRight} {
      margin-top: 10px;
    }
  }
`;
