import "../pricing-asset/pricing_assets.scss";
import "./new_asset.scss";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState, MouseEvent } from "react";
import { useLoading } from "../../../contexts/LoadingContext";
import IAsset from "../../../ts/interfaces/Asset";

type Props = {
  addAsset: (e: MouseEvent<HTMLButtonElement>, asset: IAsset) => void;
  fetchedAssets: IAsset[];
};

const Option = ({ innerProps, label, data }) => {
  return (
    <div
      {...innerProps}
      className="pricing_asset_currency"
      style={{
        height: "45px",
        padding: "5px",
      }}
    >
      <img src={data.img_url} alt={label} style={{ marginRight: "8px" }} />

      <span className="pricing_asset_name">{data.name}</span>
      <span className="pricing_asset_ticker">{data.ticker}</span>
    </div>
  );
};

const NewAsset = ({ addAsset, fetchedAssets }: Props) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      minWidth: "150px",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      minWidth: "150px",
    }),
  };
  const [options, setOptions] = useState([]);

  const [selectedCurrency, setSelectedCurrency] = useState<IAsset | null>(null);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    if (fetchedAssets.length > 0) {
      setOptions(
        fetchedAssets.map((asset: IAsset) => {
          return {
            value: asset.ticker,
            img_url: asset.img_url,
            name: asset.name,
            ticker: asset.ticker,
            label: asset.ticker,
          };
        })
      );
    }
  }, [fetchedAssets]);
  return (
    <tr>
      <td className="td_new_asset"></td>
      <td
        className="pricing_asset_currency"
        style={{
          padding: "2px",
        }}
      >
        <Select
          options={options}
          isSearchable={false}
          styles={customStyles}
          components={{
            Option: Option,
          }}
          className="currency_select"
          placeholder="Wybierz walutę..."
          //   isSearchable={true}
          defaultValue={options.length > 0 ? options[0] : null}
          value={selectedCurrency}
          onChange={setSelectedCurrency}
          //   isClearable={true}
        />
      </td>
      <td>
        <input
          type="number"
          className="input"
          step={0.000001}
          placeholder="Ilość"
          style={{
            fontSize: "1rem",
            height: "27px",
          }}
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </td>
      <td
        style={{
          padding: "0",
          display: "flex",
          alignItems: "flex-start",
        }}
      >
        <button
          style={{
            fontSize: "1rem",
            height: "38px",
          }}
          className="btn btn_green"
          onClick={(e) => {
            if (!selectedCurrency) return;
            addAsset(e, {
              amount,
              ticker: selectedCurrency.ticker,
              name: selectedCurrency.name,
            });
          }}
        >
          Dodaj
        </button>
      </td>
    </tr>
  );
};

export default NewAsset;
