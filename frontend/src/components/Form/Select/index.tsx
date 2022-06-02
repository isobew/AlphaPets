import * as S from "./styles";

interface SelectTypes {
  text: string;
  name: string;
  options: any;
  handleOnChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

function Select({ text, name, options, handleOnChange, value }: SelectTypes) {
  return (
    <S.FormControl>
      <S.FormLabel htmlFor={name}>{text}: </S.FormLabel>
      <S.FormSelect
        name={name}
        id={name}
        onChange={handleOnChange}
        value={value || ''}
      >
          <option>
              Selecione uma opção
          </option>
          {options.map((option: string)=>(
              <option value={option} key={option}>{option}</option>
          ))}
      </S.FormSelect>
    </S.FormControl>
  );
}

export default Select;
