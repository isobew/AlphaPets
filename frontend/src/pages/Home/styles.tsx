import styled from "styled-components";

export const PetHomeHeader = styled.div`
  margin-bottom: 2em;

  h1 {
    margin-bottom: 0.3em;
  }
`;

export const PetContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  justify-content: center;

  a {
    margin-top: 20px;
    text-decoration: none;
    background-color: #fff;
    color: #353535;
    font-family: "poppins", sans-serif;
    font-weight: 400;
    cursor: pointer;
    transition: 0.5s;
    padding: 5px 12px;
    border-radius: 5px;
    border: 2px solid #353535;
    font-size: 1.1em;

    &:hover {
      background-color: #353535;
      color: #fff;
    }
  }
`;

export const PetCardContainer = styled.div`
  margin: 1.5%;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const DisabledButton = styled.button`
  margin-top: 20px;
  text-decoration: none;
  background-color: #a8a7a7;
  color: #353535;
  font-family: "poppins", sans-serif;
  font-weight: 400;
  transition: 0.5s;
  padding: 5px 12px;
  border-radius: 5px;
  border: 2px solid #353535;
  font-size: 1.1em;
  opacity: 0.7;
`;
