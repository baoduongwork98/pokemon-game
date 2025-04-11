import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import PokemonCard from "./PokemonCard";
import "./GameBoard.css";
const giftList = [
  { id: 1, name: "Milk-1", img: "th-milk-1.jpg" },
  { id: 2, name: "Milk-2", img: "th-milk-2.jpeg" },
  { id: 3, name: "Milk-3", img: "th-milk-3.jpg" },
  { id: 4, name: "Milk-4", img: "th-milk-4.jpg" },
];

const GameBoard = () => {
  const navigate = useNavigate();
  const [pokemons, setPokemons] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds = 1 minute
  const [timerActive, setTimerActive] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [giftWon, setGiftWon] = useState(null);

  useEffect(() => {
    // Fetch 8 random Pokemon (we'll use 4 pairs)
    const fetchPokemons = async () => {
      const pokemonIds = Array.from(
        { length: 8 },
        () => Math.floor(Math.random() * 151) + 1
      );
      const pokemonPromises = pokemonIds.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
          response.json()
        )
      );

      const pokemonData = await Promise.all(pokemonPromises);
      const pokemonPairs = pokemonData.flatMap((pokemon) => [
        { ...pokemon, id: pokemon.id },
        { ...pokemon, id: pokemon.id },
      ]);

      // Shuffle the cards
      const shuffledPokemons = pokemonPairs.sort(() => Math.random() - 0.5);
      setPokemons(shuffledPokemons);
      setTimerActive(true); // Start timer when cards are loaded
    };

    fetchPokemons();
  }, []);

  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0 && !gameWon) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft, gameWon]);

  const handleCardClick = (index) => {
    // Don't allow clicking if:
    // - Card is already flipped
    // - Two cards are already flipped
    // - Card is already matched
    // - Time is up
    if (
      flippedCards.includes(index) ||
      flippedCards.length === 2 ||
      matchedCards.includes(pokemons[index].id) ||
      timeLeft === 0
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    setMoves((prev) => prev + 1);

    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      if (pokemons[firstIndex].id === pokemons[secondIndex].id) {
        setMatchedCards((prev) => [...prev, pokemons[firstIndex].id]);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedCards.length === 8) {
      setGameWon(true);
      setTimerActive(false);
      // Randomly select a gift
      setShowPopup(true);
    }
  }, [matchedCards]);

  const goBack = () => {
    // Logic to go back to the previous page
    navigate("/reward");
  };

  // const resetGame = () => {
  //   setFlippedCards([]);
  //   setMatchedCards([]);
  //   setMoves(0);
  //   setGameWon(false);
  //   setTimeLeft(60);
  //   setTimerActive(true);
  //   setShowPopup(false);
  //   setGiftWon(null);
  //   // Re-shuffle the existing cards
  //   const shuffledPokemons = [...pokemons].sort(() => Math.random() - 0.5);
  //   setPokemons(shuffledPokemons);
  // };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Pokemon Memory Game</h1>
        <div className="game-stats">
          <p>Moves: {moves}</p>
          <p>Time: {formatTime(timeLeft)}</p>
          {/* <button onClick={resetGame}>New Game</button> */}
        </div>
      </div>

      {timeLeft === 0 && !gameWon && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="game-over-message">
              <h2 className="title-game-over">Hết giờ!</h2>
              <p>
                Bạn đã ghép được {matchedCards.length / 2} cặp trong {moves}{" "}
                lần.
              </p>
              <button onClick={goBack}>Trở lại</button>
            </div>
          </div>
        </div>
      )}

      <div className="game-board">
        {pokemons.map((pokemon, index) => (
          <PokemonCard
            key={`${pokemon.id}-${index}`}
            pokemon={pokemon}
            isFlipped={
              flippedCards.includes(index) || matchedCards.includes(pokemon.id)
            }
            isMatched={matchedCards.includes(pokemon.id)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Chúc mừng! 🎉</h2>
            <p>Bạn đã chiến thắng!</p>
            <p>Số lượt lật bài: {moves}</p>
            <p>Thời gian: {formatTime(timeLeft)}</p>
            <h1>Hãy lựa chọn quà</h1>
            <div className="gift-list">
              {giftList.map((gift) => (
                <div
                  key={gift.id}
                  className={`gift-won ${
                    giftWon?.id === gift.id ? "selected-gift" : ""
                  }`}
                  onClick={() => setGiftWon(gift)}
                >
                  <img src={gift.img} alt={gift.name} className="gift-image" />
                  <p className="gift-name">{gift.name}</p>
                </div>
              ))}
            </div>
            <button onClick={goBack}>Trở lại</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
