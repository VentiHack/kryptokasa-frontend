// import { useState } from "react";
import IPricingResult from "../../../ts/interfaces/PricingResult";
import PricingResultRow from "./PricingResultRow";
const PricingResult = () => {
  //   const [pricingResults, setPricingResults] = useState<IPricingResult[]>([
  const pricingResults: IPricingResult[] = [
    {
      providers_data: [
        {
          unit_price: 118400.0,
          asset_price: 118400.0,
          ticker: "BTC",
          currency: "PLN",
          api_url: "https://api.zondacrypto.exchange/rest",
          exchange_name: "Zonda",
        },
        {
          unit_price: 106560.0,
          asset_price: 106560.0,
          ticker: "BTC",
          currency: "PLN",
          api_url: "https://api.zondacrypto.exchange/rest",
          exchange_name: "Binance",
        },
      ],
      time: new Date(),
    },
    //   ]);
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Giełda</th>
          <th>URL</th>
          <th>Kurs</th>
          <th>Wartość waluty</th>
        </tr>
      </thead>
      <tbody>
        {pricingResults.map((pricingResult: IPricingResult, index: number) => (
          <PricingResultRow pricing_result={pricingResult} index={index} />
        ))}
      </tbody>
    </table>
  );
};

export default PricingResult;
