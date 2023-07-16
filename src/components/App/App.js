import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { useEffect, useState } from "react";
import { getForecastWeather, parseWeatherData } from "../../util/weatherApi";

function App() {
  const weatherTemp = "30";
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [temp, setTemp] = useState(0);

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
  useEffect(() => {
    getForecastWeather().then((data) => {
      const temperature = parseWeatherData(data);
      setTemp(temperature);
    });
  }, []);
  console.log(temp);
  return (
    <div>
      <Header onCreateModal={handleCreateModal} />
      <Main weatherTemp={temp} onSelectCard={handleSelectedCard} />
      <Footer />
      {activeModal === "create" && (
        <ModalWithForm title="New Garment" onclose={handleCloseModal}>
          <fieldset className="input__group">
            <label className="label__input">
              Name
              <input
                className="form__input"
                type="text"
                name="name"
                minLength="1"
                maxLength="30"
                placeholder="Name"
              />
            </label>
            <label className="label__input">
              Image
              <input
                className="form__input"
                type="url"
                link="link"
                minLength="1"
                maxLength="30"
                placeholder="Image URL"
              />
            </label>
          </fieldset>
          <fieldset className="input__group">
            <p className="label__input label__input-weather">
              Select The Weather Type:
            </p>
            <div>
              <div>
                <input
                  className="radio__input"
                  type="radio"
                  id="hot"
                  value="hot"
                />
                <label>Hot</label>
              </div>
              <div>
                <input
                  className="radio__input"
                  type="radio"
                  id="warm"
                  value="warm"
                />
                <label>Warm</label>
              </div>
              <div>
                <input
                  className="radio__input"
                  type="radio"
                  id="cold"
                  value="cold"
                />
                <label>Cold</label>
              </div>
            </div>
          </fieldset>
        </ModalWithForm>
      )}
      {activeModal === "preview" && (
        <ItemModal selectedCard={selectedCard} onclose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
