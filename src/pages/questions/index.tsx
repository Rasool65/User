import { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  SectionQuestions,
  QuestionsHeader,
  HeaderTitle,
  HeaderInputGroup,
  InputCustom,
  QuestionContent,
  ContentTitle,
  ContentDescription,
  Description,
  ContactUs,
  ContactUsItem,
} from './style';
import Banner from '@uikits/banner/BannerWidget';
import IconWidget from '@uikits/icon/IconWidget';
import Collapse from '@uikits/collapse/CollapseWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import { Container } from '../../style';
import { StyleDivider } from '@uikits/divider/style';
import searchIcon from '@assets/img/icon/search-interface-symbol.svg';
import phoneIcon from '@assets/img/icon/phone-call.svg';
import envelopeIcon from '@assets/img/icon/envelope.svg';
import useHttpRequest from '@hooks/useHttpRequest';
import { FAQS } from '@config/constantApi';
import { QUESTIONS_URL } from '@config/constantUrl';

const Questions = () => {
  const { getRequest } = useHttpRequest();
  const [result, setResult] = useState([]);
  const [allQuestion, setAllQuestion] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  const [inputValue, setInputValue] = useState<any>('');

  const handleSearch = () => {
    setSearchValue(inputValue);
    history.replace(`${QUESTIONS_URL}?Search=${inputValue ? inputValue : ''}`);
    // setInputValue('');
    if (!!inputValue) {
      setResult([
        ...allQuestion.filter((_elm: any) => {
          const regex = new RegExp(inputValue, 'gi');

          return (
            _elm['answer'].toLowerCase().match(regex) ||
            _elm['question'].toLowerCase().match(regex)
          );
        }),
      ]);
    } else if (inputValue === '') {
      setResult(allQuestion);
    }
  };

  const handleEnterInput = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getQuestions = () => {
    getRequest(FAQS)
      .then((resp) => {
        setAllQuestion(resp.data);
        setResult(resp.data);
      })
      .catch(() => {
        return;
      });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getQuestions();
  }, []);

  return (
    <SectionQuestions>
      <QuestionsHeader>
        <Banner type='component'>
          <div>
            <HeaderTitle>سلام, چطوری می‌تونیم کمکتون کنیم؟</HeaderTitle>
            <HeaderInputGroup>
              <IconWidget
                alt='search'
                src={searchIcon}
                width={'15px'}
                height={'15px'}
              />
              <InputCustom
                placeholder='چه سوالی براتون پیش اومده؟'
                name='search'
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={handleEnterInput}
              />
              <StyleCustomBtn
                type='button'
                Width={'117px'}
                Height={'35px'}
                onClick={handleSearch}
              >
                جستجو
              </StyleCustomBtn>
            </HeaderInputGroup>
          </div>
        </Banner>
      </QuestionsHeader>
      <Container isHidden={false}>
        <QuestionContent>
          <ContentTitle>سوالات متداول</ContentTitle>
          {/* <ContentDescription></ContentDescription> */}
          {result.length > 0
            ? result?.map(
                (item: { answer: string; question: string }, index) => {
                  return (
                    <div key={index}>
                      <Collapse id={index} title={item.answer}>
                        <Description>{item.question}</Description>
                      </Collapse>
                      <StyleDivider
                        Width={'100%'}
                        Height={'2px'}
                        Type={'Horizontal'}
                      />
                    </div>
                  );
                }
              )
            : ''}

          <ContentTitle>جواب یا پرسش خود را پیدا نکردید؟</ContentTitle>
          {/* <ContentDescription></ContentDescription> */}
          <ContactUs>
            <ContactUsItem name='email'>
              <IconWidget
                alt='email'
                src={envelopeIcon}
                width={'37px'}
                height={'24px'}
              />
              <h6>support@Kaleh.com</h6>
              <p>بهتریـن راه برای اینکـه خیلی زود به جواب سوالتـون برسیـد</p>
            </ContactUsItem>
            <ContactUsItem name='phone'>
              <IconWidget
                alt='phone'
                src={phoneIcon}
                width={'34px'}
                height={'34px'}
              />
              <h6>۹۸۲۱۸۸۰۳۵۶۷۹+</h6>
              <p>بهتریـن راه برای اینکـه خیلی زود به جواب سوالتـون برسیـد</p>
            </ContactUsItem>
          </ContactUs>
        </QuestionContent>
      </Container>
    </SectionQuestions>
  );
};

export default Questions;
