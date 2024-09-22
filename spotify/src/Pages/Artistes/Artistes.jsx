import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ajout pour la navigation


const Artistes = () => {

  const [artistes, setArtistes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const [selectedArtisteId, setSelectedArtisteId] = useState(null);

  const navigate = useNavigate();

  const fetchArtistes = async (page, limit) => {
    try {
      setLoading(true);
      setError(null); // Reset l'erreur à chaque nouveau fetch
      const response = await fetch(`http://localhost:2222/artists?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des Artistes');
      }

      const data = await response.json();

      if (data.length < limit) {
        setHasMore(false); // Si le nombre d'artistes retournés est inférieur à la limite, plus de pages
      } else {
        setHasMore(true); // Si on récupère exactement la limite, il pourrait y avoir plus
      }

      setArtistes(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtistes(page, limit);
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

  const handleArtisteClick = (artisteId) => {
    setSelectedArtisteId(artisteId);
    navigate(`/artists/${artisteId}`);
  };
  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (artistes.length === 0) {
    return <p>Aucun artiste trouvé.</p>;
  }

  return (
    <div>
      <h2>Liste des Artistes</h2>

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
        {artistes.map((artiste) => (
          <li key={artiste.id}>
            <h3>{artiste.name}</h3>
            <img src={artiste.photo} onClick={()=> handleArtisteClick(artiste.id)}alt={artiste.name} style={{ width: '100px', height: '100px',cursor: 'pointer' }} />
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

export default Artistes;
