
import "./App.css";
import React, { useState } from "react";

let player1;
let player2;

function App() {
  const [count, setCount] = useState(0);

  function controlarClicks() {
    setCount(count + 1);
    //console.log(count);
  }

  return (
    <>
      <Title />
      <TatetiBody
        count={count}
        setCountTateti={setCount}
        onTatetiBodyClick={controlarClicks}
      />
    </>
  );
}

function Title() {
  return (
    <div>
      <header> </header>
      <h1>TA-TE-TI</h1>
    </div>
  );
}

function TatetiBody({ count, setCountTateti, onTatetiBodyClick }) {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [celdas, setCeldas] = useState(Array(9).fill(null));

  const winner = QuienGano(celdas, count);

  const [w1, setW1] = useState(0);
  const [w2, setW2] = useState(0);

  player1 = p1;
  player2 = p2;

  
  
  function ControlarWins() {
    if (winner === player1) {
      setW1(w1 + 1);
    } else if (winner === player2) {
      setW2(w2 + 1);
    }
    
  }

  let showWinner;
  if (winner === player1) {
    showWinner = <h3>Ganó P1 {winner}</h3>;
  } else if (winner === player2) {
    showWinner = <h3>Ganó P2 {winner}</h3>;
  } else if (winner === "Empataron") {
    showWinner = <h3>{winner}</h3>;
  }

  function handleClick(i) {
    if (winner){return}
    const nextCeldas = celdas.slice();
    if (count % 2 === 0) {
      if (nextCeldas[i] == null && player1 !== "" && player2 !== "") {
        onTatetiBodyClick();
        nextCeldas[i] = "X";
      } else {
        return alert("Ingrese a los jugadores");
      }
    } else {
      if (nextCeldas[i] == null && player1 !== "" && player2 !== "") {
        onTatetiBodyClick();
        nextCeldas[i] = "O";
      } else {
        return alert("Ingrese a los jugadores");
      }
    }
    setCeldas(nextCeldas);

  }

  return (
    <div>
      <FormPlayers
        count={count}
        p1={p1}
        p2={p2}
        onFormPlayer1={setP1}
        onFormPlayer2={setP2}
        w1={w1}
        w2={w2}
      />
    
      <TablaTateti celdas={celdas} count={count} ingresarValor={handleClick} />
      <Ganador showWinner={showWinner} />
      <JugarOtraVez
        celdas={celdas}
        setCeldasAgain={setCeldas}
        setCountAgain={setCountTateti}
        ContadorWins={ControlarWins}
      />
      <Reiniciar
        onFormPlayer1Reset={setP1}
        onFormPlayer2Reset={setP2}
        celdas={celdas}
        setCeldasReset={setCeldas}
        setCountReset={setCountTateti}
        ContadorWinsReset1={setW1}
        ContadorWinsReset2={setW2}
      />
    </div>
  );
}

function FormPlayers({ count,p1, p2, onFormPlayer1, onFormPlayer2, w1, w2 }) {

  let turno;
  if(count%2===0){
    turno=<h4>Es el turno de P1, {player1}, con X</h4>
  }else{
    turno=<h4>Es el turno de P2, {player2}, con O</h4>
  }

  return (
    <>
      <form>
        <div>
          <label htmlFor="playOne">Player 1: </label>
          <input
            type="text"
            id="playOne"
            name="playOne"
            placeholder="requiered"
            value={p1}
            onChange={(event) => {
              onFormPlayer1(event.target.value);
            }}
          />
          <p className="contador"> wins: {w1}</p>
        </div>
        <br />
        <br />
        <div>
        <label htmlFor="playTwo">Player 2: </label>
        <input
          type="text"
          id="playTwo"
          name="playTwo"
          placeholder="requiered"
          value={p2}
          onChange={(event) => {
            onFormPlayer2(event.target.value);
          }}
        />
        <p className="contador">wins: {w2}</p>
        </div>
      </form>
      {turno}

      <br />
    </>
  );
}



