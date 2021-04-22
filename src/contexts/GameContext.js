import React, {
    useContext,
    useState,
    useRef,
    useEffect,
    useCallback,
} from 'react';

const GameContext = React.createContext();

function equals3(a, b, c) {
    return (a === b) & (b === c);
}

export function useGame() {
    return useContext(GameContext);
}

export function GameProvider({ children }) {
    const [gridState, setGridState] = useState();
    const [playerIndex, setPlayerIndex] = useState();
    const [winner, setWinner] = useState();
    const [warning, setWarning] = useState(false);

    function startNewGame() {
        setWarning(false);
        setGridState(['', '', '', '', '', '', '', '', '']);
        setPlayerIndex(0);
        setWinner();
    }

    function incrementPlayerIndex() {
        setPlayerIndex((prevState) => (prevState + 1) % 2);
    }

    function cellValue(id) {
        return gridState && gridState[id - 1];
    }

    function cellClicked(e) {
        if (gridState === undefined) {
            setWarning(true);
            return;
        }
        if (winner) {
            return;
        }
        if (gridState[e.target.id - 1] === '') {
            let value = playerIndex === 0 ? 'O' : 'X';
            setGridState((prevState) => {
                let newState = [];
                for (let cellNumber in prevState) {
                    if (cellNumber != e.target.id - 1)
                        newState.push(prevState[cellNumber]);
                    else newState.push(value);
                }
                return newState;
            });
            incrementPlayerIndex();
        }
    }

    useEffect(() => {
        if (gridState) {
            //column check
            if (
                equals3(gridState[0], gridState[3], gridState[6]) &&
                gridState[0] !== ''
            ) {
                setWinner(gridState[0]);
                return;
            }
            if (
                equals3(gridState[1], gridState[4], gridState[7]) &&
                gridState[1] !== ''
            ) {
                setWinner(gridState[1]);
                return;
            }
            if (
                equals3(gridState[2], gridState[5], gridState[8]) &&
                gridState[2] !== ''
            ) {
                setWinner(gridState[2]);
                return;
            }
            //row check
            if (
                equals3(gridState[0], gridState[1], gridState[2]) &&
                gridState[0] !== ''
            ) {
                console.log('win');
                setWinner(gridState[0]);
                return;
            }
            if (
                equals3(gridState[3], gridState[4], gridState[5]) &&
                gridState[3] !== ''
            ) {
                console.log('win');
                setWinner(gridState[5]);
                return;
            }
            if (
                equals3(gridState[6], gridState[7], gridState[8]) &&
                gridState[6] !== ''
            ) {
                console.log('win');
                setWinner(gridState[8]);
                return;
            }
            //diagonal check
            if (
                equals3(gridState[0], gridState[4], gridState[8]) &&
                gridState[0] !== ''
            ) {
                setWinner(gridState[0]);
                return;
            }
            if (
                equals3(gridState[2], gridState[4], gridState[6]) &&
                gridState[2] !== ''
            ) {
                setWinner(gridState[2]);
                return;
            }

            if (!gridState.includes('')) setWinner('draw');
        }
    }, [gridState]);

    const value = {
        cellClicked,
        cellValue,
        gridState,
        startNewGame,
        playerIndex,
        winner,
        warning,
    };

    return (
        <GameContext.Provider value={value}>{children}</GameContext.Provider>
    );
}
