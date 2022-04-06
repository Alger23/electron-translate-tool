import React, {SyntheticEvent, useMemo, useState} from "react";
import {GoogleTranslateLanguages} from "../constants/GoogleTranslateLanguages";
import {TranslateMessage, useGoogleTranslate} from "../hooks/useGoogleTranslate";
import {Button, Container, Dropdown, Form, Icon, Label, Menu, Popup, Table, TextArea} from "semantic-ui-react";
// import {Ref} from 'semantic-ui-react';

const shell = window.require('electron').shell;


interface TextContentProps {
  label: string;
  value: string;
  pronunciation: string;
}

const TextContent = ({label, value, pronunciation}: TextContentProps) => {
  //const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [copyState, setCopyState] = React.useState('👈 Copy with that button')

  return (
    <>
      <Table.Row>
        <Table.Cell width={2}>
          <Popup content={copyState} on="click" pinned
                 trigger={<Label onClick={(e) => {
                   // textareaRef.current?.select();
                   // const wasSuccessful = document.execCommand('copy');
                   // setCopyState(wasSuccessful ? '👍 Text copied' : 'Unable to copy')
                   //// or
                   navigator.clipboard.writeText(value)
                     .then(() => {
                       console.log(`"${value}" was copied to clipboard.`);
                       setCopyState('👍 Text copied');
                     })
                     .catch((err) => {
                       console.error(`Error copying text to clipboard: ${err}`);
                       setCopyState('Unable to copy');
                     });
                 }}>
                   <Icon name="copy"/> {label}
                 </Label>}/>


        </Table.Cell>
        <Table.Cell>
          {/* <Form>
            <Ref innerRef={textareaRef}>
              <TextArea fluid value={value} rows={1} />
            </Ref>
            <span style={{ marginLeft: '1em' }}>{pronunciation}</span>
          </Form> */}
          <div>{value}</div>
          <span style={{marginLeft: '0em'}}>{pronunciation}</span>
        </Table.Cell>
      </Table.Row>
    </>
  );
};

const TranslateBox = () => {
  const options = GoogleTranslateLanguages.map(x => ({key: x.cultureName, value: x.cultureName, text: x.displayName}));
  const [rawText, setRawText] = useState<string>('');
  const [langFrom, setLangFrom] = useState<string>('auto');
  const [lang, setLang] = useState(['en', 'zh-CN', 'zh-TW']);
  const {translated, setTranslateMessage} = useGoogleTranslate();

  const results = useMemo(() => {
    const getTranslateValue = (key: string) => {
      if (translated === undefined) return '';
      if (translated[key] === undefined) return '';
      return translated[key].text || '';
    };
    const getPronunciation = (key: string) => {
      if (translated === undefined) return '';
      if (translated[key] === undefined) return '';
      return translated[key].pronunciation || '';
    };
    return lang.map((langCode, i) => {
      return (<TextContent key={i}
                           label={langCode}
                           value={getTranslateValue(langCode)}
                           pronunciation={getPronunciation(langCode)}/>);
    });
  }, [lang, translated]);

  const doTranslate = () => {
    let message: TranslateMessage = {
      from: langFrom,
      to: lang,
      text: rawText
    };
    setTranslateMessage(message);
  };

  const openBrowser = (e: SyntheticEvent<HTMLElement>, data: object) => {
    e.preventDefault();
    shell.openExternal(`https://translate.google.com/?sl=${langFrom}&tl=${lang[0]}&text=${rawText}&op=translate`);
  };

  return (
    <div>
      <Container style={{padding: '1em 0em'}}>
        <Table celled>
          <Table.Header>

            <Table.Row>
              <Table.HeaderCell colSpan={3}>
                <Form>
                  <Dropdown placeholder="Select language"
                            fluid
                            search
                            selection
                            options={options}
                            value={langFrom}
                            onChange={(e, d) => setLangFrom(Object(d)['value'])}/>
                  <TextArea placeholder='hello'
                            value={rawText}
                            onChange={(e, d) => setRawText(Object(d)['value'])}
                            onFocus={(event:React.FocusEvent<HTMLInputElement> )=>{
                              event.target.select();
                            }}
                            onKeyPress={(event: React.KeyboardEvent) => {
                              if(event.ctrlKey && event.key === "Enter"){
                                doTranslate();
                              }
                            }}/>
                  <Button.Group fluid>
                    <Button onClick={doTranslate}>Translate (Ctrl + Enter)</Button>
                    <Button.Or/>
                    <Button onClick={openBrowser}>Google Translate</Button>
                  </Button.Group>
                </Form>
              </Table.HeaderCell>
            </Table.Row>

            <Table.Row>
              <Table.HeaderCell colSpan={3}>
                <Menu>
                  <Dropdown placeholder="Select language"
                            fluid
                            multiple
                            search
                            selection
                            options={options}
                            value={lang}
                            onChange={(e, d) => setLang(Object(d)['value'])}/>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>

          </Table.Header>

          <Table.Body>
            {results}
          </Table.Body>

        </Table>
      </Container>
    </div>
  )
};

export default TranslateBox;