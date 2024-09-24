import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DetailArtiste = () => {
  const { id } = useParams();
  const [artiste, setArtiste] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchdArtistes = async () => {
      try {
        setLoading(true);
        setError(null);
        const responseAlbums = await fetch(`http://localhost:2222/albums`);
        if (!responseAlbums.ok) {
          throw new Error('Erreur lors de la récupération des albums');
        }
        const allAlbums = await responseAlbums.json();
        const test = [
          {
            id: 1,
            artist_id: 1,
            name: "8-Bit Pimp",
            description: "...",
            cover: "http://he3.magnatune.com/music/A_Rival/8-Bit Pimp/cover_400.jpg",
            cover_small: "http://he3.magnatune.com/music/A_Rival/8-Bit Pimp/cover_200.jpg",
            release_date: 1283583600,
            popularity: 6
          },
          {
            id: 2,
            artist_id: 2,
            name: "Crescent Moon",
            description: "...",
            cover: "http://he3.magnatune.com/music/Abbas Premjee/Crescent Moon/cover_400.jpg",
            cover_small: "http://he3.magnatune.com/music/Abbas Premjee/Crescent Moon/cover_200.jpg",
            release_date: 1360742400,
            popularity: 59
          },
          {
            id: 2,
            artist_id: 2,
            name: "Small Songs in a Small Kitchen",
            description: "...",
            cover: "http://he3.magnatune.com/music/Adriano Fontana/Small Songs in a Small Kitchen/cover_400.jpg",
            cover_small: "http://he3.magnatune.com/music/Adriano Fontana/Small Songs in a Small Kitchen/cover_200.jpg",
            release_date: 1375686000,
            popularity: 18
          },
          // Ajoutez d'autres albums ici
        ];
        //console.log("allalbums" + allAlbums)
        const filteredArtistes = allAlbums.filter((tes) => tes.artist_id == id);
        setAlbums(filteredArtistes);

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchdArtistes();
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
      {/* <h2>Albums pour les Artistes : {genre?.name}</h2> */}
      {<ul>
        {albums.map((album) => (
          <li key={album.id} onClick={() => handleAlbumClick(album.id)} style={{ cursor: 'pointer' }}>
            <h2>{album.name}</h2>         
            <img src={album.cover_small} alt={album.name} />
          </li>
        ))}
      </ul>}
    </div>
  );
};

export default DetailArtiste;
