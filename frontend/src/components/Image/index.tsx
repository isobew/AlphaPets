import * as S from './styles';

interface ImageTypes {
    src: string,
    alt: string,
    width?: string
}

function Image({src, alt, width}: ImageTypes){
    return(
        <S.Image
            src={src}
            alt={alt}
            width={width}
        />
    )
}

export default Image