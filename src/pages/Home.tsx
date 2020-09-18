import React, { ReactElement } from 'react';
import { Button, Col, Input, Row } from 'antd';
import classNames from 'classnames';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';

import { ModalRequestForm, PageHeader } from '../components';
import { fetchVideos, VideoI } from '../redux/actions/videos';

import heartSvg from '../img/heart.svg';

function Home(): ReactElement {
  const [filterState, setFilterState] = React.useState<'list' | 'grid'>('list');
  const [inputValue, setInputValue] = React.useState('');
  const [visibleModal, setVisibleModal] = React.useState<null | number | boolean>(false);
  const dispatch = useDispatch();

  const videos: VideoI[] = useSelector(({ videos }: RootStateOrAny) => videos.items);
  const searchValue: string = useSelector(({ videos }: RootStateOrAny) => videos.searchValue);
  const totalResults: number = useSelector(({ videos }: RootStateOrAny) => videos.totalResults);

  const onFilterClick = (value: 'list' | 'grid') => {
    setFilterState(value);
  };

  const onInputChange = (value: string) => {
    setInputValue(value);
  };

  const onHeartIconClick = () => {
    setVisibleModal(true);
  };

  const onSearchBtnClick = () => {
    dispatch(fetchVideos(inputValue));
  };

  return (
    <>
      <PageHeader />
      <main className="main">
        <section className="search">
          <div className="container">
            <h1 className="search__title">Поиск видео</h1>
            <div className="search__block">
              <Input
                value={inputValue}
                onChange={(e) => onInputChange(e.target.value)}
                className="search__input input"
                placeholder="Что хотите посмотреть?"
              />
              <Button onClick={() => onSearchBtnClick()} className="search__btn" type="primary">
                Найти
              </Button>
              <ModalRequestForm
                className={classNames({ active: visibleModal })}
                visibleChange={setVisibleModal}
                title="Сохранить запрос"
                requestValue={inputValue}
                save
              />
              <i onClick={() => onHeartIconClick()}>
                <img src={heartSvg} alt="heart" />
              </i>
            </div>
            <div className="search__filter">
              <p className="search__filter-request">
                Видео по запросу «<span>{searchValue}</span>»
                <span className="search__request-results">{totalResults}</span>
              </p>
              <ul className="search__filter-view">
                <li
                  onClick={() => onFilterClick('list')}
                  className={classNames('search__filter-item ', {
                    active: filterState === 'list',
                  })}>
                  <i className="search__filter-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8 6H21"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 12H21"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 18H21"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 6H3.01"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 12H3.01"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 18H3.01"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </i>
                </li>
                <li
                  onClick={() => onFilterClick('grid')}
                  className={classNames('search__filter-item ', {
                    active: filterState === 'grid',
                  })}>
                  <i className="search__filter-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M10 5H5V10H10V5Z"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 5H14V10H19V5Z"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19 14H14V19H19V14Z"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 14H5V19H10V14Z"
                        stroke="#272727"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </i>
                </li>
              </ul>
            </div>
            <Row
              gutter={filterState === 'list' ? 0 : [20, 20]}
              className={`search__videos ${filterState}`}>
              {videos &&
                videos.map(({ description, title, thumbnails }, index) => (
                  <Col key={index} className="video-block" span={filterState === 'list' ? 16 : 6}>
                    <div className="video-block__video">
                      <img
                        src={thumbnails.medium.url}
                        width={thumbnails.medium.width}
                        height={thumbnails.medium.height}
                        alt=""
                      />
                    </div>
                    <div className="video-block__info">
                      <h3 className="video-block__title">{title}</h3>
                      <p className="video-block__descr">{description}</p>
                      <p className="video-block__count-views">786 тыс. просмотров</p>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
