import * as React from 'react';
import * as Styled from './style';

const Ball = ({ number }: { number: number }): JSX.Element => {
    let background: string;
    if(number <= 10) {
        background = 'red';
    } else if (number <= 20) {
        background = 'orange';
    } else if (number <= 30) {
        background = 'yellow';
    } else if (number <= 40) {
        background = 'blue';
    } else {
        background = 'green';
    }

    return (
        <>
            <Styled.LottoBall 
                style={{ background }}>
                {number}
            </Styled.LottoBall>
        </>
    )
}

export default React.memo(Ball);