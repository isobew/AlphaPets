import styled from "styled-components";

interface ImageTypes{
    width?: string
}

export const Image = styled.img<ImageTypes>`
    width: 200px;
    height: 200px;
    border-radius: 100%;
    /* border: 2px solid; */
    object-fit: cover;
    
    ${({ width }) =>
        width &&
    `
      width: ${width}px;
  `
}
`