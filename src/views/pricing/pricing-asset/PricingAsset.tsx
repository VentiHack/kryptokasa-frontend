import IAsset from "../../../ts/interfaces/Asset";
import { MouseEvent } from "react";
import "./pricing_assets.scss";
type Props = {
  asset: IAsset;
  index: number;
  deleteAsset: (e: MouseEvent<HTMLButtonElement>, index: number) => void;
};

const PricingAsset = ({ asset, index, deleteAsset }: Props) => {
  return (
    <tr className="pricing_asset">
      <td className="pricing_asset_index">{(index + 1).toString()}</td>
      <td className="pricing_asset_currency">
        <img src={asset.img_url} alt="" className="pricing_asset_img" />
        <div className="pricing_asset_name">{asset.name}</div>
        <div className="pricing_asset_ticker">{asset.ticker}</div>
      </td>
      <td>{asset.amount?.toFixed(6)}</td>
      <td
        style={{
          padding: 0,
        }}
      >
        <button
          style={{
            height: "38px",
            width: "100%",
          }}
          className="btn btn_delete"
          onClick={(e) => deleteAsset(e, index)}
        >
          Usuń
        </button>
      </td>
    </tr>
  );
};

export default PricingAsset;
