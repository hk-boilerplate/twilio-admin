import { Button } from "antd";
import styled from "styled-components/macro";

const BtnName = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  color: #ffffff;
`;

const ListEmptyLayout = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Content1 = styled.div`
  font-weight: 600;
  font-size: 22px;
  line-height: 22px;
  color: #000000;
  margin: 1rem 0rem 0rem;
`;

const Content2 = styled.div`
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  color: #000000;
  margin: 1rem 0rem 1rem;
`;

const ListFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledBtn = styled(Button)`
  background: #3e79f7;
  border-radius: 4px;
  height: 50px;
  width: 194px;
  background: #3e79f7;
  box-shadow: 0px 4px 4px rgba(62, 121, 247, 0.25);
  border-radius: 8px;
  :hover {
    background: #3e79f7;
  }
  :focus {
    background: #3e79f7;
  }
`;

export type EmptyPageContentProps = {
  imageSrc: string;
  contentTextH1: string;
  contentTextH2: string;
  btnText?: string;
  onBtnClick?: () => void;
};

export const EmptyPageContent: React.FC<EmptyPageContentProps> = ({
  imageSrc,
  contentTextH1,
  contentTextH2,
  btnText,
  onBtnClick,
}) => {
  return (
    <ListEmptyLayout>
      <ListFlex>
        {imageSrc && <img src={imageSrc} alt={imageSrc} />}
        {contentTextH1 && <Content1>{contentTextH1}</Content1>}
        {contentTextH2 && <Content2>{contentTextH2}</Content2>}
        {btnText && (
          <StyledBtn onClick={onBtnClick}>
            <BtnName>{btnText}</BtnName>
          </StyledBtn>
        )}
      </ListFlex>
    </ListEmptyLayout>
  );
};
