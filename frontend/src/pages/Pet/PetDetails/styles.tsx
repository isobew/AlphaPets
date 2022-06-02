import styled from "styled-components";

export const PetDetailsContainer = styled.section`
    text-align: center;

    p {
        margin-bottom: 1em;
    }

    button, a {
    margin-top: 20px;
    text-decoration: none;
    background-color: #25B456;
    color: #fff;
    font-family: "poppins", sans-serif;
    font-weight: 400;
    cursor: pointer;
    transition: 0.5s;
    border: 2px solid transparent;
    padding: 5px 12px;
    border-radius: 5px;
    font-size: 1.1em;

    &:hover {
      border: 2px solid #25B456;
      background-color: transparent;
      color: #25B456;
    }
  }
`

export const PetDetailsHeader = styled.div`
    margin-bottom: 2em;
`

export const PetImagesContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 1em;
    gap: 30px;
    flex-wrap: wrap;
`