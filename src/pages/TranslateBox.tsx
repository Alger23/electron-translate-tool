import React, {SyntheticEvent, useEffect, useMemo, useState} from "react";
import {GoogleTranslateLanguages} from "../constants/GoogleTranslateLanguages";
import {TranslateMessage, useGoogleTranslate} from "../hooks/useGoogleTranslate";
import {Button, Container, Dropdown, Form, Label, Menu, Table, TextArea} from "semantic-ui-react";

const shell = window.require('electron').shell;

const TranslateBox = () => {
  const options = GoogleTranslateLanguages.map(x => ({key: x.cultureName, value: x.cultureName, text: x.displayName}));
  const [rawText, setRawText] = useState<string>('');
  const [langFrom, setLangFrom] = useState<string>('auto');
  const [lang, setLang] = useState(['zh-TW']);
  const {translated, setTranslateMessage, removeTranslate} = useGoogleTranslate();

  useEffect(() => {
    return () => removeTranslate();
  }, [removeTranslate]);

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
    return lang.map((key, i) => (
      <Table.Row key={key}>
        <Table.Cell width={1}>
          <Label ribbon>{key}</Label>
        </Table.Cell>
        <Table.Cell>
          <Form>
            <TextArea fluid value={getTranslateValue(key)}/>
            {getPronunciation(key)}
          </Form>
        </Table.Cell>
      </Table.Row>
    ));
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
              <Table.HeaderCell colSpan={2}>
                <Form>
                  <Dropdown placeholder="Select language"
                            fluid
                            search
                            selection
                            options={options}
                            value={langFrom}
                            onChange={(e, d) => setLangFrom(Object(d)['value'])}/>
                  <TextArea placeholder='hello' value={rawText} onChange={(e, d) => setRawText(Object(d)['value'])}/>
                  <Button.Group fluid>
                    <Button onClick={doTranslate}>Translate</Button>
                    <Button.Or/>
                    <Button onClick={openBrowser}>Google Translate</Button>
                  </Button.Group>
                </Form>
              </Table.HeaderCell>
            </Table.Row>

            <Table.Row>
              <Table.HeaderCell colSpan={2}>
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