import { AutoComplete, Input } from "antd";
import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledInput = styled(Input)`
  background-color: #fafafb !important;
  border: 1px solid #e6ebf1;
  .ant-input {
    background-color: #fafafb !important;
    color: black !important;
  }
`;

const StyledSearch = styled(AutoComplete)`
  padding-left: 2rem;
  min-width: 320px;
  width: 100%;
  .ant-input-prefix {
    color: #72849a !important;
    font-size: 17px !important;
  }
  .ant-input-affix-wrapper {
    border-radius: 0.625rem;
    padding: 8.5px 11px !important;
  }
`;

type SearchBarComponentProps = {
  placeHolder: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchBarComponent: React.FC<SearchBarComponentProps> = ({
  placeHolder,
  onSearchInput,
}) => {
  return (
    <StyledSearch>
      <StyledInput
        onInput={onSearchInput}
        placeholder={placeHolder}
        prefix={<SearchOutlined />}
      />
    </StyledSearch>
  );
};
