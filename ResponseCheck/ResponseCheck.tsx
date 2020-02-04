import * as React from 'react';
import * as Styled from './style';

const { useState, useRef } = React;

const ResponseCheck = () => {
  const [state, setState] = useState<string>('waiting');
  const [message, setMessage] = useState<string>('Click and Start !');
  const [result, setResult] = useState<number[]>([]);
  const timeout = useRef<number | null>(null);
  const startTime = useRef<number>(0);
  const endTime = useRef<number>(0);

  const onClickScreen = (): void => {
      if(state === 'waiting'){
          timeout.current = setTimeout(() => {
              setState('now');
              setMessage('지금 클릭!');
              startTime.current = new Date().getTime();
          }, Math.floor(Math.random() * 1000) + 2000); //2초 ~ 3초 랜덤
          setState('ready');
          setMessage('초록색이 되면 클릭하세요.');
      } else if (state === 'ready'){ //성급하게 클릭
          clearTimeout(timeout.current!);
          setState('waiting');
          setMessage('너무 성급하시군요! 초록색이 된 후에 클릭하세요.')  
      } else if (state === 'now'){ //반응속도 체크
          endTime.current = new Date().getTime();
          setState('waiting');
          setMessage('클릭해서 시작하세요.')
          setResult((prevResult): number[] => {
            return [...prevResult, endTime.current - startTime.current];
          });
      }
  }

  const renderAverage = (): JSX.Element | null => {
    return (
      result.length === 0
        ? null
        : <>
            <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
            <button onClick={onReset}>리셋</button>
          </>
    )
  }

  const onReset = (): void => {
    setResult([]);
  }

  return (
    <>
      <Styled.screen
        className={state}
        onClick={onClickScreen}
      >
          {message}
      </Styled.screen>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;