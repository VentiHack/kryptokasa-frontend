import { useState, MouseEvent } from "react";

import "./pricing.scss";
import "../../styles/global.scss";
import IAsset from "../../ts/interfaces/Asset";
import PricingAsset from "./pricing-asset/PricingAsset";
import NewAsset from "./new-asset/NewAsset";
const Pricing = () => {
  const [assets, setAssets] = useState<IAsset[]>([]);

  const addAsset = (e: MouseEvent<HTMLButtonElement>, asset: IAsset) => {
    e.preventDefault();
    console.log(asset);
    setAssets([...assets, asset]);
  };

  return (
    <div className="pricing">
      <form action="" className="pricing_form">
        <h3>Wprowadź dane</h3>
        <div className="pricing_form_inputs">
          <input
            type="text"
            name="nazwa_organu"
            placeholder="Nazwa organu"
            className="input"
          />
          <input
            type="text"
            name="nr_sprawy"
            placeholder="Numer sprawy"
            className="input"
          />
          <input
            type="text"
            name="owner_data"
            placeholder="Dane właściciela"
            className="input"
          />{" "}
        </div>
        <div className="new_asset"></div>
        <div className="pricing_assets">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Waluta</th>
                <th>Ilość</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset: IAsset, index: number) => (
                <PricingAsset asset={asset} index={index + 1} />
              ))}
              <NewAsset addAsset={addAsset} />
            </tbody>
          </table>{" "}
        </div>
      </form>
    </div>
  );
};
export default Pricing;
