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
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px 0;
  background-color: #fff;
  border-radius: 15px;

  div label {
      text-align: left;
  }

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

export const PreviewPetImages = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2em;
    flex-wrap: wrap;
    gap: 10px;

    img {
        width: 100px;
        height: 100px;
        margin-left: 1em;
        object-fit: cover;
    }
`

