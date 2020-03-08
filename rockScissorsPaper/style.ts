import styled from 'styled-components';

interface propType {
    position: string
}

export const BackGround = styled.div`
    width: 142px;
    height: 200px;
    background: url(https://en.pimg.jp/023/182/267/1/23182267.jpg);
    background-position: 0 0;
    background-position: ${(props: propType) => props.position};

`;