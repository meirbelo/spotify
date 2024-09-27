import { useState, useEffect } from 'react';

function Recherche() {
  const [inputValue, setInputValue] = useState('');
  const [albums, setAlbums] = useState([]);
  const [artistes, setArtistes] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`http://localhost:2222/albums`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des albums');
      }
      const data = await response.json();
      // Filtrer les albums en fonction de l'inputValue
      const searchAlbums = data.filter(album => album.name.includes(inputValue));
      setAlbums(searchAlbums);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchArtistes = async () => {
    try {
      const response = await fetch(`http://localhost:2222/artists`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des artistes');
      }
      const data = await response.json();
      // Filtrer les artistes en fonction de l'inputValue
      const searchArtistes = data.filter(artiste => artiste.name.includes(inputValue));
      setArtistes(searchArtistes);
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await fetch(`http://localhost:2222/genres`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des genres');
      }
      const data = await response.json();
      // Filtrer les genres en fonction de l'inputValue
      const searchGenres = data.filter(genre => genre.name.includes(inputValue));
      setGenres(searchGenres);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (inputValue.trim() !== "") {
      fetchAlbums();
      fetchArtistes();
      fetchGenres();
    } else {
      // Si inputValue est vide, on réinitialise les résultats
      setAlbums([]);
      setArtistes([]);
      setGenres([]);
    }
  }, [inputValue]); // Re-fetch lorsque l'inputValue change

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>{"Rechercher un artiste, un album ou un genre"}</h1>
      <input value={inputValue} onChange={handleChange} />

      {inputValue !== null && inputValue.trim() !== "" ? (
        <div>
          <h2>
            {albums.length > 1 && `${albums.length} album(s) trouvé(s), `}
            {artistes.length > 1 && `${artistes.length} artiste(s) trouvé(s), `}
            {genres.length > 1 && `${genres.length} genre(s) trouvé(s).`}
          </h2>

          <h2>
            {albums.length > 0 ? (
              albums.map((resultSearch) => (
                <p key={resultSearch.id}>{resultSearch.name}</p>
              ))
            ) : null}
          </h2>

          <h2>
            {artistes.length > 0 ? (
              artistes.map((resultSearch) => (
                <div key={resultSearch.id}>
                  <p>{artistes.length + " Artistes trouvé(s)"}</p>
                  {resultSearch.name}
                </div>
              ))
            ) : null}
          </h2>

          <h2>
            {genres.length > 0 ? (
              genres.map((resultSearch) => (
                <div key={resultSearch.id}>{resultSearch.name}</div>
              ))
            ) : null}
          </h2>
        </div>
      ) : (
        <h2></h2>
      )}
    </div>
  );
}

export default Recherche;
