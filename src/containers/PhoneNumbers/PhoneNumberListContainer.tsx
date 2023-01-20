import { useEffect, useMemo, useState } from "react";
import { useAsync, useAsyncEffect } from "../../hooks/use-async";
import {
  addPhoneNumberToTrunk,
  getPhoneNumberList,
  purchaseAvailablePhoneNumber,
} from "../../service/twilio/twilio";
import { PhoneNumberListComponent } from "../../components/PhoneNumbers/PhoneNumberListComponent";
import { TableHeaderComponent } from "../../components/common/TableHeaderComponent";
import debounce from "lodash.debounce";
import { PurchasePostResponse } from "../../service/twilio/types";
import { toast } from "react-toastify";

export const PhoneNumberListContainer: React.FC = () => {
  // TODO: later move to constants
  const headerTitle = "Available Phone Numbers";
  const searchPlaceHolder = "Enter area code";

  // later implement pagination
  const pageSize = 100;
  // input field for area code
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [phoneNumberResult] = useAsyncEffect({
    fn: async () => {
      const result = await getPhoneNumberList(+searchTerm, pageSize);
      return result.data;
    },
    dependencies: [searchTerm],
  });

  const [purchaseNumberResult, purchaseNumber] = useAsync({
    fn: async (phoneNumber: string) => {
      const result = await purchaseAvailablePhoneNumber(phoneNumber);
      return result;
    },
  });

  const [addNumberForTrunkResult, addNumberForTrunk] = useAsync({
    fn: async (phoneNumberSid: string) => {
      const result = await addPhoneNumberToTrunk(phoneNumberSid);
      return result.data;
    },
  });

  const handleVehicleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (addNumberForTrunkResult.error) {
      toast.error(`Number pruchased, but failed adding to trunk !`);
    }
  }, [addNumberForTrunkResult.error]);

  useEffect(() => {
    if (purchaseNumberResult.error) {
      toast.error("Purchase number failed");
    }
  }, [purchaseNumberResult.error]);

  const handleSearch = useMemo(() => {
    return debounce(handleVehicleSearchInput, 300);
  }, []);

  useEffect(() => {
    return () => {
      handleSearch.cancel();
    };
  });

  const handlePurchaseRequest = async (phoneNumber: string) => {
    await purchaseNumber(phoneNumber);
    const response = purchaseNumberResult.result;
    if (response) {
      await addNumberForTrunk(response.data.sid);
      if (addNumberForTrunkResult.result) {
        toast.success(
          `${phoneNumber} purchased and mapped to trunk successfully`
        );
      }
      // TODO: redirect here
    }
  };

  return (
    <>
      <TableHeaderComponent
        title={headerTitle}
        searchInputPlaceHolder={searchPlaceHolder}
        onSearchInput={handleSearch}
      />
      <PhoneNumberListComponent
        phoneNumberResult={phoneNumberResult}
        hasSearchTerm={!!searchTerm}
        onRequestPurchase={handlePurchaseRequest}
      />
    </>
  );
};
