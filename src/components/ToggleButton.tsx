import React from "react";
import {Button} from "semantic-ui-react";

type Props = {
  value: boolean;
  text: string;
  onChange: (value: boolean, text: string) => void;
}

const ToggleButton = ({
                        value,
                        text,
                        onChange = (value: boolean, text: string) => {
                        },
                        ...rest
                      }: Props) => {

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onChange(!value, text);
  }

  return (
    <Button style={{backgroundColor: value ? 'lightgreen' : 'white'}}
            onClick={handleClick}
            {...rest}>
      {text}
    </Button>
  );
};

export default ToggleButton;