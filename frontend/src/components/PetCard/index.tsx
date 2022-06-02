import * as S from "./styles";

interface PetCardTypes {
    name: string
    weight: string
    backgroundImage: string
}

function PetCard({name, weight, backgroundImage}: PetCardTypes) {
  return (
    <S.PetCard>
      <S.PetCardImage style={{backgroundImage: backgroundImage}}></S.PetCardImage>
      <h3>{name}</h3>
      <p>
        <span>Peso:</span> {weight}kg
      </p>
    </S.PetCard>
  );
}

export default PetCard;
