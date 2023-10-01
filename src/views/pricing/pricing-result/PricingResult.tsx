// import { useState } from "react";
import IPricingResult from "../../../ts/interfaces/PricingResult";
import PricingResultRow from "./PricingResultRow";
import "../../../styles/global.css";
import {
  calculateTotalAssetsValue,
  formatNumberWithThousandsSeparator,
} from "../../../utils";
type Props = {
  pricingResults: IPricingResult[];
};
const PricingResult = ({ pricingResults }: Props) => {
  return (
    <>
      <h2>Szacowane wartości</h2>
      <table>
        <thead></thead>
        <tbody>
          {pricingResults.map(
            (pricingResult: IPricingResult, index: number) => (
              <PricingResultRow pricing_result={pricingResult} index={index} />
            )
          )}
          <tr></tr>
          <tr className="pricing_asset">
            <th></th>
            <th></th>
            <th></th>
            <th>Łączna wartość:</th>
            <th>
              {formatNumberWithThousandsSeparator(
                calculateTotalAssetsValue(pricingResults)
              )}{" "}
              zł
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default PricingResult;
