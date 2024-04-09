import React from 'react';

const Card = ({ nombre, frase, foto }) => {
  return (
    <div className="card">
        <div className="texto-c">
            <p>Personaje: {nombre}</p>
            <div className="imagen-c">
                <img src={foto} alt="foto" />
            </div>
            <p>Frase: {frase}</p>
        </div>
    </div>
  );
};

export default Card;