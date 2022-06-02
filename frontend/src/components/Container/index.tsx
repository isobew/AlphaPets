import * as S from './styles';

interface ContainerTypes {
    children: React.ReactNode;
}

function Container({children}: ContainerTypes) {
    return (
        <S.Container>
            {children}
        </S.Container>
    )
}

export default Container