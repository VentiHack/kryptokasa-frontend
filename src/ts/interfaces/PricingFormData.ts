import IAsset from "./Asset";

export default interface IPricingFormData {
  nazwa_organu_egzekucyjnego: string;
  nr_sprawy: string;
  owner_data: string;
  assets: IAsset[];
}
