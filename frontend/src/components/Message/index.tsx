import { useEffect, useState } from "react";
import bus from "../../utils/bus";

import * as S from "./styles";

type MessageTypes = JSX.Element;

function Message(): MessageTypes {
  const [visibility, setVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {

    bus.addListener('flash', ({message, type}) => {
        setVisibility(true);
        setMessage(message);
        setType(type);

        setTimeout(() => {
            setVisibility(false);
        }, 3000)
    })

  }, []);

  return (
    <>
      {visibility && (
        <S.MessageContainer>
          <div className={`message ${[type]}`}> {message} </div>
        </S.MessageContainer>
      )}
    </>
  );
}

export default Message;
