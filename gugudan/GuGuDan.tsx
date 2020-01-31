import * as React from 'react';
const { useState, useRef } = React;

const GuGuDan = () => {
    const [first, setFirst] = useState<number>(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState<number>(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const inputEl = useRef<HTMLInputElement | null>(null);
    const onSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        const input = inputEl.current;
        if(parseInt(value) === first * second){
            setResult('정답');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            input && input.focus();
        } else {
            setResult('땡');
            setValue('');
            input && input.focus();
        }
    };
    return(
        <>
            <div>{first} 곱하기 {second} 는?</div>
            <form onSubmit={onSubmitForm}>
                <input 
                    type="number"
                    value={value}
                    ref={inputEl}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
                />
                <button>입력!</button>
            </form>
            <div id="result">{result}</div>
        </>
    )
};

export default GuGuDan;