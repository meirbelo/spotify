import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailGenre = () => {
  const { id } = useParams(); // Récupère l'ID du genre depuis l'URL
  const [genre, setGenre] = useState(null); // Genre sélectionné
  const [albums, setAlbums] = useState([]); // Albums filtrés par genre
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Pour rediriger vers la page de détail d'un album

  useEffect(() => {
    const fetchGenreAndAlbums = async () => {
      try {
        setLoading(true);
        setError(null);

        // Récupérer les détails du genre et la liste des IDs d'albums
        const responseGenre = await fetch(`http://localhost:2222/genres/${id}`);
        if (!responseGenre.ok) {
          throw new Error('Erreur lors de la récupération du genre');
        }
        const genreData = await responseGenre.json();
        setGenre(genreData.genre);

        const albumIds = genreData.albums;

        const responseAlbums = await fetch(`http://localhost:2222/albums`);
        if (!responseAlbums.ok) {
          throw new Error('Erreur lors de la récupération des albums');
        }
        const allAlbums = await responseAlbums.json();
        // Filtrer les albums correspondant aux IDs récupérés
        const filteredAlbums = allAlbums.filter((album) => albumIds.includes(album.id));
        console.log(filteredAlbums);
        setAlbums(filteredAlbums);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreAndAlbums();
  }, [id]);

  const handleAlbumClick = (albumId) => {
    navigate(`/albums/${albumId}`); // Rediriger vers la page de détail de l'album
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (albums.length === 0) {
    return <p>Aucun album trouvé pour ce genre.</p>;
  }

  return (
    <div>
      <h2>Albums pour le genre : {genre?.name}</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id} onClick={() => handleAlbumClick(album.id)} style={{ cursor: 'pointer' }}>
            <h2>{album.name}</h2>         
            <img src={album.cover_small} alt={album.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailGenre;
