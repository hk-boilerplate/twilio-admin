import http from "../../axios";
import {
  GetTrunkMappedNumbersResponse,
  NumberTrunkMappingResponse,
  PhoneNumberResult,
  PurchaseGetResponse,
  PurchasePostResponse,
} from "./types";

export const getPhoneNumberList = async (
  areaCode: number,
  pageSize: number
) => {
  const sid = process.env.REACT_APP_TWILIO_SID_FE;
  const apiUrl = `${process.env.REACT_APP_TWILIO_API_URL}/2010-04-01/Accounts/${sid}/AvailablePhoneNumbers/US/Local.json/?AreaCode=${areaCode}&PageSize=${pageSize}`;
  return http.get<PhoneNumberResult>(apiUrl, {
    auth: {
      username: sid!,
      password: process.env.REACT_APP_TWILIO_AUTH_TOKEN_FE!,
    },
  });
};

export const purchaseAvailablePhoneNumber = async (phoneNumber: string) => {
  const sid = process.env.REACT_APP_TWILIO_SID_FE;
  const apiUrl = `${process.env.REACT_APP_TWILIO_API_URL}/2010-04-01/Accounts/${sid}/IncomingPhoneNumbers.json`;
  const params = new URLSearchParams();
  params.append("PhoneNumber", phoneNumber);
  return http.post<PurchasePostResponse>(apiUrl, params, {
    auth: {
      username: sid!,
      password: process.env.REACT_APP_TWILIO_AUTH_TOKEN_FE!,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};

export const getPurchasedPhoneNumberList = async (pageSize: number) => {
  const sid = process.env.REACT_APP_TWILIO_SID_FE;
  const apiUrl = `${process.env.REACT_APP_TWILIO_API_URL}/2010-04-01/Accounts/${sid}/IncomingPhoneNumbers.json?PageSize=${pageSize}`;
  return http.get<PurchaseGetResponse>(apiUrl, {
    auth: {
      username: sid!,
      password: process.env.REACT_APP_TWILIO_AUTH_TOKEN_FE!,
    },
  });
};

export const addPhoneNumberToTrunk = async (phoneNumberSid: string) => {
  const sid = process.env.REACT_APP_TWILIO_SID_FE;
  const apiUrl = `${process.env.REACT_APP_TWILIO_API_TRUNK_URL}/${process.env.REACT_APP_TWILIO_TRUNK_ID}/PhoneNumbers`;
  const params = new URLSearchParams();
  params.append("PhoneNumberSid", phoneNumberSid);
  return http.post<NumberTrunkMappingResponse>(apiUrl, params, {
    auth: {
      username: sid!,
      password: process.env.REACT_APP_TWILIO_AUTH_TOKEN_FE!,
    },
  });
};

export const getPhoneNumbersMappedToTrunk = async (pageSize: number) => {
  const sid = process.env.REACT_APP_TWILIO_SID_FE;
  const apiUrl = `${process.env.REACT_APP_TWILIO_API_TRUNK_URL}/${process.env.REACT_APP_TWILIO_TRUNK_ID}/PhoneNumbers?PageSize=${pageSize}`;
  return http.get<GetTrunkMappedNumbersResponse>(apiUrl, {
    auth: {
      username: sid!,
      password: process.env.REACT_APP_TWILIO_AUTH_TOKEN_FE!,
    },
  });
};

export const deletePhoneNumberMappedToTrunk = async (
  phoneNumberSid: string
) => {
  const sid = process.env.REACT_APP_TWILIO_SID_FE;
  const apiUrl = `${process.env.REACT_APP_TWILIO_API_TRUNK_URL}/${process.env.REACT_APP_TWILIO_TRUNK_ID}/PhoneNumbers/${phoneNumberSid}`;
  return http.delete(apiUrl, {
    auth: {
      username: sid!,
      password: process.env.REACT_APP_TWILIO_AUTH_TOKEN_FE!,
    },
  });
};
