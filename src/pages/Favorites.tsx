import { Button } from 'antd';
import React, { ReactElement } from 'react';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

import { ModalRequestForm, PageHeader } from '../components';
import { fetchRequests, RequestI } from '../redux/actions/requests';
import { fetchVideos, orderTypes } from '../redux/actions/videos';

function Favorites(): ReactElement {
  const [visibleFormIndex, setVisibleForm] = React.useState<null | number | boolean>(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const userId: number = useSelector(({ auth }: RootStateOrAny) => auth.id);
  const requests: RequestI[] = useSelector(({ requests }: RootStateOrAny) => requests.items);

  const onExecuteRequestClick = (data: {
    searchValue: string;
    order: orderTypes;
    totalCount: number;
  }) => {
    dispatch(fetchVideos(data.searchValue, data.totalCount, data.order));
    history.push('/');
  };

  const onChangeRequestClick = (index: number) => {
    setVisibleForm(index);
  };

  React.useEffect(() => {
    dispatch(fetchRequests(userId));
  }, [userId]);
  return (
    <>
      <PageHeader />
      <section className="favorites">
        <div className="container">
          <h1 className="favorites__title">Избранное</h1>
          <ul className="favorites__list">
            {requests &&
              requests.map(({ requestName, id, requestValue, sortBy, totalCount }, index) => (
                <li key={id} className="favorites__item">
                  {requestName}
                  <div className="favorites__item-control">
                    <Button
                      onClick={() =>
                        onExecuteRequestClick({
                          searchValue: requestValue,
                          order: sortBy,
                          totalCount,
                        })
                      }
                      type="link">
                      выполнить
                    </Button>
                    <Button
                      onClick={() => onChangeRequestClick(index)}
                      className="change"
                      type="link">
                      изменить
                    </Button>
                  </div>
                  <ModalRequestForm
                    className={classNames({ active: visibleFormIndex === index })}
                    title={'Изменить запрос'}
                    visibleChange={setVisibleForm}
                    requestValue={requestValue}
                    totalCount={totalCount}
                    name={requestName}
                    id={id}
                    sortBy={sortBy}
                    visible={false}
                  />
                </li>
              ))}
          </ul>
        </div>
      </section>
    </>
  );
}

export default Favorites;
