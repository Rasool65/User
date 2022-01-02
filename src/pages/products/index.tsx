import React, { useState, useMemo, useEffect } from 'react';
import {
  SectionProducts,
  Aside,
  Content,
  CategoryProduct,
  SearchBox,
  CategoryTitle,
  ContentNav,
  NavFilter,
  AllProducts,
  Pages,
  StyleBtnDropDown,
  EmptyBox,
} from './style';
import Menu from '@uikits/menu/Menu';
import MenuItem from '@uikits/menu/MenuItem';
import Banner from '@uikits/banner/BannerWidget';
import IconWidget from '@uikits/icon/IconWidget';
import Bredcrumb from '@uikits/bredcrumb/BredcrumbWidget';
import Pagination from '@uikits/pagination/PaginationWidget';
import { StyleCustomBtn } from '@uikits/button/style';
import { Container } from '../../style';
import Product from '../../uiKits/product/ProductWidget';
import InputWidget from '@uikits/input/InputWidget';
import bannerImage from '@assets/img/mozzarella.png';
import ArrowLeftIcon from '@assets/img/icon/Group 9.svg';
import ChevronDownIcon from '@assets/img/icon/Path 6.svg';
import EmptyProducts from '@assets/img/product.svg';
import { CATEGORIES, PRODUCTS } from '@config/constantApi';
import useHttpRequest from '@hooks/useHttpRequest';
import ReactLoading from 'react-loading';
import { colorPalette } from '@uikits/colors/Color';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { PRODUCTS_URL } from '@config/constantUrl';
import useQuery from '@hooks/useQuery';

