import * as S from "./styles";
import { useState, useEffect } from "react";

import Image from "../../../components/Image";
import api from "../../../utils/api";

interface PetTypes {
  name: string
  _id: string
  images: string[]
  available: boolean
  user: {
    phone: string
    name: string
  }
}

function MyAdoptions() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get("/pets/myadoptions", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  return (
    <section>
      <S.PetListHeader>
        <h1>Minhas adoções</h1>
      </S.PetListHeader>
      <S.MyAdoptionsContainer>
        {pets.length > 0 &&
          pets.map((pet: PetTypes) => (
            <S.MyAdoptionsCard key={pet._id}>
              <Image
                src={`http://127.0.0.1:5000/images/pets/${pet.images[0]}`}
                alt={pet.name}
              />
              <span>{pet.name}</span>
              <S.Contact>
                  <p>
                      <span>Ligue para: </span>
                      {pet.user.phone}
                  </p>
                  <p>
                      <span>Fale com: </span>
                      {pet.user.name}
                  </p>
              </S.Contact>
              <S.Actions>
                {pet.available ? (
                  <p>Adoção em processo.</p>
                ) : (
                  <p>Parabéns por concluir a adoção!</p>
                )}
              </S.Actions>
            </S.MyAdoptionsCard>
          ))}
        {pets.length === 0 && <p>Ainda não há adoções de pets.</p>}
      </S.MyAdoptionsContainer>
    </section>
  );
}

export default MyAdoptions;
