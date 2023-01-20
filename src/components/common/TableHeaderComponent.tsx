import React from "react";
import styled from "styled-components/macro";
import { SearchBarComponent } from "./SearchBarComponent";
import { StyledButton } from "./StyledButton";

const StyledHeaderBox = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const StyledTitleBox = styled.div`
  display: flex;
`;

const StyledTitle = styled.div`
  font-weight: 550;
  font-size: 1.4rem;
  transition: all 0.3s ease;
`;

const StyledAddButtonBox = styled.div`
  display: flex;
  width: 11rem;
`;

const StyledSearch = styled.div`
  width: max(100px, 25vw) !important;
  margin-inline-end: 1rem;
  margin-top: 0.15rem;
`;

const StyledBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export type TableHeaderProps = {
  title: string;
  searchInputPlaceHolder: string;
  addButtonText?: string;
  onRequestAddDialog?(): void;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TableHeaderComponent: React.FC<TableHeaderProps> = ({
  title,
  addButtonText,
  searchInputPlaceHolder,
  onRequestAddDialog,
  onSearchInput,
}) => {
  return (
    <StyledHeaderBox>
      <StyledTitleBox>
        <StyledTitle>{title}</StyledTitle>
      </StyledTitleBox>
      <StyledBox>
        <StyledSearch>
          <SearchBarComponent
            onSearchInput={onSearchInput}
            placeHolder={searchInputPlaceHolder}
          />
        </StyledSearch>
        {addButtonText && (
          <StyledAddButtonBox>
            <StyledButton
              buttonName={addButtonText}
              onClick={onRequestAddDialog}
            />
          </StyledAddButtonBox>
        )}
      </StyledBox>
    </StyledHeaderBox>
  );
};
