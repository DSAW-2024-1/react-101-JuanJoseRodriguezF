import React, { useState, useEffect } from 'react';
import './App.css';
import Card from './Card/Card';

const App = () => {
  const [character, setCharacter] = useState(null);
  const characters = ['homer', 'bart', 'ralph', 'moe', 'lisa', 'marge'];

  const getNewCharacter = () => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  };

  const buscarPersonaje = async (characterName) => {
    try {
      const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${encodeURIComponent(characterName)}`);
      const data = await response.json();
      crearCard(data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const buscarQuote = async () => {
    try {
      const response = await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
      const data = await response.json();
      crearCard(data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const crearCard = (data) => {
    if (data.length > 0) {
      const randomQuote = data[0];
      setCharacter({
        nombre: randomQuote.character,
        foto: randomQuote.image,
        frase: data.map(quote => quote.quote)
      });
    } else {
      setCharacter(null);
      alert('No quotes found.');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe
    const inputValue = e.target.querySelector('.searchInput').value;
    if (inputValue.trim() !== '') {
      buscarPersonaje(inputValue); 
    }
  };

  const accionClick = () => {
    buscarQuote();
  };

  useEffect(() => {
    buscarPersonaje(getNewCharacter());
  }, []);

  return (
    <div className="app">
      <div className="general">
        <div className='superior'>
        <form onSubmit={onSubmitHandler}>
          <div className='enColumnas'>
            <input type="text" className="searchInput" placeholder="Escriba el personaje a buscar" />
          </div>
          <div className='enColumnas'>
            <img className="logo" src='./src/assets/logo.png' alt="Logo"></img>
          </div>
          <div className='enColumnas'>
            <button className="cargarMas" type='button' onClick={accionClick}>Nuevo Personaje!!</button>
          </div>
        </form>
        </div>
        <div>
          {character && (
            <Card
              nombre={character.nombre}
              frase={character.frase}
              foto={character.foto}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;