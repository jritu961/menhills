import styled from 'styled-components';

export const MensWearContainer = styled.div`
  background: linear-gradient(145deg, #f5f5f5, #e9e9e9); /* Subtle gradient for a clean background */
  text-align: center;
  min-height: 100vh;
`;

export const PageTitle = styled.h1`
  font-size: 2.8rem;
  color: #333; /* Dark gray for readability */
  margin-bottom: 30px;
  text-transform: uppercase; /* Adds a bold and modern touch */
  font-weight: 700;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  justify-content: space-around;
  margin:10px 20px;
`;

export const ProductCard = styled.div`
  background:#F5F5F5; /* Clean white card */
  border: 1px solid #ddd;

  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  &:hover {
    transform: translateY(-10px) scale(1.02); /* Slightly lift and enlarge */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15); /* Enhanced shadow */
    border-color: #2B2B2B; /* Highlighted border on hover */
  }

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 15px;
    max-height: 280px;
    object-fit: cover;
    transition: transform 0.3s ease, filter 0.3s ease;

    &:hover {
      transform: scale(1.05); /* Subtle zoom effect */
      filter: brightness(1.1); /* Slight brightness increase */
    }
  }

  h3 {
    font-size: 1.4rem;
    color: #444; /* Neutral dark gray for text */
    margin: 10px 0;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #2B2B2B; /* Professional blue accent on hover */
    }
  }

  p {
    font-size: 1.1rem;
    color: #2B2B2B; /* Consistent blue for pricing */
    font-weight: 700;
    margin-top: 5px;
  }
`;
