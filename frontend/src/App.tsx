import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./styles/globalStyles";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Container from "./components/Container";
import Message from "./components/Message";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import MyAdoptions from "./pages/Dashboard/MyAdoptions";
import PetDetails from "./pages/Pet/PetDetails";
import Profile from "./pages/Profile";
import MyPets from "./pages/Dashboard/MyPets";
import AddPet from "./pages/Pet/AddPet";
import EditPet from "./pages/Pet/EditPets";

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <GlobalStyle />
      <UserProvider>
        <Navbar />
        <Message />
        <Container>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="/pets/mypets" element={<MyPets />} />
            <Route path="/pet/add" element={<AddPet />} />
            <Route path="/pet/edit/:id" element={<EditPet />} />
            <Route path="/pets/myadoptions" element={<MyAdoptions />} />
            <Route path="/pet/:id" element={<PetDetails />} />
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
