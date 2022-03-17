import { useState, useMemo } from 'react';
import {
  StyleSliderContainer,
  StyleSlider,
  StyleSliderImage,
  StyleSliderNav,
  StyleSliderNavTitle,
  StyleLeftSide,
  StyleBoxSearch,
  StyleSearch,
  StyleBoxSearchTitle,
  StyleBoxContact,
  StyleContactNum,
  StyleSearchResult,
} from './style';
import Pagination from './Pagination';
import { StyleCustomBtn } from '@uikits/button/style';
import InputWidget from '@uikits/input/InputWidget';
import IconWidget from '@uikits/icon/IconWidget';
import ArrowLeftIcon from '@assets/img/icon/Group 9.svg';
import Headphone from '@assets/img/icon/Group 10.svg';
import { useSelector } from 'react-redux';
import { ISlider } from './Slider';
import { BASE_URL } from '@config/urls';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Menu from '@uikits/menu/Menu';
import MenuItem from '@uikits/menu/MenuItem';
import { PRODUCTS } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import { PRODUCTS_URL, PRODUCT_URL } from '@config/constantUrl';
import ReactLoading from 'react-loading';
import { colorPalette } from '@uikits/colors/Color';

const Slider = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const [products, setProducts] = useState<any>([]);
  const [searchValue, setSearchValue] = useState<any>();
  const { getRequest } = useHttpRequest();
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);

  const { allApis } = useSelector((state: any) => state.landingReducer);

  const SliderImage: ISlider.ISliderImage[] =
    !!allApis && allApis?.slideShows.length > 0 ? allApis?.slideShows : [];
  const [CurrentImage, setCurrentImage] = useState<ISlider.ISliderImage>(
    SliderImage[0]
  );

  const handleChangeImage = (Image: number) => {
    setCurrentImage(SliderImage[Image]);
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = (Id) => {
    history.push(`${PRODUCT_URL}/${Id}`);
    setOpen(false);
  };

  const handleSearch = () => {
    if (!!searchValue && searchValue.length > 1) {
      setLoadingSearch(true);
      getRequest(
        `${PRODUCTS}?limit=50&Search=${!!searchValue ? searchValue : ''} `
      )
        .then((resp) => {
          setProducts(resp.data.items);
          setLoadingSearch(false);
        })
        .catch((err) => {
          setLoadingSearch(false);
        });
    }
  };

  const handleEnterInput = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useMemo(() => {
    if (!!searchValue && searchValue.length > 1) {
      handleSearch();
    } else {
      setSearchValue('');
      setProducts([]);
    }
  }, [searchValue]);

  return (
    <StyleSliderContainer>
      <StyleSlider>
        {CurrentImage &&
        CurrentImage.url &&
        CurrentImage?.urlTarget !== 'none' ? (
          <a href={CurrentImage.url} target={CurrentImage.urlTarget}>
            <StyleSliderImage
              src={
                CurrentImage
                  ? `${BASE_URL}${
                      CurrentImage?.image ? CurrentImage?.image : ''
                    }`
                  : ''
              }
            />
          </a>
        ) : (
          <StyleSliderImage
            src={
              CurrentImage
                ? `${BASE_URL}${CurrentImage?.image ? CurrentImage?.image : ''}`
                : ''
            }
          />
        )}
        <StyleSliderNav>
          <StyleSliderNavTitle>
            {CurrentImage ? CurrentImage.title : '...'}
          </StyleSliderNavTitle>
          <Pagination
            Images={SliderImage}
            CurrentImageId={CurrentImage ? +CurrentImage.id : 0}
            onChageImage={handleChangeImage}
          />
        </StyleSliderNav>
      </StyleSlider>
      <StyleLeftSide>
        <StyleBoxSearch>
          <StyleBoxSearchTitle>به دنبال محصول خاصی هستید؟</StyleBoxSearchTitle>
          <StyleSearch>
            <ClickAwayListener
              onClickAway={() => {
                setOpen(false);
              }}
            >
              <div className='search'>
                <InputWidget
                  style={{ width: '232px', height: '32px' }}
                  inputProps={{
                    onClick: handleClick,
                    placeholder: '',
                    name: 'search',
                    onChange: (e) => {
                      setSearchValue(e.target.value);
                    },
                    onKeyDown: handleEnterInput,
                  }}
                />
                <StyleCustomBtn
                  type='button'
                  Width={'33px'}
                  Height={'33px'}
                  onClick={handleSearch}
                >
                  {loadingSearch ? (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <ReactLoading
                        type={'spinningBubbles'}
                        color={colorPalette.white}
                        height={18}
                        width={18}
                      />
                    </div>
                  ) : (
                    <IconWidget
                      alt='arrowLeft'
                      src={ArrowLeftIcon}
                      width={'20px'}
                      height={'11px'}
                    />
                  )}
                </StyleCustomBtn>
                {open && products?.length > 0 ? (
                  <StyleSearchResult>
                    <Menu typeItem='Vertical'>
                      {!!products && products?.length > 0 && !loadingSearch ? (
                        products.map((item, index) => {
                          return (
                            <MenuItem
                              key={index}
                              title={item.name}
                              onClick={() => {
                                handleClickAway(item.id);
                              }}
                            >
                              {item.name_fa}
                            </MenuItem>
                          );
                        })
                      ) : (
                        <div
                          style={{ display: 'flex', justifyContent: 'center' }}
                        >
                          <ReactLoading
                            type={'spinningBubbles'}
                            color={colorPalette.red_650}
                            height={30}
                            width={30}
                          />
                        </div>
                      )}
                    </Menu>
                  </StyleSearchResult>
                ) : undefined}
              </div>
            </ClickAwayListener>
          </StyleSearch>
        </StyleBoxSearch>
        <StyleBoxContact>
          <IconWidget
            alt='arrowLeft'
            src={Headphone}
            width={'58px'}
            height={'52px'}
          />
          <StyleContactNum>
            <p>شماره تماس پشتیبانی </p>
            <p> 021-61370000</p>
          </StyleContactNum>
        </StyleBoxContact>
      </StyleLeftSide>
    </StyleSliderContainer>
  );
};

export default Slider;
