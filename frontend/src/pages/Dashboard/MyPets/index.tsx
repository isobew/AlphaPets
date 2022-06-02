import * as S from "./styles";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Image from "../../../components/Image";
import useFlashMessage from "../../../hooks/useFlashMessage";
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
  adopter: {
    name: string
    _id: string
  }
}

function MyPets() {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  async function removePet(id: string) {
    let msgType = "success";

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPets = pets.filter((pet: PetTypes) => pet._id !== id);
        setPets(updatedPets);
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  async function concludeAdoption(id: string) {
    let msgType = "success";

    const data = await api
      .patch(`/pets/conclude/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType = "error";
        return err.response.data;
      });

    setFlashMessage(data.message, msgType);
  }

  return (
    <section>
      <S.PetListHeader>
        <h1>Meus pets para adoção</h1>
        <Link to="/pet/add">Cadastrar pet</Link>
      </S.PetListHeader>
      <S.MyPetsContainer>
        {pets.length > 0 &&
          pets.map((pet: PetTypes) => (
            <S.MyPetsCard key={pet._id}>
              <Image
                src={`http://127.0.0.1:5000/images/pets/${pet.images[0]}`}
                alt={pet.name}
              />
              <span>{pet.name}</span>
              <S.Actions>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button
                        onClick={() => {
                          concludeAdoption(pet._id);
                        }}
                      >
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id);
                      }}
                    >
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado</p>
                )}
              </S.Actions>
            </S.MyPetsCard>
          ))}
        {pets.length === 0 && <p>Não há pets cadastrados</p>}
      </S.MyPetsContainer>
    </section>
  );
}

export default MyPets;
