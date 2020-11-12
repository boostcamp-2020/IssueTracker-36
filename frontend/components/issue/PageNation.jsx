import React from 'react';
import PropTypes from 'prop-types';
import ButtonGroup from '@components/common/ButtonGroup';
import Button from '@components/common/Button';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

const PageNation = ({ totalNumber, numberPerPage, page, onClick, onNext, onPrev }) => {
  const pageNumber = Math.ceil(totalNumber / numberPerPage) || 0;
  const numbers = new Array(pageNumber).fill(0);

  return (
    <ButtonGroup>
      <Button
        type='secondary'
        children={<GrFormPrevious />}
        onClick={() => {
          if (page !== 1) onPrev();
        }}
      />
      {numbers.map((number, index) => (
        <Button
          text={(index + 1).toString()}
          key={index}
          type={index + 1 === page ? 'tertiary' : 'secondary'}
          onClick={() => {
            onClick(index + 1);
          }}
        />
      ))}
      <Button
        type='secondary'
        children={<GrFormNext />}
        onClick={() => {
          if (page !== pageNumber) onNext();
        }}
      />
    </ButtonGroup>
  );
};

PageNation.propTypes = {
  totalNumber: PropTypes.number.isRequired,
  numberPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default PageNation;
