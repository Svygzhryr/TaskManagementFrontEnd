import { FC, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { initialData, UserContext } from "./utils/context";
import Home from "./views/Home";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Register from "./views/Register";

const App: FC = () => {
  const [userData, setUserdata] = useState(initialData);

  const user = {
    data: userData,
    setData: setUserdata,
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <div>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route index path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
