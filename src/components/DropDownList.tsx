import React from "react";

type Props = {
  items: { key: string, value: string, text: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const DropDownList = ({items, value, onChange}: Props) => {
  const options = items.map(x => (<option key={x.key} value={x.value}>{x.text}</option>))

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event);
  }

  return (<select value={value} onChange={handleChange}>
    {options}
  </select>);
}

export default DropDownList;