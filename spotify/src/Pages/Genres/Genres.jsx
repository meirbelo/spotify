import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ajout pour la navigation
import DetailGenre from '../DetailGenre/DetailGenre';

const Genres = () => {

  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const [selectedGenreId, setSelectedGenreId] = useState(null);

  const navigate = useNavigate();

  const fetchGenres = async (page, limit) => {
    try {
      setLoading(true);
      setError(null); // Reset l'erreur à chaque nouveau fetch
      const response = await fetch(`http://localhost:2222/genres?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des Artistes');
      }

      const data = await response.json();

      if (data.length < limit) {
        setHasMore(false); // Si le nombre d'artistes retournés est inférieur à la limite, plus de pages
      } else {
        setHasMore(true); // Si on récupère exactement la limite, il pourrait y avoir plus
      }

      setGenres(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres(page, limit);
  }, [page, limit]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  const handleLimitChange = (event) => {
    setLimit(Number(event.target.value));
    setPage(1); // Reset à la première page lorsqu'on change la limite
  };
  const handleGenreClick = (genreId) => {
    setSelectedGenreId(genreId); // Met à jour genreId dans l'état local
    // Naviguer vers la page de détails de l'album
    navigate(`/genres/${genreId}`);
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (genres.length === 0) {
    return <p>Aucun Genres trouvé.</p>;
  }

  return (
    <div>
      <h2>Liste des Genres</h2>

      <label>
        Artistes par page :
        <select value={limit} onChange={handleLimitChange}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={50}>50</option>
        </select>
      </label>

      <ul>
        {genres.map((genre) => (
          <li key={genre.id}>
            <h3  key={genre.id}onClick={()=> handleGenreClick(genre.id) }style={{cursor: 'pointer'}}>
              {genre.name}
              </h3>
          </li>
        ))}
      </ul>

      <div>
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Précédent
        </button>
        <span> Page {page} </span>
        <button onClick={handleNextPage} disabled={!hasMore}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Genres;
