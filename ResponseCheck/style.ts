import styled from 'styled-components';

export const screen = styled.div`
    width: 300px;
    height: 200px;
    text-align: center;
    user-select: none;
    background: ${props => props.className === 'waiting' && "aqua"};
    background: ${props => props.className === 'now' && "greenyellow"};
    background: ${props => props.className === 'ready' && "red"};
`;