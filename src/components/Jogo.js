import forca0 from "../assets/forca0.png";
import React, { useState } from "react";
import Letras from "./Letras";
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
  const [botaoInputDisabled, setBotaoInputDisabled] = useState(true);

  const [letrasSelecionadas, setLetrasSelecionadas] = useState([]);

  const [erros, setErros] = useState(0);
  const [numeroForca, setNumeroForca] = useState(0);

  const jogar = () => {
    // Escolha uma palavra aleatória do array de props.palavras
    const palavraEscolhida =
      props.palavras[Math.floor(Math.random() * props.palavras.length)];
    const palavraArray = palavraEscolhida.split("");

    setPalavraDoJogo(palavraArray);

    // Remova o atributo "disabled" do botão com a classe "letras"
    setBotaoLetrasDisabled(false);
    setBotaoInputDisabled(false);

    // Limpe as letras selecionadas
    setLetrasSelecionadas([]);

    // Reinicie os erros e o número da imagem da forca
    setErros(0);
    setNumeroForca(0);

    // Altere o caminho da imagem da forca para a imagem inicial (forca0)
    document.querySelector(".forca").setAttribute("src", forca0);
    document.querySelector(".chute").style.display = "flex";
    const botoesLetras = document.querySelectorAll(".letra");
    botoesLetras.forEach((botao) => {
      botao.removeAttribute("disabled");
    });
  };

  const handleLetraClick = (letra) => {
    const letrasDaPalavra = palavraDoJogo.slice();
    const letraEstaNaPalavra = letrasDaPalavra.includes(letra);
    let novasLetrasSelecionadas = [];

    if (letraEstaNaPalavra) {
      novasLetrasSelecionadas = [...letrasSelecionadas, letra];
      setLetrasSelecionadas(novasLetrasSelecionadas);
    } else {
      const novosErros = erros + 1;
      setErros(novosErros);

      if (novosErros >= 6) {
        setBotaoLetrasDisabled(true);
        document.querySelector(".forca").setAttribute("src", forca6);
        const botoesLetras = document.querySelectorAll(".botao-letra");
        botoesLetras.forEach((botao) => {
          botao.disabled = true;
        });
      } else {
        const novoNumeroForca = numeroForca + 1;
        console.log(caminhosImagensForca[novoNumeroForca]); // adicionado para depuração
        setNumeroForca(novoNumeroForca);
        document.querySelector(".forca").src =
          caminhosImagensForca[novoNumeroForca];
      }
    }

    const botaoLetra = document.getElementById(`botao-${letra}`);
    botaoLetra.disabled = true;

    const verificarVitoria = () => {
      const todasAsLetrasEncontradas = letrasDaPalavra.every((letraDaPalavra) =>
        novasLetrasSelecionadas.includes(letraDaPalavra)
      );

      if (todasAsLetrasEncontradas) {
        setBotaoLetrasDisabled(true);
      }
    };
    verificarVitoria();
  };

  const handleChute = (event) => {
    event.preventDefault();
    const palavraChutada = event.target.parentElement
      .querySelector(".input-chute")
      .value.toLowerCase();
    if (palavraChutada.trim() === "") {
      return;
    }
    if (palavraChutada === palavraDoJogo.join("").toLowerCase()) {
      setBotaoLetrasDisabled(true);
      setBotaoInputDisabled(true);
      setLetrasSelecionadas([
        ...letrasSelecionadas,
        ...palavraChutada.split(""),
      ]);
    } else {
      setErros(erros + 6);
      if (numeroForca <= 6) {
        setNumeroForca(numeroForca + 6);
        document.querySelector(".forca").src =
          caminhosImagensForca[numeroForca + 6];
        setBotaoLetrasDisabled(true);
        setBotaoInputDisabled(true);
      } else {
        // removido o setPalavraDoJogo aqui
      }
    }
    event.target.parentElement.querySelector(".input-chute").value = "";
  };
  const vitoria = palavraDoJogo.every((letraPalavra) =>
    letrasSelecionadas.includes(letraPalavra)
  );

  const renderPalavra = () => {
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
          {palavraDoJogo.map((letra, index) => (
            <div key={index} className="letra_escolher">
              <span className="vencedora">{letra}</span>
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
      </div>
    ));
  };

  return (
    <>
      <div className="layout">
        <img
          data-test="game-image"
          className="forca"
          src={forca0}
          alt="Forca"
        />
        <button
          data-test="choose-word"
          className="escolher_palavra"
          onClick={jogar}
        >
          Escolher Palavra
        </button>
        <div data-test="word" className="palavra-do-jogo">
          {renderPalavra()}
        </div>
      </div>

      <Letras
        className="letras"
        onClick={handleLetraClick}
        disabled={botaoLetrasDisabled}
      />

      <div className="chute">
        Já sei a palavra!
        <input
          data-test="guess-input"
          type="text"
          className="input-chute"
        ></input>
        <button
          data-test="guess-button"
          onClick={handleChute}
          className="button-chute"
          disabled={botaoInputDisabled}
        >
          Chutar
        </button>
      </div>
    </>
  );
};

export default JogoDaForca;
