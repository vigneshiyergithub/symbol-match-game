import { useEffect, useState } from "react";
import "./Game.css";

const SYMBOLS = ["@", "#", "$", "%"];

const Game = () => {
  const [board, setBoard] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeOpenedItems, setActiveOpeningItems] = useState([]);
  const [clicks, setClicks] = useState(0);
  const getNewBoard = () => {
    const l = [...SYMBOLS, ...SYMBOLS];
    l.sort(function (a, b) {
      return 0.5 - Math.random();
    });
    for (let i = 0; i < l.length; i++) {
      setBoard((board) => {
        board[i] = {
          id: i,
          value: l[i],
          isOpened: false,
          isMatched: false,
        };
        return [...board];
      });
    }
  };
  const onBtnClick = () => {
    if (!gameStarted) {
      setGameStarted(true);
    }
    getNewBoard();
    setActiveOpeningItems([]);
    setClicks(0);
  };
  const onBoardItemClick = (id) => {
    setActiveOpeningItems((openedItems) => [...openedItems, id]);
    setBoard((b) =>
      b.map((_i) => {
        if (_i.id === id) {
          return {
            ..._i,
            isOpened: true,
          };
        }
        return _i;
      })
    );
  };
  useEffect(() => {
    if (activeOpenedItems.length === 2) {
      const fn = () => {
        const item1 = board.find(({ id }) => id === activeOpenedItems[0]);
        const item2 = board.find(({ id }) => id === activeOpenedItems[1]);
        const isMatch = item1.value === item2.value;
        if (isMatch) {
          setBoard((board) =>
            board.map((item) => {
              if (item.id === item1.id || item.id === item2.id) {
                return {
                  ...item,
                  isMatched: true,
                };
              }
              return item;
            })
          );
        } else {
          setBoard((board) =>
            board.map((item) => {
              if (item.id === item1.id || item.id === item2.id) {
                return {
                  ...item,
                  isOpened: false,
                };
              }
              return item;
            })
          );
        }
        setActiveOpeningItems([]);
      };
      setTimeout(fn, 1500);
    }
  }, [activeOpenedItems, board]);
  const isDisabled = activeOpenedItems.length === 2;
  const finished =
    board.length > 0 &&
    board.filter((b) => b.isMatched).length === board.length;
  return (
    <div className="game-container">
      <div className="game-container-btn">
        <button onClick={onBtnClick} className="">
          {gameStarted ? "Reset" : "New"}
        </button>
      </div>
      {board.length > 0 && (
        <div className="game-board">
          {board.map((b, i) => (
            <GameBoardItem
              key={`${b.id}_${b.value}`}
              {...b}
              onBoardClick={() => {
                onBoardItemClick(b.id);
                setClicks((c) => c + 1);
              }}
              disabled={isDisabled}
            />
          ))}
        </div>
      )}
      <div className="game-board-score">
        {finished ? `Finished in ${clicks} steps` : `${clicks} steps`}
      </div>
    </div>
  );
};

const GameBoardItem = ({
  isOpened,
  value,
  onBoardClick,
  disabled,
  isMatched,
}) => {
  if (isOpened) {
    const classList = ["game-board-item", "opened"];
    isMatched && classList.push("item-matched");
    return <div className={classList.join(" ")}>{value}</div>;
  }
  return (
    <div
      className="game-board-item"
      onClick={() => (!disabled ? onBoardClick() : () => {})}
    ></div>
  );
};

export default Game;
