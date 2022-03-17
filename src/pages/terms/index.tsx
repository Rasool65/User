import DividerWidget from '@uikits/divider/DividerWidget';
import React, { useState, useEffect } from 'react';
import { Container } from 'src/style';
import { TERMS_SETTING_API } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';

import {
  ClickableTitle,
  ClickableTitleCotainer,
  PageDescribeContainer,
  PageTitleContainer,
  TermsContainer,
} from './style';

const searchRegExp = /\s/g;
const replaceWith = '_';

import parser, { HTMLReactParserOptions } from 'html-react-parser';

function parseTitle(html: string) {
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      console.log(domNode);
      if (domNode.attribs) {
        if (domNode.name === 'h3') {
          return (
            <ClickableTitle
              onClick={() => {
                const section = document.querySelector(
                  `#${domNode.children[0].data.replace(
                    searchRegExp,
                    replaceWith
                  )}`
                );
                section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {domNode.children[0].data}
            </ClickableTitle>
          );
        } else {
          return <div />;
        }
      }
    },
  };

  return parser(html, options);
}
function parseAll(html: string) {
  const options: HTMLReactParserOptions = {
    replace: (domNode: any) => {
      if (domNode.attribs) {
        if (domNode.name === 'h3') {
          return (
            <h3
              id={domNode.children[0].data.replace(searchRegExp, replaceWith)}
            >
              {domNode.children[0].data}
            </h3>
          );
        }
      }
    },
  };

  return parser(html, options);
}

function Terms() {
  const { getRequest } = useHttpRequest();
  const [terms, setTerms] = useState('');
  useEffect(() => {
    getRequest(TERMS_SETTING_API).then((resp) => {
      setTerms(resp.data.terms);
    });
  }, []);
  return (
    <Container className='static-content' isHidden={false}>
      <PageTitleContainer>
        <h3> شرایط و قوانین استفاده از سرویس ها و خدمات سولیکو</h3>
      </PageTitleContainer>

      <ClickableTitleCotainer>
        {!!terms && parseTitle(terms)}
      </ClickableTitleCotainer>

      <DividerWidget type='Horizontal' />
      <TermsContainer>{!!terms && parseAll(terms)}</TermsContainer>
    </Container>
  );
}

export default Terms;
