import styled from "styled-components";

export const MessageContainer = styled.section`
    position: fixed;
    right: 20px;

    .message {
        width: 100%;
        padding: 1em;
        border: 1px solid #000;
        margin: 1.2em auto 0;
        text-align: center;
        border-radius: 5px;
    }

    .success {
        color: #155724;
        background-color: #D4EDDA;
        border-color: #C3E6CB;
    }

    .error {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
`