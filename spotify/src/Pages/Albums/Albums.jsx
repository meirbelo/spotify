import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Albums = () => {

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate(); 


  const fetchAlbums = async (page, limit) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:2222/albums?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des albums');
      }
      const data = await response.json();
      console.log(data)
      setAlbums(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums(page, limit);
  }, [page, limit]);

  const handlePreviousPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  // Gestion du changement de limite
  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1);
  };

  const handleAlbumClick = (albumId) => {
    // Naviguer vers la page de détails de l'album
    navigate(`/albums/${albumId}`);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }
  

  return (
    <div>
      <h2>Liste des Albums</h2>

      <label>
        Albums par page :
        <select value={limit} onChange={handleLimitChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </label>

      <ul>
        {albums.map((album) => (
          <li key={album.id} onClick={() => handleAlbumClick(album.id)} style={{ cursor: 'pointer' }}>
            <h3>{album.name}</h3>
            <img src={album.cover_small} alt={album.name} />
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Précédent
        </button>
        <span> Page {page} </span>
        <button onClick={handleNextPage}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Albums;
