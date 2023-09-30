import IProviderData from "./PrioviderData";

export default interface IPricingResult {
  providers_data: IProviderData[];
  time: Date;
}
