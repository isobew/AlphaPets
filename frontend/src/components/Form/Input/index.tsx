import * as S from "./styles";

type EventType = React.ChangeEvent<HTMLInputElement>

interface InputTypes {
  type: string;
  text: string;
  name: string;
  placeholder?: string;
  handleOnChange: (e:EventType) => void
  value?: string;
  multiple?: boolean;
}

function Input({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
}: InputTypes) {
  return (
    <S.FormControl>
      <S.FormLabel htmlFor={name}>{text}: </S.FormLabel>
      <S.FormInput
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        {...(multiple? {multiple} : "")}
      />
    </S.FormControl>
  );
}

export default Input