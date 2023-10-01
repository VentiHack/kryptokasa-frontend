import IProviderData from "../../../ts/interfaces/PrioviderData";
import IPricingResult from "../../../ts/interfaces/PricingResult";
import "../pricing-asset/pricing_assets.scss";
import "../../../styles/global.scss";
import { EXCHANGES } from "../../../enums";
import { formatNumberWithThousandsSeparator } from "../../../utils";
type Props = {
  pricing_result: IPricingResult;
  index: number;
};

const PricingResultRow = ({ pricing_result, index }: Props) => {
  console.log("XXX", pricing_result);
  return (
    <>
      <tr>
        <th>#</th>
        <th>Waluta</th>
        <th>Ilość</th>
        <th></th>
        <th></th>
      </tr>
      <tr className="pricing_asset">
        <td>{(index + 1).toString()}</td>
        <td className="pricing_asset_currency">
          <img
            src={pricing_result.asset.img_url}
            alt=""
            className="pricing_asset_img"
          />
          <div className="pricing_asset_name">{pricing_result.asset.name}</div>
          <div className="pricing_asset_ticker">
            {pricing_result.asset.ticker}
          </div>
        </td>
        <td>
          {pricing_result.asset.amount &&
            formatNumberWithThousandsSeparator(pricing_result.asset.amount, 6)}
        </td>
        <td></td>
      </tr>
      <tr className="pricing_asset">
        <th></th>
        <th>Giełda</th>
        <th>URL</th>
        <th>Kurs</th>
        <th>Wartość</th>
      </tr>
      {pricing_result.providers_data.map((providerData: IProviderData) => (
        <tr className="pricing_asset">
          <td></td>
          <td className="pricing_asset_currency">
            <img
              src={EXCHANGES[providerData.exchange_name].img_url}
              alt=""
              className="pricing_asset_img"
            />
            <span className="pricing_asset_name">
              {" "}
              {providerData.exchange_name}
            </span>
          </td>
          <td>
            <a href={providerData.api_url}>Link</a>
          </td>
          <td>
            {formatNumberWithThousandsSeparator(providerData.unit_price, 2)} zł
          </td>
          <td>
            {formatNumberWithThousandsSeparator(providerData.asset_price, 2)} zł
          </td>
        </tr>
      ))}
      <tr className="pricing_asset">
        <th></th>
        <th></th>
        <th>Średnia:</th>
        <th>
          {" "}
          {formatNumberWithThousandsSeparator(
            pricing_result.average_unit_price,
            2
          )}{" "}
          zł
        </th>
        <th>
          {" "}
          {formatNumberWithThousandsSeparator(
            pricing_result.average_asset_price,
            2
          )}{" "}
          zł
        </th>
      </tr>
    </>
  );
};

export default PricingResultRow;
