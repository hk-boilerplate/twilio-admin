import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { PhoneNumberListContainer } from "./containers/PhoneNumbers/PhoneNumberListContainer";

export const ShellComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<PhoneNumberListContainer />} />
      </Routes>
    </Router>
  );
};
