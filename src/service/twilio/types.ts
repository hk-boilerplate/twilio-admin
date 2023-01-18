// region common
export type Capabilities = {
  voice: boolean;
  SMS: boolean;
  MMS: boolean;
};
// end region

// region getPhoneNumberList
export type PhoneNumberResult = {
  available_phone_numbers: TwilioPhoneNumber[];
  uri: string;
};

export type TwilioPhoneNumber = {
  friendly_name: string;
  phone_number: string;
  lata: string;
  rate_center: string;
  latitude: string;
  longitude: string;
  locality: string;
  region: string;
  postal_code: string;
  iso_country: string;
  address_requirements: string;
  beta: boolean;
  capabilities: Capabilities;
};
// end region

// region purchaseAvailablePhoneNumber

export type PurchaseResponse = {
  sid: string;
  account_sid: string;
  friendly_name: string;
  phone_number: string;
  voice_url: string;
  voice_method: string;
  voice_fallback_url: string;
  voice_fallback_method: string;
  voice_caller_id_lookup: boolean;
  date_created: string;
  date_updated: string;
  sms_url: string;
  sms_method: string;
  sms_fallback_url: string;
  sms_fallback_method: string;
  address_requirements: string;
  beta: boolean;
  capabilities: Capabilities;
  status_callback: string;
  status_callback_method: string;
  api_version: string;
  voice_application_sid: string;
  sms_application_sid: string;
  origin: string;
  trunk_sid: string;
  emergency_status: string;
  emergency_address_sid: string;
  emergency_address_status: string;
  address_sid: string;
  identity_sid: string;
  bundle_sid: string;
  uri: string;
  status: string;
};

// end region
