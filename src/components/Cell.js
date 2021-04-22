import React, { useEffect, useState } from 'react';
import { useGame } from '../contexts/GameContext';

function Cell({ id }) {
    const { cellClicked, cellValue, gridState } = useGame();
    const [value, setValue] = useState('');

    useEffect(() => {
        setValue(cellValue(id));
    }, [gridState]);
    return (
        <div
            className={`cell cell${id}`}
            id={id}
            onClick={(e) => {
                cellClicked(e);
            }}
        >
            <h2 className={value === '' ? 'hidden symbol' : 'symbol'}>
                {value}
            </h2>
        </div>
    );
}

export default Cell;
