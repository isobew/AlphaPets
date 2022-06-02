import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 0 auto;
  padding: 30px 0;
  background-color: #fff;
  border-radius: 15px;

  input[type='text'], input[type='email'], input[type='password'] {
    padding: 0.7em;
    width: 100%;
    border: solid #777;
    border-width: 0 0 1.5px 0 ;
    border-radius: 2px;
    outline: none;
    margin-bottom: 15px;

    &::placeholder {
      color: #7b7b7b;
    }
  }
`;

export const FormContainerInput = styled.input`
    &[type='submit'] {
        border-radius: 8px;
        background-color: #25b456;
        color #fff;
        border: none;
        min-width: 100px;
        min-height: 2.5em;
        width: 100%;
        cursor: pointer;
        font-size: 1.1em;
        font-weight: bold;

        &:hover {
            background-color: #1C8A42;
        }
    }
`;

export const ProfileHeader = styled.div`
    text-align: center;
    margin: 1em 0;
`