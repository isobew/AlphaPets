import * as S from "./styles";

import api from "../../utils/api";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PetCard from "../../components/PetCard";

interface PetTypes {
  name: string
  _id: string
  images: string[]
  available: boolean
  user: {
    phone: string
    name: string
  }
  adopter: {
    name: string
    _id: string
  }
  weight: string
}

function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <section>
      <S.PetHomeHeader>
        <h1>Adote um pet</h1>
        <p>Veja os detalhes de cada pet e contate o tutor.</p>
      </S.PetHomeHeader>
        <S.PetContainer>
          {pets.length > 0 &&
            pets.map((pet: PetTypes) => (
              <S.PetCardContainer key={pet._id}>
                <PetCard 
                  name={pet.name} 
                  weight={pet.weight} 
                  backgroundImage={`url(http://127.0.0.1:5000/images/pets/${pet.images[0]})`}
                />
                {pet.available ? (
                  <Link to={`/pet/${pet._id}`}>Mais detalhes</Link>
                ) : (
                  <S.DisabledButton disabled={true}>Adotado</S.DisabledButton>
                )}
              </S.PetCardContainer>
            ))}
          {pets.length === 0 && (
            <p>
              Não há pets cadastrados ou disponíveis para adoção no momento.
            </p>
          )}
        </S.PetContainer>
    </section>
  );
}

export default Home;
