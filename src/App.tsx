import { useAsyncEffect } from "./hooks/use-async";
import  styled from "styled-components";
import { getPhoneNumberList } from "./service/twilio/twilio";


export const Title = styled.h1.attrs({
  className: "text-3xl font-bold underline"
})``;

function App() {
  const areaCode = 510;
  const pageSize = 1000;

  const [result] = useAsyncEffect({
    fn: async () => {
      const result = await getPhoneNumberList(areaCode, pageSize);
      return result.data;
    },
    dependencies: [],
  });

  return <Title>My Twilio App</Title>
}

export default App;
