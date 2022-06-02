import styled from "styled-components";

export const FormControl = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1em;
`

export const FormLabel = styled.label`
    margin-bottom: .3em;
    font-weight: bold;
    font-size: .8em;
`

export const FormInput = styled.input`
    padding: .7em;
    border: 1px solid #777;
    border-radius: 5px;

    &::placeholder {
        color: #7b7b7b;
    }
`