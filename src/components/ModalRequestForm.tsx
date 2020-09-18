import { Button, Input, Select } from 'antd';
import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { Slider, InputNumber, Row, Col } from 'antd';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { changeRequest, RequestI, saveRequest } from '../redux/actions/requests';
import { orderTypes } from '../redux/actions/videos';

interface Props {
  className?: string;
  title: string;
  visibleChange: (visible: boolean | number | null) => void;
  requestValue: string;
  save?: boolean;
  visible?: boolean;
  totalCount?: number;
  sortBy?: orderTypes;
  name?: string;
  id?: number;
}

const { Option } = Select;

function ModalRequestForm({
  className,
  title,
  visibleChange,
  requestValue,
  save,
  totalCount,
  sortBy,
  name,
  id,
}: Props): ReactElement {
  const [sliderValue, setSliderValue] = React.useState(totalCount ? totalCount : 12);
  const [requestName, setRequestName] = React.useState(name ? name : '');
  const [selectValue, setSelectValue] = React.useState<orderTypes>(sortBy ? sortBy : 'relevence');
  const [requestInputValue, setRequestInputValue] = React.useState(requestValue);
  const userId: number = useSelector(({ auth }: RootStateOrAny) => auth.id);

  const dispatch = useDispatch();

  const onSliderChange = (value: any) => {
    if (isNaN(value)) {
      return;
    }
    setSliderValue(value);
  };

  const onChangeRequestName = (value: string) => {
    setRequestName(value);
  };

  const onSelectChange = (value: orderTypes) => {
    setSelectValue(value);
  };

  const onSaveClick = (data: RequestI) => {
    dispatch(saveRequest(data));
    visibleChange(false);
    alert('Запрос сохранён');
  };

  const onChangeClick = (data: RequestI) => {
    dispatch(changeRequest(data));
  };

  const onCancelClick = () => {
    save ? visibleChange(false) : visibleChange(null);
  };

  const onChangeRequestInput = (value: string) => {
    setRequestInputValue(value);
  };

  return (
    <div className={classNames('modal-request ', className)}>
      <h2 className="modal-request__title">{title}</h2>
      <form className="modal-request__form">
        <div className="modal-request__form-input">
          <label htmlFor="">Запрос</label>
          <Input
            onChange={(e) => onChangeRequestInput(e.target.value)}
            value={save ? requestValue : requestInputValue}
            disabled={save ? true : false}
            className="input"
            type="text"
            name="request"
            id="request"
          />
        </div>
        <div className="modal-request__form-input required">
          <label htmlFor="">Название</label>
          <Input
            value={requestName}
            onChange={(e) => onChangeRequestName(e.target.value)}
            required
            className="input"
            type="text"
            name="name"
            id="name"
          />
        </div>
        <div className="modal-request__form-input">
          <label htmlFor="">Сортировать по</label>
          <Select
            onChange={onSelectChange}
            size="large"
            className="modal-request__select-input"
            defaultValue={selectValue}>
            <Option value="date">Дате</Option>
            <Option value="rating">Рейтинг</Option>
            <Option value="relevence">Релевантность</Option>
            <Option value="title">Алфавитный порядок</Option>
            <Option value="viewCount">Количество просмотров</Option>
          </Select>
        </div>
        <div className="modal-request__form-input">
          <label htmlFor="">Максимальное количество</label>
          <Row>
            <Col span={16}>
              <Slider
                className="modal-request__slider-input"
                min={1}
                max={50}
                onChange={onSliderChange}
                value={typeof sliderValue === 'number' ? sliderValue : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                step={1}
                min={1}
                max={50}
                value={typeof sliderValue === 'number' ? sliderValue : 0}
                onChange={onSliderChange}
              />
            </Col>
          </Row>
        </div>
        <Row className="modal-request__btn-box">
          <Col className="modal-request__btn" span={11}>
            <Button onClick={() => onCancelClick()} size="large">
              {save ? 'Не сохранять' : 'Не изменять'}
            </Button>
          </Col>
          <Col className="modal-request__btn" span={11}>
            <Button
              onClick={() =>
                save
                  ? onSaveClick({
                      userId,
                      totalCount: sliderValue,
                      sortBy: selectValue,
                      requestName,
                      requestValue,
                    })
                  : onChangeClick({
                      userId,
                      totalCount: sliderValue,
                      sortBy: selectValue,
                      requestName,
                      requestValue: requestInputValue,
                      id: id,
                    })
              }
              size="large"
              type="primary">
              {save ? 'Сохранить' : 'Изменить'}
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default ModalRequestForm;
