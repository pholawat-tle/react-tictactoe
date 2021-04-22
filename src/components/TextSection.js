import React from 'react';
import { useGame } from '../contexts/GameContext';

function TextSection() {
    const { startNewGame, playerIndex, gridState, winner, warning } = useGame();
    return (
        <div className="left-container">
            <div className="text-container">
                <h1
                    className={
                        gridState ? 'hidden welcome-text' : 'welcome-text'
                    }
                >
                    Let's play
                </h1>
                <h1
                    className={
                        gridState ? 'hidden welcome-text' : 'welcome-text'
                    }
                >
                    Tic-Tac-Toe!
                </h1>
                {!winner ? (
                    <h1
                        className={
                            gridState && !winner
                                ? 'turns-text'
                                : 'hidden turns-text'
                        }
                    >
                        Player {playerIndex === 0 ? 'O' : 'X'}'s turn{' '}
                    </h1>
                ) : (
                    <h1
                        className={
                            winner ? 'winner-text' : 'winner-text hidden'
                        }
                    >
                        {winner !== 'draw'
                            ? `The winner is Player ${winner}`
                            : 'Draw! Start a new game'}
                    </h1>
                )}
            </div>
            <div
                className={
                    !gridState || winner
                        ? 'btn-container'
                        : 'btn-container hidden'
                }
            >
                <button
                    onClick={startNewGame}
                    className={warning ? 'warning' : ''}
                >
                    {winner ? 'Restart' : 'Start a New Game'}
                </button>
            </div>
        </div>
    );
}

export default TextSection;
