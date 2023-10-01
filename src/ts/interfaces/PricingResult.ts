import IAsset from "./Asset";
import IProviderData from "./PrioviderData";

export default interface IPricingResult {
  providers_data: IProviderData[];
  time: Date;
  asset: IAsset;
  average_unit_price: number;
  average_asset_price: number;
}
