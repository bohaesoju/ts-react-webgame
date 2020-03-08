import * as React from 'react';
import * as Styled from './style';

const { useState, useEffect, useRef } = React;

const rspCoords = {
    rock: '0',
    scissors: '-142px',
    paper: '-284px'
} as const;

const scores = {
    scissors: 1,
    rock: 0,
    paper: -1,
} as const

type ImgCoords = '0' | '-142px' | '-284px';

const computerChoice = (imgCoords: ImgCoords) => {
    return (Object.keys(rspCoords) as ['rock', 'scissors', 'paper']).find((k) => {
        return rspCoords[k] === imgCoords;
    });
};

const RockScissorsPaper = ():JSX.Element => {
    const [result, setResult] = useState<string>('');
    const [imgCoord, setImgCoord] = useState(rspCoords.scissors);
    const [score, setScore] = useState<number>(0);
    const interval = useRef<number>();

    useEffect(() => {
        console.log('다시 실행')
        interval.current = setInterval(changeHand, 100);
        return() => {
            console.log('종료')
            clearInterval(interval.current)
        }
    }, [imgCoord]);

    const changeHand = (): void => {
        if(imgCoord === rspCoords.rock){
            setImgCoord(rspCoords.scissors);
        } else if (imgCoord === rspCoords.scissors){
            setImgCoord(rspCoords.paper);
        } else if (imgCoord === rspCoords.paper){
            setImgCoord(rspCoords.rock)
        }
    };

    const onClickButton = (choice: 'scissors' | 'rock' | 'paper') => () => {
        clearInterval(interval.current);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)!];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            setResult('비겼습니다!');
          } else if ([-1, 2].includes(diff)) {
            setResult('이겼습니다!');
            setScore((prevScore) => prevScore + 1);
          } else {
            setResult('졌습니다!');
            setScore((prevScore) => prevScore - 1);
          }
          setTimeout(() => {
            interval.current = setInterval(changeHand, 100);
          }, 1000);
    }

    return(
        <>
            <Styled.BackGround position={imgCoord} />
            <div id="computer"></div>
            <div>
                <button id="rock" onClick={onClickButton('rock')}>rock</button>
                <button id="scissors" onClick={onClickButton('scissors')}>scissors</button>
                <button id="paper" onClick={onClickButton('paper')}>paper</button>
            </div>
            <p>{result}</p>
            <p>현재 {score}</p>
        </>
    )
};

export default RockScissorsPaper;