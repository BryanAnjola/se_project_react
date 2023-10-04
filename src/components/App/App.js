import "./App.css";
import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import UnAuthHeader from "../UnAuthHeader/UnAuthHeader";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import onAddItem from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { Switch, Route, Redirect } from "react-router-dom";
import {
  deleteItem,
  fetchItems,
  addItem,
  editUserProfile,
} from "../../utils/Api";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import { register, signIn, checkToken } from "../../utils/auth";
import * as api from "../../utils/Api";
import { AppContext } from "../AppContext/AppContext";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [location, setLocation] = useState("");
  const appContextValue = { state: { loggedIn, userData } };
  const [clothingItems, setClothingItems] = useState([]);
  const [redirectToProfile, setRedirectToProfile] = useState(false);
  const [token, setToken] = React.useState("");

  const [weathType, setWeathType] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);
  //gets the date
  const dateNow = Date.now() * 0.001;
  const closeModal = () => {
    setActiveModal("");
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };

  const handleSignupModal = () => {
    setActiveModal("signup");
  };

  const handleLoginModal = () => {
    setActiveModal("login");
  };

  const handleUpdate = (name, avatar) => {};

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    fetchItems()
      .then((res) => {
        setClothingItems(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const timeOfDay = () => {
    return dateNow >= sunrise && dateNow < sunset;
  };

  // adding garments
  const onAddItem = (values) => {
    console.log(values);
    addItem(values)
      .then((data) => {
        setClothingItems([{ data, ...clothingItems }]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
      });
  };

  const handleDeleteCard = (cardElement) => {
    deleteItem(cardElement)
      .then(() => {
        console.log("Type of clothingItems:", typeof clothingItems);
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

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };

  const handleOpenConfirmationModal = () => {
    setActiveModal("confirmation-opened");
  };

  const handaleRegisteration = (email, password, nameValue, avatarValue) => {
    register({
      email: email,
      password: password,
      name: nameValue,
      avatar: avatarValue,
    })
      .then((res) => {
        this.setState({
          loggedIn: true,
        });
        setCurrentUser(res);
        handleLogin({ email, password });
        setLoggedIn(true);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error);
      });
    this.setState({
      loggedIn: true,
    });
  };
  const handleLogin = (email, password) => {
    signIn(email, password)
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          console.log(data);
          checkToken(data)
            .then((res) => {
              console.log(res);
              setCurrentUser(res);
              handleCloseModal();
              setLoggedIn(true);
              setRedirectToProfile(true);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          return;
        }
      });
  };
  const handleEditProfile = (data) => {
    setIsLoading(true);
    editUserProfile(data)
      .then((res) => setCurrentUser(res))
      .then(() => handleCloseModal())
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  };
  const handleLogout = () => {
    setToken(localStorage.removeItem("jwt"));
    setCurrentUser(null);
    setIsLoggedIn(false);
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((data) => {
          console.log(data);
          setCurrentUser(data.user); // Set the user data in your component state
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          // Handle error fetching user data here
        });
    } else {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      console.log("Token not found");
    }
  }, [loggedIn]);

  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser} loggedIn="true">
          <AppContext.Provider value={appContextValue}>
            {loggedIn ? (
              <Header
                onCreateModal={handleCreateModal}
                temp={temp}
                user={currentUser}
              />
            ) : (
              <UnAuthHeader
                onClickSignUp={handleSignupModal}
                OnClickLogIn={handleLoginModal}
                temp={temp}
              />
            )}
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
              <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
                <Profile
                  clothingItems={clothingItems}
                  onCreateModal={handleCreateModal}
                  onEditModal={EditProfileModal}
                  onSignOut={handleLogout}
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
            {activeModal === "edit" && (
              <EditProfileModal
                handleCloseModal={handleCloseModal}
                isOpen={activeModal === "edit"}
                currentUser={currentUser} // Pass currentUser inside the object
                handleUpdate={handleEditProfile}
                isLoading={isLoading}
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
            {redirectToProfile && <Redirect to="/profile" />}
          </AppContext.Provider>
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}
export default App;
