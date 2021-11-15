import axios from "axios";
import { useState } from "react";

const Publish = ({ token }) => {
  const [title, setTitle] = useState("az");
  const [description, setDescription] = useState("az");
  const [price, setPrice] = useState(30);
  const [brand, setBrand] = useState("ze");
  const [size, setSize] = useState("ze");
  const [condition, setCondition] = useState("ze");
  const [color, setColor] = useState("ze");
  const [city, setCity] = useState("ze");
  const [file, setFile] = useState();
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("city", city);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("picture", file);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="container bg-form">
        <h3>Vends ton article</h3>

        <div className="offer-form">
          <form onSubmit={handleSubmit}>
            <div className="picture-box">
              <h3>Ajoute une photo</h3>
              <input
                type="file"
                multiple={true}
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>

            <div className="offer-box-desc">
              <span className="line">
                Titre :
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="ex : Chemise Zara"
                />
              </span>

              <span className="line line-desc">
                Décris ton article :
                <input
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ex : Portée une fois, état quasi-neuf"
                />
              </span>
            </div>
            <div className="offer-box-desc">
              <span className="line">
                Marque :
                <input
                  type="text"
                  placeholder="ex : Zara"
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                />
              </span>
              <span className="line">
                Taille :
                <input
                  type="text"
                  placeholder="ex : L / 40 / 12"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                />
              </span>
              <span className="line">
                Couleur :
                <input
                  type="text"
                  placeholder="ex : Fushia"
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                />
              </span>
              <span className="line">
                Etat :
                <input
                  type="text"
                  placeholder="ex : Neuf avec étiquette"
                  onChange={(e) => {
                    setCondition(e.target.value);
                  }}
                />
              </span>
              <span className="line line-desc-two">
                Lieu :
                <input
                  type="text"
                  placeholder="ex : Paris, France"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </span>
            </div>
            <div className="offer-box-desc">
              <span className="line line-desc-two">
                Prix :
                <input
                  type="text"
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="ex : 00,00 euros"
                />
              </span>
              <input type="submit" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Publish;
