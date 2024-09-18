import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const DetailAlbum = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const audioRefs = useRef([]);

  useEffect(() => {
    const fetchAlbumDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:2222/albums/${id}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des détails de l\'album');
        }
        const data = await response.json();
        setAlbum(data);
        console.log(data); // Vérifier les données dans la console
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbumDetails();
  }, [id]);

  const handlePlay = (index) => {
    // Stopper toutes les autres pistes en cours de lecture
    audioRefs.current.forEach((audio, idx) => {
      if (audio && idx !== index) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Démarrer la piste sélectionnée
    audioRefs.current[index].play();
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!album) {
    return <p>Aucun détail disponible pour cet album.</p>;
  }

  return (
    <div>
      <h2>Description de l'album : {album.album.description}</h2>
      {album.cover && (
        <img
          src={album.album.cover}
          alt={album.name}
          style={{ width: '300px', height: '300px' }}
        />
      )}
      <p>Nombre de pistes : {album.tracks ? album.tracks.length : 0}</p>

      <h3>Liste des pistes :</h3>
      <ul>
        {album.tracks && album.tracks.length > 0 ? (
          album.tracks.map((track, index) => (
            <li key={track.id}>
              <strong>{track.name}</strong> - Durée : {track.duration}
              <div>
                {/* Élément audio HTML5 avec référence */}
                <audio
                  controls
                  ref={(el) => (audioRefs.current[index] = el)} // Stocker chaque ref d'audio
                  onPlay={() => handlePlay(index)} // Gérer l'événement "play"
                >
                  <source src={track.mp3} type="audio/mpeg" />
                  Votre navigateur ne supporte pas l'élément audio.
                </audio>
              </div>
            </li>
          ))
        ) : (
          <p>Aucune piste disponible.</p>
        )}
      </ul>
    </div>
  );
};

export default DetailAlbum;
