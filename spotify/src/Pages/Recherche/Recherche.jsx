import React, { useState, useEffect } from 'react';

function Recherche() {
  const [inputValue, setInputValue] = useState('');
  const [albums, setAlbums] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await fetch(`http://localhost:2222/albums`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des albums');
      }

      const data = await response.json();

      // Filtrer les albums en fonction de l'inputValue
      const searchAlbums = data.filter(album => album.name.includes(inputValue));

      console.log("Albums filtrés:", searchAlbums);

      setAlbums(searchAlbums); // Met à jour avec les albums filtrés
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, [inputValue]); // Re-fetch les albums chaque fois que l'inputValue change

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      <h1>{"Rechercher un artiste, un album ou un genre"}</h1>
      <input value={inputValue} onChange={handleChange} />
      <h2>
        {
          albums.length > 0 ? (
            albums.map((resultSearch) => (
              <p key={resultSearch.id}>{resultSearch.name}</p> // Assurez-vous que chaque élément a une clé unique
            ))
          ) : (
            <p>Aucun résultat trouvé</p>
          )
        }
      </h2>
    </div>
  );
}

export default Recherche;
