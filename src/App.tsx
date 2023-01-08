import { useAsyncEffect } from "./hooks/use-async";
import { getPhoneNumberList } from "./service/twilio/twilio";

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

  console.log(result);

  return <div>My Twilio App</div>;
}

export default App;
