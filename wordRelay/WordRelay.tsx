import * as React from 'react';
const { useState, useCallback } = React;

const WordRelay = ():JSX.Element => {
    const [word, setWord] = useState<string>('개발자');
    const [value, setValue] = useState<string>('');
    const [result, setResult] = useState<string>('');
    const inputEl = React.useRef<HTMLInputElement | null>(null)

    const onSubmitForm = useCallback<(e: React.FormEvent) => void>((e) => {
        e.preventDefault();
        const input = inputEl.current;
        if(word[word.length - 1] === value[0]){
            setResult('딩동댕');
            setWord(value);
            setValue('');
            input && input.focus();
        } else {
            setResult('땡');
            setValue('');
            input && input.focus();
        }
    }, [word, value]);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }, []);

    return (
        <>
            <p>{word}</p>
            <form onSubmit={onSubmitForm}>
                <input 
                    ref={inputEl}
                    value={value}
                    onChange={onChange}
                />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    )
}

export default WordRelay;