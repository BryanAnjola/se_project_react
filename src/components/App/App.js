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
import { currentTemperatureUnitContext } from "../../contexts/CurrentTempetureUnitContext.js";
import { Switch, Route } from "react-router-dom";
import { deleteItems, getItems, postItems } from "../../utils/Api";
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

  const timeOfDay = () => {
    if (dateNow >= sunrise && dateNow < sunset) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onAddItem = (values) => {
    postItems(values)
      .then((data) => {
        setClothingItems([data, ...clothingItems]);
        handleCloseModal();
      })
      .catch((error) => {
        console.error(error.status);
      });
  };

  const handleCreateModal = () => {
    setActiveModal("create");
  };
  useEffect(() => {
    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleEscClose);

    return () => {
      window.removeEventListener("keydown", handleEscClose);
    };
  }, []);

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
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  const handleDeleteCard = (cardElement) => {
    console.log(cardElement);
    deleteItems(cardElement)
      .then(() => {
        const newClothesList = clothingItems.filter((cards) => {
          return cards.id !== cardElement;
        });
        console.log(newClothesList);
        setClothingItems(newClothesList);
        handleCloseModal();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getForecastWeather()
      .then((data) => {
        const temperature = parseWeatherData(data);
        setTemp(temperature);
        const locationName = data.name;
        setLocation(locationName);
        const weatherType = data.temperature[0].main;
        setWeathType(weatherType.toLowerCase());
        const sunriseData = data.sys.sunrise;
        setSunrise(sunriseData);
        const sunsetData = data.sys.sunset;
        setSunset(sunsetData);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <currentTemperatureUnitContext.Provider
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
        {activeModal === "open" && (
          <ItemModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "open"}
            onAddItem={onAddItem}
            handleOpenConfirm={handleOpenConfirmationModal}
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
            selectedCard={selectedCard}
            onclose={handleCloseModal}
            handleDeleteCard={handleDeleteCard}
          />
        )}
      </currentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
