import * as React from 'react';
import Ball from './Ball';
const { useState, useEffect, useMemo, useRef, useCallback } = React;

const getWinNumbers = () => {
    const candidate: number[] = Array(45).fill(null).map((v, i) => i + 1);
    const shuffle: number[] = [];
    while(candidate.length > 0){
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber: number = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
    return [...winNumbers, bonusNumber];
}

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState<number[]>([])
    const [bonus, setBonus] = useState<number | null>(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef<number[]>([]);

    useEffect(() => {
        for(let i: number = 0; i < winNumbers.length - 1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
            }, (i + 1) * 1000);
        }
        timeouts.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000);
        return () => {
            timeouts.current.forEach((v) => {
                clearTimeout(v);
            })
        }
    }, [timeouts.current]); //빈 배열이면 componentDidMount 와 동일
    //배열에 요소가 있으면 componentDidMount 랑 componeneDidUpdate 둘 다 수행

    useEffect(() => {
        console.log('로또 숫자를 생성합니다.');
    }, [winNumbers]);

    const onClickRedo = useCallback((): void => {
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    }, [winNumbers]);

    return(
        <>
            <div>당첨 숫자</div>
                <div id="numbers">
                    {winBalls.map((v) => <Ball key={v} number={v} />)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={ onClickRedo }>한번더!</button>}
        </>
    )
}

export default Lotto;