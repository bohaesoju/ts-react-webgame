import * as React from 'react';
import { useRef, useState } from 'react';
import { TryInfo } from './types';
import Try from './Try';

const getNumbers = (): number[] => {
    const candidates: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const array: number[] = [];
    for(let i:number = 0; i < 4; i += 1){
        const chosen: number = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
};

const numberBaseball = () => {
    const [answer, setAnswer] = useState<number[]>(getNumbers());
    const [value, setValue] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const [tries, setTries] = useState<TryInfo[]>([])
    const inputEl = useRef<HTMLInputElement | null>(null);

    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        const input = inputEl.current;
        if (value === answer.join('')) {
          setTries((t) => ([
            ...t,
            {
              try: value,
              result: '홈런!',
            },
          ]));
          setResult('홈런!');
          alert('게임을 다시 실행합니다.');
          setValue('');
          setAnswer(getNumbers());
          setTries([]);
          input && input.focus()

        } else {
          const answerArray = value.split('').map((v) => parseInt(v));
          let strike = 0;
          let ball = 0;
          if (tries.length >= 9) {
            setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(',')}였습니다!`); // state set은 비동기
            alert('게임을 다시 시작합니다.');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);
            input && input.focus();

          } else {
            for (let i: number = 0; i < 4; i += 1) {
              if (answerArray[i] === answer[i]) {
                strike += 1;
              } else if (answer.includes(answerArray[i])) {
                ball += 1;
              }
            }
            setTries(t => ([
              ...t,
              {
                try: value,
                result: `${strike} 스트라이크, ${ball} 볼입니다.`,
              },
            ]));
            setValue('');
            input && input.focus;
          }
        }
      };

    return(
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmitForm}>
                <input 
                    maxLength={4}
                    ref={inputEl}
                    value={value}
                    onChange = {(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                />
                <button>입력!</button>
            </form>
            <ul>
                {tries.map((v, i) => (
                <Try key={`${i + 1}차 시도 : ${v.try}`} tryInfo={v} />
                ))}
            </ul>
        </>
    )
}

export default numberBaseball;