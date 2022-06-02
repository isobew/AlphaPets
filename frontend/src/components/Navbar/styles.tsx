import styled from "styled-components";


export const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 1em 1.5em;
    background-color: #353535;

    @media (max-width: 600px){
        flex-direction: column;
        gap: 10px;
        align-items: center;
    }
`

export const Navigation = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    gap: 10px;
    
    li a, .logout {
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        transition: 0.5s;
        padding: 0.5em 0.8em;
        border-radius: 5px;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
        letter-spacing: 1px;
    }

    li a:hover, .logout:hover {
        background-color: #ffa500;
        color: #000;
    }

`

export const LogoContainer = styled.div`
    display: flex;
    align-items: center;

    h2 {
        color: orange;
        font-family: 'Poppins', sans-serif;
        font-weight: 200;
    }
`

export const LogoImg = styled.img`
    width: 40px;
    margin-right: 0.8em;
`