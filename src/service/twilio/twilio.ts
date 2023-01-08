import http from "../../axios";
import { PhoneNumberResult } from "./types";

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