import { AccordionSummary, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {
  CustomAccordion,
  CustomAccordionDetails,
} from '@uikits/accordion/CustomAccordion';

const RecursiveComponent = ({
  recData,
  expanded,
  handleChangeAccordion,
  changeCategory,
}) => {
  const hasChild = recData.children && recData.children.length > 0;
  const isParent = !recData.parentId;
  return (
    <React.Fragment key={recData.id}>
      {hasChild ? (
        isParent ? (
          <CustomAccordion
            expanded={expanded === recData.id}
            onChange={handleChangeAccordion(recData)}
          >
            <AccordionSummary
              expandIcon={
                <FontAwesomeIcon
                  style={{ paddingRight: 5, fontSize: '14px' }}
                  icon={faAngleDown}
                />
              }
            >
              <Typography>{recData.name}</Typography>
            </AccordionSummary>
            {recData.children.map((item, _index) => (
              <RecursiveComponent
                key={item.id}
                recData={item}
                expanded={expanded}
                handleChangeAccordion={undefined}
                changeCategory={changeCategory}
              />
            ))}
          </CustomAccordion>
        ) : (
          <CustomAccordion>
            <AccordionSummary
              expandIcon={
                <FontAwesomeIcon
                  style={{ paddingRight: 5, fontSize: '14px' }}
                  icon={faAngleDown}
                />
              }
            >
              <Typography>{recData.name}</Typography>
            </AccordionSummary>
            {recData.children.map((item, _index) => (
              <RecursiveComponent
                key={item.id}
                expanded={undefined}
                changeCategory={changeCategory}
                handleChangeAccordion={undefined}
                recData={item}
              />
            ))}
          </CustomAccordion>
        )
      ) : (
        <CustomAccordionDetails
          onClick={() => {
            changeCategory(recData.id);
          }}
        >
          <Typography>{recData.name}</Typography>
        </CustomAccordionDetails>
      )}
    </React.Fragment>
  );
};

const Products = () => {
  const SortType = [
    { id: 1, name_en: 'createDate', name_fa: 'جدید ترین', desc: '' },
    { id: 2, name_en: 'price', name_fa: 'بیشترین قیمت', desc: true },
    { id: 3, name_en: 'price', name_fa: 'کمترین قیمت', desc: false },
  ];

  const { id } = useParams<any>();

  const [parents, setParents] = useState<any>([]);

  const [products, setProducts] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const query = useQuery();

  const [loading, setLoading] = useState(false);
  const [loadingParents, setLoadingParents] = useState(false);
  const [emptyBox, setEmptyBox] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [totalSize, setTotalSize] = useState(0);

  const history = useHistory();
  const location = useLocation();

  const { getRequest } = useHttpRequest();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [catId, setCatId] = useState<any>();
  const [renderPage, setRenderPage] = useState(false);

  const [sortName, setSortName] = useState('');
  const [selectedSort, setSelectedSort] = useState('مرتب سازی');
  const [descValue, setDescValue] = useState<any>(false);
  const [inputValue, setInputValue] = useState<any>('');
  const [searchValue, setSearchValue] = useState('');

  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChangeAccordion = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel.id : false);
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [state, setState] = useState<any>({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

  function Alert(Props) {
    return <MuiAlert elevation={3} variant='filled' {...Props} />;
  }

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSearch = () => {
    setSearchValue(inputValue);
    history.replace(
      `${location.pathname}?Search=${inputValue ? inputValue : ''}`
    );
    // setInputValue('');
  };

  const handleEnterInput = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = (nameFa, nameEn, desc) => {
    setSelectedSort(nameFa);
    setSortName(nameEn);
    setDescValue(desc);
    history.replace(
      `${location.pathname}?Sort=${nameEn ? nameEn : ''}&Desc=${
        desc !== '' ? desc : false
      }`
    );
    setOpen(false);
  };

  const removeSort = () => {
    setSelectedSort('همه');
    setSortName('');
    setDescValue(false);
    history.replace(`${location.pathname}`);
    setOpen(false);
  };

  const getCategories = () => {
    getRequest(`${CATEGORIES}`)
      .then((resp) => {
        setCategories(resp.data);
      })
      .catch(() => {
        return;
      });
  };
  let names: any = [];
  let lvls = 0;
  let wrongChildCounter = 0;
  let parentLength = 0;
  const recFun = (childId, recData) => {
    names.unshift(recData.name);
    const hasChild = recData.children.length > 0;
    lvls++;
    if (hasChild) {
      parentLength = recData.children.length;
      wrongChildCounter = 0;
      recData.children.map((_item) => {
        recFun(childId, _item);
      });
    } else {
      if (recData.id === childId) {
        setParents(names);
        names = [];
      } else {
        wrongChildCounter++;
        if (wrongChildCounter === parentLength) {
          for (let i = 0; i < lvls - 1; i++) {
            names.shift();
          }
        } else {
          names.shift();
        }
      }
    }
  };
  const getParents = (childId) => {
    // !!categories &&
    categories.map((_item) => {
      names = [];
      lvls = 0;
      recFun(childId, _item);
    });
  };

  const getProducts = async (
    page = 1,
    limit = 12,
    ProductCategoryId = '',
    Search = '',
    Sort = '',
    Desc = ''
  ) => {
    const resp = !!id
      ? await getRequest(
          `${PRODUCTS}?page=${page ? page : 1}&Limit=${
            limit ? limit : 12
          }&ProductCategoryId=${id ? id : ''}`
        )
      : await getRequest(
          `${PRODUCTS}?page=${page ? page : 1}&Limit=${
            limit ? limit : 12
          }&ProductCategoryId=${
            ProductCategoryId ? ProductCategoryId : ''
          }&Search=${Search ? Search : ''}&Sort=${
            query.get('Sort') ? query.get('Sort') : Sort
          }&Desc=${Desc ? Desc : false}`
        );
    setPageSize(resp.data.pageSize);
    setTotalSize(resp.data.totalSize);
    setProducts(resp.data.items);
    if (resp.data.items?.length === 0) {
      setEmptyBox(true);
    } else {
      setEmptyBox(false);
    }
  };

  const changeCategory = (Id = '') => {
    setCategoryId(Id);
    if (!!Id) {
      getParents(Id);
      history.replace(`${PRODUCTS_URL}/${Id}`);
    } else {
      setSearchValue('');
      setParents([]);
      setInputValue('');
      history.push(PRODUCTS_URL);
    }
  };

  const getCurrentData = () => {
    setCurrentData(products);
    setRenderPage(true);
    setLoading(false);
  };

  useMemo(() => {
    if (products.length > 0) {
      getCurrentData();
    } else {
      setLoading(false);
    }
  }, [products, categoryId]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setRenderPage(false);
    setLoading(true);
    getCategories();
    getProducts(currentPage, 12, categoryId, searchValue, sortName, descValue);
    if (!!location.pathname.replace(`${PRODUCTS_URL}/`, '')) {
      setCatId(parseInt(location.pathname.replace(`${PRODUCTS_URL}/`, ''), 10));
    }
  }, [
    query.get('Sort'),
    searchValue,
    categoryId,
    sortName,
    descValue,
    currentPage,
  ]);

  useMemo(() => {
    if (categories?.length > 0 && !!catId) {
      setLoadingParents(true);
    }
  }, [categories, catId]);

  useMemo(() => {
    if (loadingParents) {
      getParents(catId);
    }
  }, [loadingParents]);

  return (
    <Container isHidden={false}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        autoHideDuration={3000}
      >
        <Alert onClose={handleCloseSnackbar} severity='success'>
          محصول با موفقیت به سبد خرید اضافه شد
        </Alert>
      </Snackbar>
      <SectionProducts>
        <Aside>
          <SearchBox>
            <InputWidget
              style={{ width: '161px', height: '32px' }}
              inputProps={{
                placeholder: 'جستجوی محصول',
                name: 'search',
                value: inputValue,
                onChange: (e) => {
                  setInputValue(e.target.value);
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
              <IconWidget
                alt='arrowLeft'
                src={ArrowLeftIcon}
                width={'20px'}
                height={'11px'}
              />
            </StyleCustomBtn>
          </SearchBox>
          <CategoryProduct>
            <CategoryTitle>دسته‌بندی محصولات</CategoryTitle>
            <Menu typeItem='Vertical' size='14px'>
              {!!categories &&
                categories.map((_item: any, _index: number) => {
                  return (
                    <RecursiveComponent
                      key={_item.id}
                      expanded={expanded}
                      handleChangeAccordion={handleChangeAccordion}
                      recData={_item}
                      changeCategory={changeCategory}
                    />
                  );
                })}

              <MenuItem
                title={'همه'}
                onClick={() => {
                  changeCategory();
                }}
              >
                <p style={{ color: 'black' }}>همه</p>
              </MenuItem>
            </Menu>
          </CategoryProduct>
        </Aside>
        <Content>
          <Banner background={bannerImage} type='image' />
          <ContentNav>
            <Bredcrumb
              listItems={parents?.length > 0 ? parents : ['لیست محصولات']}
              icon='❯'
            />
            <ClickAwayListener
              onClickAway={() => {
                setOpen(false);
              }}
            >
              <div className='sort'>
                <NavFilter onClick={handleClick}>
                  <p>{selectedSort}</p>
                  <IconWidget
                    alt='ChevronDown'
                    src={ChevronDownIcon}
                    width={'7px'}
                    height={'4px'}
                  />
                </NavFilter>
                {open ? (
                  <StyleBtnDropDown>
                    <Menu typeItem='Vertical'>
                      <MenuItem title='همه' onClick={removeSort} />
                      {SortType.map((item, index) => {
                        return (
                          <MenuItem
                            key={index}
                            title='نام'
                            onClick={() => {
                              handleClickAway(
                                item.name_fa,
                                item.name_en,
                                item.desc
                              );
                            }}
                          >
                            {item.name_fa}
                          </MenuItem>
                        );
                      })}
                    </Menu>
                  </StyleBtnDropDown>
                ) : undefined}
              </div>
            </ClickAwayListener>
          </ContentNav>
          {loading && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <ReactLoading
                type={'spinningBubbles'}
                color={colorPalette.red_650}
                height={50}
                width={50}
              />
            </div>
          )}
          <AllProducts>
            {renderPage &&
              currentData.map((product: any, index) => {
                return (
                  <Product
                    id={product.id}
                    title={product.name}
                    price={product.price}
                    img={product.image}
                    openSnackbar={() => {
                      setOpenSnackbar(true);
                    }}
                    key={index}
                  />
                );
              })}
          </AllProducts>
          {emptyBox && (
            <EmptyBox>
              <IconWidget
                alt='EmptyProducts'
                src={EmptyProducts}
                width={'59px'}
                height={'59px'}
              />
              <h4>محصولی وجود ندارد</h4>
            </EmptyBox>
          )}
          <Pages>
            {renderPage && totalSize > pageSize && (
              <Pagination
                currentPage={currentPage}
                totalCount={totalSize}
                pageSize={pageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </Pages>
        </Content>
      </SectionProducts>
    </Container>
  );
};

export default Products;
