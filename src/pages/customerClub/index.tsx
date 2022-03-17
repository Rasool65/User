import DividerWidget from '@uikits/divider/DividerWidget';
import React, { useState, useEffect } from 'react';
import { Container } from 'src/style';
import { PRIVACIES_SETTING_API } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';

import {
  ClickableTitle,
  ClickableTitleCotainer,
  PageDescribeContainer,
  PageTitleContainer,
  PrivaciesContainer,
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

function CustomerClub() {
  const { getRequest } = useHttpRequest();
  const [privacies, setPrivacies] = useState('');
  useEffect(() => {
    getRequest(PRIVACIES_SETTING_API).then((resp) => {
      setPrivacies(resp.data.privacy);
    });
  }, []);
  return (
    <Container className='static-content' isHidden={false}>
      <PageTitleContainer>
        <h3>باشگاه مشتریان خدمات سولیکو</h3>
      </PageTitleContainer>

      <ClickableTitleCotainer>
        {!!privacies && parseTitle(privacies)}
      </ClickableTitleCotainer>

      <DividerWidget type='Horizontal' />
      <PrivaciesContainer>
        {!!privacies && parseAll(privacies)}
      </PrivaciesContainer>
    </Container>
  );
}

export default CustomerClub;
