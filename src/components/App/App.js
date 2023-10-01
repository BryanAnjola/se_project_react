import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import onAddItem from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Switch, Route } from "react-router-dom";
import { deleteItem, fetchItems, addItem } from "../../utils/Api";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import { register, signin, checkToken } from "../../utils/auth";
import * as api from "../../utils/Api";
import { AppContext } from "../AppContext/AppContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import UnAuthHeader from "../UnAuthHeader/UnAuthHeader";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [currentUser, SetCurrentUser] = useState(null);
  const [location, setLocation] = useState("");
  const appContextValue = { state: { loggedIn, userData } };

  const [weathType, setWeathType] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  //gets the date
  const dateNow = Date.now() * 0.001;
  const closeModal = () => {
    setActiveModal("");
  };

  const timeOfDay = () => {
    return dateNow >= sunrise && dateNow < sunset;
  };

  useEffect(() => {
    fetchItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // adding garments
  const onAddItem = (values) => {
    console.log(values);
    addItem(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
      });
  };
  const handleUpdate = (name, avatar) => {};
  const handleSignupModal = () => {
    setActiveModal("signup");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleOpenConfirmationModal = () => {
    setActiveModal("confirmation-opened");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };
  const handaleRegisteration = (email, password, name, avatar) => {
    register(name, email, password, avatar)
      .then(() => {
        this.setState({
          loggedIn: true,
        });
        setLoggedIn();
        setUserData();
        SetCurrentUser();
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({
      loggedIn: true,
    });
  };
  const handleDeleteCard = (cardElement) => {
    deleteItem(cardElement)
      .then(() => {
        const newClothesList = clothingItems.filter((cards) => {
          return cards.id !== cardElement;
        });
        setClothingItems(newClothesList);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, []);
  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  const handleLogin = (email, password) => {
    signin(email, password)
      .then((response) => response.json())
      .then((data) => {
        if (data.jwt) {
          localStorage.setItem("jwt", data.jwt);
          return data;
        } else {
          return;
        }
      });
  };
  //// youre right here at the moment we are fixing up the routes and protecting them!!
  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser} loggedIn="true">
          <AppContext.Provider value={appContextValue}>
            <Header onCreateModal={handleCreateModal} locationData={location} />
            <Switch>
              <Route exact path="/">
                <Main
                  weatherTemp={temp}
                  weatherType={weathType}
                  onSelectCard={handleSelectedCard}
                  timeOfDay={timeOfDay()}
                  clothingItems={clothingItems}
                  onClose={closeModal}
                />
              </Route>
              <ProtectedRoute path="/profile">
                <Profile
                  clothingItems={clothingItems}
                  onCreateModal={handleCreateModal}
                  onSelectCard={handleSelectedCard}
                ></Profile>
              </ProtectedRoute>
            </Switch>
            <Footer />
            {activeModal === "create" && (
              <AddItemModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                onAddItem={onAddItem}
              />
            )}
            {activeModal == "signup" && (
              <RegisterModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "create"}
                handaleRegisteration={handaleRegisteration}
                setActiveModal={setActiveModal}
              />
            )}
            {activeModal == "login" && (
              <LoginModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "login"}
                handleLogin={handleLogin}
                onClickLogin={handleLoginModal}
                setActiveModal={setActiveModal}
              />
            )}
            {activeModal == "update" && (
              <EditProfileModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "update"}
                handleUpdate={handleUpdate}
                onClickSignup={handleSignupModal}
              />
            )}
            {activeModal === "confirmation-opened" && (
              <DeleteConfirmationModal
                onClose={handleCloseModal}
                card={selectedCard}
                handleDeleteCard={handleDeleteCard}
              />
            )}
            {activeModal === "preview" && (
              <ItemModal
                onClose={handleCloseModal}
                selectedCard={selectedCard}
                handleOpenConfirm={handleOpenConfirmationModal}
              />
            )}
          </AppContext.Provider>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
