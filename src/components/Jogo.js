import React, { useState } from "react";
import Letras from "./Letras";
import forca0 from "../assets/forca0.png";

const palavras = ["cachorro", "gato", "passarinho"];

const JogoDaForca = () => {
  const [palavraDoJogo, setPalavraDoJogo] = useState("");
  const [botaoLetrasDisabled, setBotaoLetrasDisabled] = useState(true);

  const jogar = () => {
    // Escolha uma palavra aleatória do array de palavras
    const palavraEscolhida =
      palavras[Math.floor(Math.random() * palavras.length)];

    // Insira a palavra escolhida no estado palavraDoJogo
    setPalavraDoJogo(palavraEscolhida);

    // Remova o atributo "disabled" do botão com a classe "letras"
    setBotaoLetrasDisabled(false);
  };

  const handleLetraClick = (letra) => {
    console.log(letra);
  };

  return (
    <>
      <div className="layout">
        <img className="forca" src={forca0} alt="Forca" />
        <button className="escolher_palavra" onClick={jogar}>
          Escolher Palavra
        </button>
        <h1 className="palavra-do-jogo">{palavraDoJogo} </h1>
      </div>
      <div>
        <Letras onClick={handleLetraClick} disabled={botaoLetrasDisabled} />
      </div>
    </>
  );
};

export default JogoDaForca;
