export type PhoneNumberResult = {
    available_phone_numbers: TwilioPhoneNumber[],
    uri: string;
}

export type Capabilities = {
    voice: boolean;
    SMS: boolean;
    MMS: boolean;
}

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
    capabilities: Capabilities
}

