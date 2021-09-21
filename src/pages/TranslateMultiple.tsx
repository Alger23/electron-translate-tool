import React from "react";
import {GoogleTranslateLanguages} from "../constants/GoogleTranslateLanguages";

const TranslateMultiple = () => {
  let rows = GoogleTranslateLanguages.map((x, i) =>
    (<tr key={i}>
      <td>{x.cultureName}</td>
      <td>{x.displayName}</td>
    </tr>));

  return (<table>
    <tbody>
    {rows}
    </tbody>
  </table>);
};

export default TranslateMultiple;