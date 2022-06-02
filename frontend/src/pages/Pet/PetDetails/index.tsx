import * as S from "./styles";

import api from "../../../utils/api";

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import useFlashMessage from "../../../hooks/useFlashMessage";
import Image from "../../../components/Image";

function PetDetails() {
  const [pet, setPet] = useState<any>({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api
      .get(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPet(response.data.pet);
      });
  }, [token, id]);

  async function schedule() {
    let msgType = "success";

    const data = await api
      .patch(`/pets/schedule/${pet._id}`, {
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
    <>
      {pet.name && (
        <S.PetDetailsContainer>
          <S.PetDetailsHeader>
            <h1>Conheça o pet {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita para conhecê-lo.</p>
          </S.PetDetailsHeader>
          <S.PetImagesContainer>
            {pet.images.map((image: string, index: string) => (
              <Image
                src={`http://127.0.0.1:5000/images/pets/${image}`}
                alt={pet.name}
                key={index}
              />
            ))}
          </S.PetImagesContainer>
          <p>
            <span>Peso: </span>
            {pet.weight}
          </p>
          <p>
            <span>Idade: </span>
            {pet.age}
          </p>
          {token ? (
            <button onClick={schedule}>Solicitar uma visita</button>
          ) : (
            <p>
              Você precisa <Link to="/register">criar uma conta</Link> para
              solicitar a visita.
            </p>
          )}
        </S.PetDetailsContainer>
      )}
    </>
  );
}

export default PetDetails;
