import { useState, MouseEvent, useEffect, ChangeEvent, FormEvent } from "react";

import "./pricing.scss";
import "../../styles/global.scss";
import IAsset from "../../ts/interfaces/Asset";
import PricingAsset from "./pricing-asset/PricingAsset";
import NewAsset from "./new-asset/NewAsset";
import PricingResult from "./pricing-result/PricingResult";
import axios from "axios";
import { useLoading } from "../../contexts/LoadingContext";
import IPricingFormData from "../../ts/interfaces/PricingFormData";
import IPricingResult from "../../ts/interfaces/PricingResult";
import IReport from "../../ts/interfaces/Report";
import { calculateTotalAssetsValue } from "../../utils";
const Pricing = () => {
  const [data, setData] = useState<IPricingFormData>({
    nazwa_organu_egzekucyjnego: "",
    nr_sprawy: "",
    owner_data: "",
    assets: [],
  });
  const addAsset = (e: MouseEvent<HTMLButtonElement>, asset: IAsset) => {
    asset.img_url = fetchedAssets.find(
      (e) => e.ticker === asset.ticker
    )?.img_url;
    e.preventDefault();
    setData({
      ...data,
      assets: [...data.assets, asset],
    });
  };

  const deleteAsset = (e: MouseEvent<HTMLButtonElement>, index: number) => {
    e.preventDefault();
    const newAssets = data.assets.filter((asset, i) => i !== index);
    setData({
      ...data,
      assets: newAssets,
    });
  };
  const [fetchedAssets, setFetchedAssets] = useState<IAsset[]>([]);
  const [report, setReport] = useState<IReport | undefined>(undefined);
  const { setLoading } = useLoading();

  const fetchAssets = () => {
    setLoading({
      state: true,
      content: <h3>Pobieranie walut...</h3>,
    });
    axios
      .get(`http://127.0.0.1:8000/api/assets/`)
      .then((res) => {
        setFetchedAssets(res.data);
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

  const getPricing = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(data);
    setLoading({
      state: true,
      content: <h3>Wyliczanie...</h3>,
    });
    axios
      .post(`http://127.0.0.1:8000/api/pricing/`, data)
      .then((res) => {
        console.log(res.data);
        setPricingResults(res.data.pricing_results);
        setReport(res.data.report);
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

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [pricingResults, setPricingResults] = useState<IPricingResult[]>([]);
  const fetchReport = () => {
    axios
      .post(`http://127.0.0.1:8000/api/report/`, {
        report,
        pricing_results: pricingResults,
        total_value: calculateTotalAssetsValue(pricingResults),
      })
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          window.open(`http://localhost:8000/${res.data.pdf_file_path}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(fetchAssets, []);
  useEffect(() => {
    console.log(report);
  }, [report]);
  return (
    <div className="pricing">
      <form action="" className="pricing_form" onSubmit={(e) => getPricing(e)}>
        <h2>Wprowadź dane</h2>
        <div className="pricing_form_inputs">
          <label htmlFor="">Nazwa organu egzekucyjnego</label>
          <input
            type="text"
            name="nazwa_organu_egzekucyjnego"
            placeholder="Nazwa organu"
            className="input"
            onChange={onChange}
            required
          />
          <label htmlFor="">Numer sprawy</label>
          <input
            type="text"
            name="nr_sprawy"
            placeholder="Numer sprawy"
            className="input"
            onChange={onChange}
            required
          />
          <label htmlFor="">Dane właściciela</label>
          <input
            type="text"
            name="owner_data"
            placeholder="Dane właściciela"
            className="input"
            onChange={onChange}
            required
          />{" "}
        </div>

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
              {data.assets.map((asset: IAsset, index: number) => (
                <PricingAsset
                  asset={asset}
                  index={index}
                  deleteAsset={deleteAsset}
                />
              ))}
              <NewAsset addAsset={addAsset} fetchedAssets={fetchedAssets} />
            </tbody>
          </table>{" "}
        </div>
        <button
          className="btn btn_green"
          style={{
            minWidth: "100px",
          }}
        >
          Wyceń
        </button>
      </form>
      {pricingResults.length > 0 && (
        <PricingResult pricingResults={pricingResults} />
      )}
      {report && (
        <button onClick={fetchReport} className="btn btn_green">
          Pobierz raport
        </button>
      )}
    </div>
  );
};
export default Pricing;
