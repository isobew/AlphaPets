import styled from "styled-components";

export const MyAdoptionsContainer = styled.section`
    display: flex;
    padding: 30px;
    gap: 40px;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
`

export const MyAdoptionsCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 10px;
    gap: 20px;

    span {
        min-width: 100px;
        text-align: center;
    }
`
export const PetListHeader = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;

    h1{
        margin: 0;
    }

    a {
        text-decoration: none;
        background-color: #353535;
        color: #FFF;
        font-family: 'poppins', sans-serif;
        font-weight: 300;
        cursor: pointer;
        transition: 0.5s;
        border: 2px solid;
        padding: 0.5em 0.8em;
        border-radius: 5px;

        &:hover {
            background-color: transparent;
            /* background-color: #dba94c; */
            color: #000;
        }
    }

`

export const Actions = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   gap: 20px;

   a, button {
        text-decoration: none;
        background-color: #fff;
        color: #353535;
        font-family: 'poppins', sans-serif;
        font-weight: 400;
        cursor: pointer;
        transition: 0.5s;
        border: 2px solid;
        padding:7px 12px;
        border-radius: 5px;
        font-size: 14px;

        &:hover {
            background-color: #353535;
            color: #fff;
        }
    }
`

export const ConcludeButton = styled.button`
    color: #25b456;
    border-color: #25b456;

    &:hover {
        color: #fff;
        background-color: #25b456;
    }
`

export const Contact = styled.div`
    margin-left: 2em;

    p {
        margin-bottom: 0.5em;
    }
`