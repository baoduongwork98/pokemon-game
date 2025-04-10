import "./PokemonCard.css";

const PokemonCard = ({ pokemon, isFlipped, onClick, isMatched }) => {
  return (
    <div
      className={`pokemon-card ${isFlipped ? "flipped" : ""} ${
        isMatched ? "matched" : ""
      }`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
            alt={pokemon.name}
          />
          <h4>{pokemon.name}</h4>
        </div>
        <div className="card-back">
          <img src="gift.png" alt="Gift" />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
