import { useEffect, useState } from 'react';
import {
  SectionAboutUs,
  AboutUsHeader,
  AboutUsContent,
  ContentText,
  StyleImageArea,
  StyleAreaRight,
  StyleAreaLeft,
  StyleAreaRightTop,
  StyleAreaRightButton,
  StyleBrands,
  StyleBrandItem,
} from './style';
import Banner from '@uikits/banner/BannerWidget';
import Section from '@uikits/section/SectionWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import { Container } from '../../style';
import headerImage from '@assets/img/0-کاله.png';
import Image1 from '@assets/img/aboutfooter.png';
import Image2 from '@assets/img/Capture2.png';
import Image3 from '@assets/img/Capture3.png';
import useHttpRequest from '@hooks/useHttpRequest';
import { COMPANY } from '@config/constantApi';
import { BASE_URL } from '@config/urls';

const AboutUs = () => {
  const { getRequest } = useHttpRequest();
  const [result, setResult] = useState([]);

  const getCompany = () => {
    getRequest(COMPANY)
      .then((resp) => {
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
    getCompany();
  }, []);

  return (
    <SectionAboutUs>
      <AboutUsHeader>
        <Banner background={headerImage} type='component'>
          <div>
            <StyleCustomBtn type='button' Width={'375px'} Height={'62px'}>
              درباره گروه صنایع غذایی سولیکو بیشتر بدانیم
            </StyleCustomBtn>
          </div>
        </Banner>
      </AboutUsHeader>
      <Container isHidden={false}>
        <AboutUsContent>
          <Section more={false} name={'گروه صنایع غذایی سولیکو'}>
            <ContentText>
              <p>
                برند کاله باهدف بهبود و ارتقای سطح سبد غذایی مردم ایران در سال
                ۱۳۶۶ تأسیس شد. نتیجه فعالیت‌های انجام‌شده در این مجموعه طی
                سال‌های گذشته که همگی در راستای ارتقای سبد غذایی هم‌وطنان و
                سرافرازی ایران اسلامی است، این برند را در جایگاه ۴۸ام صنایع
                غذایی در جهان (به گزارش یورو مانیتور)، برند محبوب و برتر و ۷ سال
                تنها صادرکننده نمونه در فرآورده‌های لبنی در ایران قرار داده است.
                کاله با جذب روزانه ۳ لیتر شیر فعالیت خود را آغاز کرد و امروز بیش
                از ۲۵۰۰ تن جذب شیر روزانه دارد؛ که این موضوع باعث تولید روزانه
                بیش از ۲۶۵۰ تن انواع فرآورده‌های لبنی می‌شود. در این فرآیند
                تولید، ۴۰۰۰ نفر به‌صورت روزانه در بخش‌های مختلف فعالیت دارند تا
                محصولات نهایی به دست مصرف‌کنندگان برسد. کاله توانایی تولید ۴۰۰۰
                تن پنیر را دارد و توانسته محصولات متنوع که در خارج از کشور تولید
                می‌شود را با در اختیار داشتن متخصصان حرفه‌ای تولید و در اختیار
                ایرانیان قرار دهد.
              </p>
            </ContentText>
          </Section>
          <StyleImageArea>
            <StyleAreaRight>
              <StyleAreaRightTop src={Image2} />
              <StyleAreaRightButton src={Image3} />
            </StyleAreaRight>
            <StyleAreaLeft src={Image1} />
          </StyleImageArea>
          <Section more={false} name={'آشنایی با شرکت لبنیات کاله'}>
            <ContentText>
              <p>
                برند کاله باهدف بهبود و ارتقای سطح سبد غذایی مردم ایران در سال
                ۱۳۶۶ تأسیس شد. نتیجه فعالیت‌های انجام‌شده در این مجموعه طی
                سال‌های گذشته که همگی در راستای ارتقای سبد غذایی هم‌وطنان و
                سرافرازی ایران اسلامی است، این برند را در جایگاه ۴۸ام صنایع
                غذایی در جهان (به گزارش یورو مانیتور)، برند محبوب و برتر و ۷ سال
                تنها صادرکننده نمونه در فرآورده‌های لبنی در ایران قرار داده است.
                کاله با جذب روزانه ۳ لیتر شیر فعالیت خود را آغاز کرد و امروز بیش
                از ۲۵۰۰ تن جذب شیر روزانه دارد؛ که این موضوع باعث تولید روزانه
                بیش از ۲۶۵۰ تن انواع فرآورده‌های لبنی می‌شود. در این فرآیند
                تولید، ۴۰۰۰ نفر به‌صورت روزانه در بخش‌های مختلف فعالیت دارند تا
                محصولات نهایی به دست مصرف‌کنندگان برسد. کاله توانایی تولید ۴۰۰۰
                تن پنیر را دارد و توانسته محصولات متنوع که در خارج از کشور تولید
                می‌شود را با در اختیار داشتن متخصصان حرفه‌ای تولید و در اختیار
                ایرانیان قرار دهد.
              </p>
            </ContentText>
          </Section>
          <Section more={false} name={'برندهای زیر مجموعه کاله'}>
            <StyleBrands>
              {!!result &&
                result?.length > 0 &&
                result.map((item: any, index) => {
                  return (
                    <StyleBrandItem
                      key={index}
                      src={`${BASE_URL}${item?.logo}`}
                    />
                  );
                })}
            </StyleBrands>
          </Section>
        </AboutUsContent>
      </Container>
    </SectionAboutUs>
  );
};

export default AboutUs;
