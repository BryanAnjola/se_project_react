import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../Profile/Profile";
import onAddItem from "../AddItemModal/AddItemModal";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { Switch, Route } from "react-router-dom";
import { deleteItems, getItems, postItems } from "../../utils/Api";
import * as Api from "../../utils/Api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [location, setLocation] = useState("");

  const [weathType, setWeathType] = useState("");
  const [sunrise, setSunrise] = useState(null);
  const [sunset, setSunset] = useState(null);

  const dateNow = Date.now() * 0.001;
  const closeModal = () => {
    setActiveModal("");
  };

  const timeOfDay = () => {
    return dateNow >= sunrise && dateNow < sunset;
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {});
  }, []);

  const onAddItem = ({ name, link, weatherType, id }) => {
    const item = { name, imageUrl: link, weather: weatherType, id: 99 };
    Api.addItems(item)
      .then((res) => {
        setClothingItems([item, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleCreateModal = () => {
    setActiveModal("create");
  };
  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleOpenConfirmationModal = () => {
    setActiveModal("confirmation-opened");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "C" ? "F" : "C");
  };
  const handleDeleteCard = (cardElement) => {
    deleteItems(cardElement)
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
  return (
    <div>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
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
          <Route path="/profile">
            <Profile
              clothingItems={clothingItems}
              onCreateModal={handleCreateModal}
              onSelectCard={handleSelectedCard}
            ></Profile>
          </Route>
        </Switch>
        <Footer />
        {activeModal === "create" && (
          <AddItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "create"}
            onAddItem={onAddItem}
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
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
