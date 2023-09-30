import React from "react";
import "../pricing-asset/pricing_assets.scss";
import IAsset from "../../../ts/interfaces/Asset";

const NewAsset = () => {
  const assets: IAsset[] = [
    {
      ticker: "BTC",
      name: "Bitcoin",
      amount: 2,
    },
  ];

  return (
    <tr>
      <td className="pricing_asset_currency">
        <select name="" id="" className="input">
          {assets.map((asset: IAsset) => (
            <option value="">
              {" "}
              <img
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
                }
                alt=""
                className="pricing_asset_img"
              />
              <div className="pricing_asset_name">{asset.name}</div>
              <div className="pricing_asset_ticker">{asset.ticker}</div>
            </option>
          ))}
        </select>
      </td>
    </tr>
  );
};

export default NewAsset;
