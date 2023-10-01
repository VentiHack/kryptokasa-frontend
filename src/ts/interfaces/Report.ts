import IAsset from "./Asset";

export default interface IReport {
  id: number;
  nazwa_organu_egzekucyjnego: string;
  nr_sprawy: string;
  owner_data: string;
  assets: IAsset[];
}