function TablaTateti({ celdas, count, ingresarValor }) {
  //console.log(celdas);

  // console.log(celdas.slice(6, 9));

  return (
    <div>
      <br />
      <table id="tateti">
        <tbody>
        <tr>
          <Juego value={celdas[0]} onJuegoClick={() => ingresarValor(0)} />
          <Juego value={celdas[1]} onJuegoClick={() => ingresarValor(1)} />
          <Juego value={celdas[2]} onJuegoClick={() => ingresarValor(2)} />
        </tr>
        <tr>
          <Juego value={celdas[3]} onJuegoClick={() => ingresarValor(3)} />
          <Juego value={celdas[4]} onJuegoClick={() => ingresarValor(4)} />
          <Juego value={celdas[5]} onJuegoClick={() => ingresarValor(5)} />
        </tr>
        <tr>
          <Juego value={celdas[6]} onJuegoClick={() => ingresarValor(6)} />
          <Juego value={celdas[7]} onJuegoClick={() => ingresarValor(7)} />
          <Juego value={celdas[8]} onJuegoClick={() => ingresarValor(8)} />
        </tr>
        </tbody>
      </table>
      <br />
    </div>
  );
}

function Juego({ value, onJuegoClick }) {
  //como que has dos tablas distintas una para los circulos y otra para las x no se porque pasa, tal vez por eso hay que tratar todo como un arreglo?

  return <td onClick={onJuegoClick}>{value}</td>;
}

function Ganador({ showWinner }) {
  return <>{showWinner}</>;
}

function QuienGano(celdas, count) {
  let btns1 = celdas.slice(0, 3);
  let btns2 = celdas.slice(3, 6);
  let btns3 = celdas.slice(6, 9);
  let btns4 = [celdas[0], celdas[3], celdas[6]];
  let btns5 = [celdas[1], celdas[4], celdas[7]];
  let btns6 = [celdas[2], celdas[5], celdas[8]];
  let btns7 = [celdas[0], celdas[4], celdas[8]];
  let btns8 = [celdas[2], celdas[4], celdas[6]];
  let btns = [btns1, btns2, btns3, btns4, btns5, btns6, btns7, btns8];

  let secuencia;

  let ganador = null;

  for (let n = 0; n < btns.length; n++) {
    secuencia = [];

    secuencia = btns[n].slice();
    //console.log(secuencia);

    if (ganaron1()) {
      ganador = player1;
      return ganador;
    } else if (ganaron2()) {
      ganador = player2;
      return ganador;
    }
  }

  if (ganador === null && count === 9) {
    ganador = "Empataron";
    return ganador;
  }

  function ganaron1() {
    return (
      secuencia[0] === secuencia[1] &&
      secuencia[0] === secuencia[2] &&
      secuencia[1] === secuencia[2] &&
      secuencia[0] === "X"
    );
  }

  function ganaron2() {
    return (
      secuencia[0] === secuencia[1] &&
      secuencia[0] === secuencia[2] &&
      secuencia[1] === secuencia[2] &&
      secuencia[0] === "O"
    );
  }

  //Verifica si hubo algún ganador despues de hacer el loop
}

function JugarOtraVez({ celdas, setCeldasAgain, setCountAgain, ContadorWins }) {
  function again() {

    if(celdas){
    ContadorWins();
    setCountAgain(0);
    celdas.fill(null);
    const resetCelda = celdas.slice();
    setCeldasAgain(resetCelda);
  }
  }
  return (
    <>
      <button id="again" onClick={again}>
        Play Again!
      </button>
      <br />
    </>
  );
}

function Reiniciar({
  onFormPlayer1Reset,
  onFormPlayer2Reset,
  celdas,
  setCeldasReset,
  setCountReset,
  ContadorWinsReset1,
  ContadorWinsReset2
}) {
  function reset() {
    ContadorWinsReset1(0);
    ContadorWinsReset2(0)
    onFormPlayer1Reset("");
    onFormPlayer2Reset("");
    setCountReset(0);
    celdas.fill(null);
    const resetCelda = celdas.slice();
    setCeldasReset(resetCelda);
  }

  return (
    <>
      <br />
      <button id="reset" onClick={reset}>
        Reset
      </button>
    </>
  );
}

export default App;

//()=>{IngresarValor();ControlarClicks()}
