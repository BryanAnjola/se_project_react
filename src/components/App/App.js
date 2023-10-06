import React, { useEffect, useState } from "react";

import "./App.css";
import "../ModalWithForm/ModalWithForm.css";
import "../ItemModal/ItemModal.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { deleteItems, getItems, postItems } from "../../utils/api";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import {
  signin,
  signup,
  checkToken,
  editProfileData,
  likeClothingItem,
  dislikeClothingItem,
} from "../../utils/auth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const [modalOpened, setModalOpened] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [location, setLocation] = useState("");
  const [temp, setTemp] = useState({});
  const [clothingItems, setClothingItems] = useState([]);

  const [weathType, setWeathType] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const dateNow = Date.now() * 0.001;

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const closeModal = () => {
    setModalOpened("");
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        // This is with the MongoDB url
        setClothingItems(data.data);

        // This is with the TripleTen clothing database
        // setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getWeather()
      .then((data) => {
        const weather = {
          temperature: {
            F: Math.round(data.main.temp),
            C: Math.round(((data.main.temp - 32) * 5) / 9),
          },
        };
        setTemp(weather);
        const locationName = data.name;
        setLocation(locationName);
        const weatherType = data.weather[0].main;
        setWeathType(weatherType.toLowerCase());
        const sunriseData = data.sys.sunrise;
        setSunrise(sunriseData);
        const sunsetData = data.sys.sunset;
        setSunset(sunsetData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const timeOfDay = () => {
    if (dateNow >= sunrise && dateNow < sunset) {
      return true;
    } else {
      return false;
    }
  };
  /* Modal functions */
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleEscClose);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, []);

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleModalOpen = (elementName) => {
    setModalOpened(elementName);
  };

  const handleRedirect = (e) => {
    if (e.target === e.currentTarget) {
      if (modalOpened === "register-modal-opened") {
        setModalOpened("login-modal-opened");
      } else if (modalOpened === "login-modal-opened") {
        setModalOpened("register-modal-opened");
      }
    }
  };

  /* Item Card Image functions */
  const handleSelectedCard = (card) => {
    setModalOpened("open");
    setSelectedCard(card);
  };
  // Handle toggle switch
  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  // Delete Card
  const handleDeleteCard = (cardElement) => {
    deleteItems(cardElement)
      .then(() => {
        const newClothesList = clothingItems.filter((cards) => {
          return cards._id !== cardElement;
        });
        setClothingItems(newClothesList);
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Add Item

  const onAddItem = (clothingValues) => {
    postItems(clothingValues)
      .then((newClothingCard) => {
        setClothingItems((oldClothingArray) => {
          return [newClothingCard.data, ...oldClothingArray];
        });
        closeModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Form Validator
  const [validate, setValidate] = useState("");

  const handleValidation = (e) => {
    console.log(e.target.value);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // Sending user info to Database

  const handleUserRegister = (values) => {
    signup(values)
      .then((res) => {
        setCurrentUser(res);
        handleUserLogin(values);
      })
      .then(() => {
        closeModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleUserLogin = (values) => {
    const { email, password } = values;

    signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        verifyToken();
      })
      .then(() => {
        closeModal();
      })
      .catch((err) => console.error(err));
  };
  // Check token

  function verifyToken() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      checkToken(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser(res);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => console.error(err));
    }
  }

  const handleUserLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  // Handle Edit User profile data

  const handleUserProfileData = (data) => {
    editProfileData(data)
      .then((res) => {
        setCurrentUser(res.data);
        closeModal();
      })
      .catch((err) => console.error(err));
  };

  ///////// Handle Likes ///////////
  const handleLikeClick = (cardData, isLiked) => {
    !isLiked
      ? likeClothingItem(cardData._id)
          .then((updatedCard) =>
            setClothingItems((cards) =>
              cards.map((mappedCards) =>
                mappedCards._id === cardData._id
                  ? updatedCard.data
                  : mappedCards
              )
            )
          )
          .catch((err) => {
            console.error(err);
          })
      : dislikeClothingItem(cardData._id)
          .then((updatedCard) =>
            setClothingItems((cards) =>
              cards.map((mappedCards) =>
                mappedCards._id === cardData._id
                  ? updatedCard.data
                  : mappedCards
              )
            )
          )
          .catch((err) => {
            console.error(err);
          });
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <BrowserRouter>
        <div className="page">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="App">
              <Header
                locationData={location}
                openModal={handleModalOpen}
                isLoggedIn={isLoggedIn}
              />
              <Switch>
                <Route exact path="/">
                  <Main
                    weatherTemp={temp}
                    weatherType={weathType}
                    onSelectCard={handleSelectedCard}
                    timeOfDay={timeOfDay()}
                    clothingItems={clothingItems}
                    onCardLike={handleLikeClick}
                    isLoggedIn={isLoggedIn}
                  />
                </Route>
                <ProtectedRoute path="/profile">
                  <Route path="/profile">
                    <Profile
                      onSelectCard={handleSelectedCard}
                      clothingItems={clothingItems}
                      handleUserLogout={handleUserLogout}
                      openModal={handleModalOpen}
                      onCardLike={handleLikeClick}
                      isLoggedIn={isLoggedIn}
                    />
                  </Route>
                </ProtectedRoute>
              </Switch>
              <Footer />

              {modalOpened === "open" && (
                <ItemModal
                  onClose={handleCloseModal}
                  selectedCard={selectedCard}
                  handleOpenConfirm={handleModalOpen}
                  isLoggedIn={isLoggedIn}
                />
              )}

              {modalOpened === "confirmation-opened" && (
                <DeleteConfirmationModal
                  onClose={handleCloseModal}
                  card={selectedCard}
                  handleDeleteCard={handleDeleteCard}
                />
              )}
              {modalOpened === "new-clothes-modal" && (
                <AddItemModal
                  isOpen={modalOpened === "new-clothes-modal"}
                  onAddItem={onAddItem}
                  onCloseModal={handleCloseModal}
                />
              )}

              {modalOpened === "register-modal-opened" && (
                <RegisterModal
                  isOpen={modalOpened === "register-modal-opened"}
                  onCloseModal={handleCloseModal}
                  onRedirect={handleRedirect}
                  userRegister={handleUserRegister}
                />
              )}
              {modalOpened === "login-modal-opened" && (
                <LoginModal
                  isOpen={modalOpened === "login-modal-opened"}
                  onCloseModal={handleCloseModal}
                  onRedirect={handleRedirect}
                  userLogin={handleUserLogin}
                />
              )}
              {modalOpened === "edit-profile-modal-opened" && (
                <EditProfileModal
                  isOpen={modalOpened === "edit-profile-modal-opened"}
                  onCloseModal={handleCloseModal}
                  submitEditProfileData={handleUserProfileData}
                />
              )}
            </div>
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
