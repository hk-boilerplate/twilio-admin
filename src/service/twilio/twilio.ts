import http from "../../axios";
import { PhoneNumberResult, PurchaseResponse } from "./types";

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
  return http.post<PurchaseResponse>(apiUrl, params, {
    auth: {
      username: sid!,
      password: process.env.REACT_APP_TWILIO_AUTH_TOKEN_FE!,
    },
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
};
