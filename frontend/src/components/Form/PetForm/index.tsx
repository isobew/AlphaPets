import React, { useState } from 'react';

import * as S from './styles';

import Input from '../Input';
import Select from '../Select';

interface PetFormTypes {
    handleSubmit: (pet: object) => void
    petData?: string
    btnText: string
}

function PetForm({handleSubmit, petData, btnText}: PetFormTypes) {
    const [pet, setPet] = useState<any>(petData || {})
    const [preview, setPreview] = useState<File[]>([]);
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) return;
        setPreview(Array.from(e.target.files));
        setPet({...pet, images: [...e.target.files]});
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPet({...pet, [e.target.name]: [e.target.value]})
    }

    function handleColor(e: React.ChangeEvent<HTMLSelectElement>) {
        setPet({...pet, color: e.target.options[e.target.selectedIndex].text})
    }

    function submit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        handleSubmit(pet);
    }

    return (
       <S.FormContainer onSubmit={submit}>
           <S.PreviewPetImages>
               {preview.length > 0 
                ? preview.map((image: File, index: number) => (
                    <img 
                        src={URL.createObjectURL(image)}
                        alt={pet.name}
                        key={`${pet.name}+${index}`}
                    />
                )) :
                pet.images && 
                pet.images.map((image:string, index:number) => (
                    <img 
                        src={`http://127.0.0.1:5000/images/pets/${image}`}
                        alt={pet.name}
                        key={`${pet.name}+${index}`}
                    />
                ))
               }
           </S.PreviewPetImages>
           <Input 
            text="Imagens do pet"
            type="file"
            name="images"
            handleOnChange={onFileChange}
            multiple={true}
           />
           <Input 
            text="Nome"
            type="text"
            name="name"
            handleOnChange={handleChange}
            placeholder="Digite o nome do pet"
            value={pet.name || ''}
           />
           <Input 
            text="Idade"
            type="text"
            name="age"
            handleOnChange={handleChange}
            placeholder="Digite a idade"
            value={pet.age || ''}
           />
           <Input 
            text="Peso"
            type="text"
            name="weight"
            handleOnChange={handleChange}
            placeholder="Digite o peso"
            value={pet.weight || ''}
           />
           <Select 
            name='color'
            text='Selecione a cor'
            options={colors}
            handleOnChange={handleColor}
            value={pet.color || ''}
           />
           <S.FormContainerInput type='submit' value={btnText} />
       </S.FormContainer> 
    )
}

export default PetForm