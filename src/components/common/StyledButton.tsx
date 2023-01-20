import { Button } from "antd";
import styled from "styled-components";

type StyledBtnProps = {
  height?: string;
  width?: string;
};

type BtnNameProps = {
  fontSize?: string;
};

export const BtnName = styled.div<BtnNameProps>`
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize || "20px"};
  line-height: 22px;
  color: #ffffff;
`;

export const StyledBtn = styled(Button)<StyledBtnProps>`
  position: relative;
  background: #3e79f7;
  border-radius: 4px;
  height: ${({ height }) => height || "2.8rem"};
  width: ${({ width }) => width || "12rem"};
  :hover {
    background: #3e79f7;
  }
  :focus {
    background: #3e79f7;
  }
`;

export const StyledButton: React.FC<{
  buttonName: string;
  height?: string;
  width?: string;
  fontSize?: string;
  onClick?: () => void;
}> = ({ buttonName, height, width, fontSize, onClick }) => {
  return (
    <StyledBtn height={height} width={width} onClick={onClick}>
      <BtnName fontSize={fontSize}>{buttonName}</BtnName>
    </StyledBtn>
  );
};
