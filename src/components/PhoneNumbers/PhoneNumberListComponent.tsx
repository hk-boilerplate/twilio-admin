import { DollarCircleOutlined } from "@ant-design/icons";
import { Table, Tag, Tooltip } from "antd";
import styled from "styled-components";
import {
  PhoneNumberResult,
  TwilioPhoneNumber,
} from "../../service/twilio/types";
import { AsyncState } from "../../hooks/use-async";
import { ColumnsType } from "antd/es/table";
import { EmptyPageContent } from "../common/EmptyPageContent";

export type PhoneNumberListComponentProps = {
  hasSearchTerm: boolean;
  phoneNumberResult: AsyncState<PhoneNumberResult>;
  onRequestPurchase(phoneNumber: string): void;
};

const StyledTable = styled(Table)`
  padding-top: 1rem;
  thead {
    th {
      padding: 0.5rem !important;
      background: #def3fc;
    }
  }
  tbody {
    tr:nth-child(even) {
      background: rgba(217, 217, 217, 0.2) !important;
    }
  }
  td {
    text-align: center !important;
  }
  .ant-pagination-total-text {
    font-weight: 500 !important;
    font-size: 1rem !important;
    line-height: 30px;
    color: rgba(0, 0, 0, 0.85);
  }
  .ant-table-body {
    min-height: 68vh !important;
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      background-color: #f5f5f5;
    }
    ::-webkit-scrollbar {
      width: 5px;
      height: 5px;
      background-color: #f5f5f5;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #9e9e9e;
    }
  }
`;

const StyledTableElement = styled.div`
  font-weight: 450;
  font-size: 0.9rem;
  line-height: 22px;
  color: #000000;
`;

const StyledHeader = styled.div`
  padding: 10px 0;
  font-weight: 400 !important;
  font-size: 0.9rem !important;
  line-height: 22px !important;
  color: #3e79f7 !important;
  text-align: center;
`;

const StyledActionPanel = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const scale = "transform: scale(1.2);";

const StyledPurchaseIcon = styled(DollarCircleOutlined)`
  font-size: 1.2rem;
  color: #fa7514;
  transition: 0.25s ease;
  &:hover {
    ${scale}
  }
`;
// TODO: move later to constants
const purchaseButtonTooltip = "Purchase number";
const phoneNumberHeader = "Phone Number";
const smsSupportHeader = "SMS ?";
const mmsSupportHeader = "MMS ?";
const voiceSupportHeader = "Voice ?";
const yesText = "Yes";
const noText = "No";
const errorTitle = "Error";
const errorDescription = "Unable to fetch phone numbers for area code";
const emptyText = "There are no phone numbers for this country code";
const emptyDescription = "";
const tableErrorImgSrc = "error-image.png";
const emptyErrorImgSrc = "empty_data.png";

const TableActions = (
  row: TwilioPhoneNumber,
  onRequestPurchase: (phoneNumber: string) => void
) => {
  return (
    <StyledActionPanel>
      <Tooltip placement="top" title={purchaseButtonTooltip}>
        <StyledPurchaseIcon
          onClick={() => onRequestPurchase(row.phone_number)}
        />
      </Tooltip>
    </StyledActionPanel>
  );
};

export const PhoneNumberListComponent: React.FC<
  PhoneNumberListComponentProps
> = ({ hasSearchTerm, phoneNumberResult, onRequestPurchase }) => {
  const columns: ColumnsType<PhoneNumberResult | any> = [
    {
      title: () => <StyledHeader>{phoneNumberHeader}</StyledHeader>,
      dataIndex: "phone_number",
      key: "phone_number",
      render: (phoneNumber: string) => (
        <StyledTableElement>{phoneNumber}</StyledTableElement>
      ),
    },
    {
      title: () => <StyledHeader>{voiceSupportHeader}</StyledHeader>,
      dataIndex: ["capabilities", "voice"],
      key: "capabilities['voice']",
      render: (hasVoice: boolean) => (
        <StyledTableElement>{hasVoice ? yesText : noText}</StyledTableElement>
      ),
    },
    {
      title: () => <StyledHeader>{smsSupportHeader}</StyledHeader>,
      dataIndex: ["capabilities", "SMS"],
      key: "capabilities['sms']",
      render: (hasSms: boolean) => (
        <StyledTableElement>{hasSms ? yesText : noText}</StyledTableElement>
      ),
    },
    {
      title: () => <StyledHeader>{mmsSupportHeader}</StyledHeader>,
      dataIndex: ["capabilities", "MMS"],
      key: "capabilities['mms']",
      render: (hasMms: boolean) => (
        <StyledTableElement> {hasMms ? yesText : noText}</StyledTableElement>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "action",
      fixed: "right",
      width: "13rem",
      render: (_: any, record: TwilioPhoneNumber) => {
        return <>{TableActions(record, onRequestPurchase)}</>;
      },
    },
  ];

  const hasPhoneNumbers =
    phoneNumberResult.result &&
    phoneNumberResult.result.available_phone_numbers.length > 0;
  const shouldShowTable =
    phoneNumberResult.isLoading || !!hasPhoneNumbers || hasSearchTerm;

  return (
    <>
      {phoneNumberResult.error && !phoneNumberResult.isLoading && (
        <EmptyPageContent
          imageSrc={tableErrorImgSrc}
          contentTextH1={errorTitle}
          contentTextH2={errorDescription}
        />
      )}
      {!phoneNumberResult.error &&
        !phoneNumberResult.isLoading &&
        phoneNumberResult.result?.available_phone_numbers.length === 0 &&
        !hasSearchTerm && (
          <EmptyPageContent
            imageSrc={emptyErrorImgSrc}
            contentTextH1={emptyText}
            contentTextH2={emptyDescription}
          />
        )}
      {!phoneNumberResult.error && shouldShowTable && (
        <StyledTable
          rowKey={(record) => (record as TwilioPhoneNumber).phone_number}
          columns={columns}
          dataSource={phoneNumberResult.result?.available_phone_numbers}
          loading={phoneNumberResult.isLoading}
        />
      )}
    </>
  );
};
