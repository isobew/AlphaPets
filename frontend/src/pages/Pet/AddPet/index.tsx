import * as S from './styles';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PetForm from '../../../components/Form/PetForm';
import useFlashMessage from '../../../hooks/useFlashMessage';
import api from '../../../utils/api';

function AddPet() {
    const [token] = useState(localStorage.getItem('token') || '');
    const { setFlashMessage } = useFlashMessage();
    const navigate = useNavigate();

    async function registerPet(pet: any) {
        let msgType = 'success'

        const formData = new FormData();

        await Object.keys(pet).forEach((key) => {
            if(key === 'images'){
                for(let i = 0; i < pet[key].length; i++){
                    formData.append('images', pet[key][i]);
                }
            } else {
                formData.append(key, pet[key]);
            }

          });
      
          const data = await api
            .post('/pets/create', formData, {
              headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                "Content-Type": "multipart/form-data",
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
          
          if(msgType !== "error"){
              navigate('/pets/mypets')
          }
      
    }

    return (
        <S.AddPetHeader>
            <div>
                <h1>Cadastre um Pet</h1>
                <p>O pet cadastrado ficará disponível para adoção</p>
            </div>
            <PetForm handleSubmit={registerPet} btnText='Cadastrar Pet'/>
        </S.AddPetHeader>
    )
}

export default AddPet