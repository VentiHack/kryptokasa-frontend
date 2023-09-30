import "../pricing-asset/pricing_assets.scss";
import "./new_asset.scss";
import axios from "axios";
import Select from "react-select";
import { useEffect, useState, MouseEvent } from "react";
import { useLoading } from "../../../contexts/LoadingContext";
import IAsset from "../../../ts/interfaces/Asset";

type Props = {
  addAsset: (e: MouseEvent<HTMLButtonElement>, asset: IAsset) => void;
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

const NewAsset = ({ addAsset }: Props) => {
  const { setLoading } = useLoading();
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
  const fetchAssets = () => {
    setLoading({
      state: true,
      content: <h3>Pobieranie walut...</h3>,
    });
    axios
      .get(`http://127.0.0.1:8000/api/assets/`)
      .then((res) => {
        setOptions(
          res.data.map((asset: IAsset) => {
            return {
              value: asset.ticker,
              img_url: asset.img_url,
              name: asset.name,
              ticker: asset.ticker,
              label: asset.ticker,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading({
          state: false,
          content: <h3>Ładowanie...</h3>,
        });
      });
  };
  const [selectedCurrency, setSelectedCurrency] = useState<IAsset | null>(null);
  const [amount, setAmount] = useState(0);
  useEffect(fetchAssets, []);

  return (
    <tr>
      <td className="td_new_asset"></td>
      <td className="pricing_asset_currency">
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
            height: "28px",
          }}
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
      </td>
      <td>
        <button
          style={{
            fontSize: "1rem",
            height: "28px",
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
