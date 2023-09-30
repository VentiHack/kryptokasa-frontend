import IAsset from "../../../ts/interfaces/Asset";
import "./pricing_assets.scss";
type Props = {
  asset: IAsset;
  index: number;
};

const PricingAsset = ({ asset, index }: Props) => {
  return (
    <tr className="pricing_asset">
      <td className="pricing_asset_index">{index.toString()}</td>
      <td className="pricing_asset_currency">
        <img
          src={
            "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
          }
          alt=""
          className="pricing_asset_img"
        />
        <div className="pricing_asset_name">{asset.name}</div>
        <div className="pricing_asset_ticker">{asset.ticker}</div>
      </td>
      <td>{asset.amount}</td>
      <td></td>
    </tr>
  );
};

export default PricingAsset;
