import IPricingResult from "./ts/interfaces/PricingResult";
import IProviderData from "./ts/interfaces/PrioviderData";

export const formatNumberWithThousandsSeparator = (
  num: number,
  fixedNum: number = 2
): string => {
  const formattedNumber = num
    .toFixed(fixedNum)
    .replace(/\d(?=(\d{3})+\.)/g, "$& ");
  return formattedNumber;
};

export const calculateTotalAssetsValue = (pricingResults: IPricingResult[]) => {
  let sum = 0;
  pricingResults.forEach((pricingResult: IPricingResult) => {
    sum += pricingResult.average_asset_price;
  });
  return sum;
};
