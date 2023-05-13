import React, { useState } from "react";
import Letras from "./Letras";
import forca0 from "../assets/forca0.png";
import forca1 from "../assets/forca1.png";
import forca2 from "../assets/forca2.png";
import forca3 from "../assets/forca3.png";
import forca4 from "../assets/forca4.png";
import forca5 from "../assets/forca5.png";
import forca6 from "../assets/forca6.png";
const caminhosImagensForca = [
  forca0,
  forca1,
  forca2,
  forca3,
  forca4,
  forca5,
  forca6,
];

const JogoDaForca = (props) => {
  const [palavraDoJogo, setPalavraDoJogo] = useState([]);
  const [botaoLetrasDisabled, setBotaoLetrasDisabled] = useState(true);

  const [letrasSelecionadas, setLetrasSelecionadas] = useState([]);
  const [erros, setErros] = useState(0);
  const [numeroForca, setNumeroForca] = useState(0);
  const [jogoVencido, setJogoVencido] = useState(false);

  const jogar = () => {
    // Escolha uma palavra aleatória do array de props.palavras
    const palavraEscolhida =
      props.palavras[Math.floor(Math.random() * props.palavras.length)];

    // Transforme a palavra escolhida em um array de caracteres
    const palavraArray = palavraEscolhida.split("");

    // Insira o array da palavra escolhida no estado palavraDoJogo
    setPalavraDoJogo(palavraArray);

    // Remova o atributo "disabled" do botão com a classe "letras"
    setBotaoLetrasDisabled(false);

    // Limpe as letras selecionadas
    setLetrasSelecionadas([]);

    // Reinicie os erros e o número da imagem da forca
    setErros(0);
    setNumeroForca(0);

    // Altere o caminho da imagem da forca para a imagem inicial (forca0)
    document.querySelector(".forca").src = forca0;
  };

  const handleLetraClick = (letra) => {
    if (jogoVencido || letrasSelecionadas.includes(letra)) {
      return;
    }

    const vitoria = palavraDoJogo.every((letra) =>
      letrasSelecionadas.includes(letra)
    );

    if (vitoria) {
      setBotaoLetrasDisabled(true);
      setJogoVencido(true);
      return;
    }

    if (palavraDoJogo.includes(letra)) {
      setLetrasSelecionadas([...letrasSelecionadas, letra]);
    } else {
      setErros(erros + 1);

      if (numeroForca < 6) {
        setNumeroForca(numeroForca + 1);
        document.querySelector(".forca").src =
          caminhosImagensForca[numeroForca + 1];
      } else {
        setPalavraDoJogo(palavraDoJogo);
      }
    }
  };

  const renderPalavra = () => {
    const vitoria = palavraDoJogo.every((letra) =>
      letrasSelecionadas.includes(letra)
    );

    if (erros >= 6) {
      return palavraDoJogo.map((letra, index) => (
        <div key={index} className="letra_escolher">
          <span className="perdedora">{letra}</span>
          <span> </span>
        </div>
      ));
    }

    if (vitoria) {
      return (
        <div className="palavra-do-jogo">
          {palavraDoJogo
            .join("")
            .split("")
            .map((letra, index) => (
              <div key={index} className="letra_escolher">
                <span className="vencedora">
                  {letrasSelecionadas.includes(letra) ? letra : "_"}
                </span>
              </div>
            ))}
        </div>
      );
    }

    return palavraDoJogo.map((letra, index) => (
      <div key={index} className="letra_escolher">
        <span
          className={letrasSelecionadas.includes(letra) ? "selecionada" : ""}
        >
          {letrasSelecionadas.includes(letra) ? letra : "_"}
        </span>
        <span>{letrasSelecionadas.includes(letra) ? "" : "_"}</span>
      </div>
    ));
  };

  return (
    <>
      <div className="layout">
        <img className="forca" src={forca0} alt="Forca" />
        <button className="escolher_palavra" onClick={jogar}>
          Escolher Palavra
        </button>
        <div className="palavra-do-jogo">{renderPalavra()}</div>
      </div>
      <div>
        <Letras
          onClick={handleLetraClick || jogoVencido}
          disabled={botaoLetrasDisabled}
        />
      </div>

      <div className="chute">
        <input type="text" className="input-chute"></input>
        <button className="button-chute">Chutar</button>
      </div>
    </>
  );
};

export default JogoDaForca;
