import React from 'react';
import Lottie from 'react-lottie';
import loadingAnimation from "../../assets/json/loading.json";  // Caminho para o arquivo JSON

const Loading = ({ isLoading }) => {
  const defaultOptions = {
    loop: true, // Define que a animação deve se repetir
    autoplay: true, // Inicia a animação automaticamente
    animationData: loadingAnimation, // A animação JSON que você importou
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      {isLoading && (
        <div className="overlay">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      )}
    </>
  );
};

export default Loading;
