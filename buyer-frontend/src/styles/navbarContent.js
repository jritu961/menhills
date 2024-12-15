import styled from "styled-components";

// Navbar Main Container
export const NavbarMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: linear-gradient(90deg, #333, #555);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;

  .desktop-menu {
    display: flex;
    align-items: center;
    gap:20px;
  }

  .mobile-menu {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: #333;
    padding: 10px 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  @media (max-width: 1000px) {
    .desktop-menu {
      display: none;
    }
    .mobile-menu {
      display: flex;
      transform: ${({ isMenuOpen }) =>
        isMenuOpen ? "translateY(0)" : "translateY(-100%)"};
    }
  }
`;

// Navbar Heading Styling
export const NavbarHeading = styled.div`
  font-size: 1.1rem;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  margin: 10px 0;
  position: relative;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6347;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    left: 0;
    bottom: -5px;
    background-color: #ff6347;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

export const Navbar = styled.nav`
  @media (max-width: 768px) {
    ${NavbarMainContainer} {
      flex-direction: column;
      align-items: flex-start;
    }
    ${NavbarHeading} {
      margin: 10px 0;
    }
  }
`;
