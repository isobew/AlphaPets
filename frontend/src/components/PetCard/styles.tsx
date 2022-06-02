import styled from "styled-components";

export const PetCard = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;

    h3{
        color: #353535;
        margin-bottom: 1em;
        font-size: 1.6em;
        padding: 8px;
    }
`

export const PetCardImage = styled.div`
    background-size: cover;
    background-position: center;
    height: 200px;
    width: 200px;
    margin-bottom: 1.2em;
    border-radius: 100%;
`