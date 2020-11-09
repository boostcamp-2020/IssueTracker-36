/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MyTable = ({ renderHeader, renderBody, width }) => (
  <Wrapper>
    <Table width={width}>
      <HeaderSlot>{renderHeader()}</HeaderSlot>
      <BodySlot>{renderBody()}</BodySlot>
    </Table>
  </Wrapper>
);

MyTable.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  width: PropTypes.string,
};
MyTable.defaultProps = {
  width: '100%',
};

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  overflow: hidden;
  border-radius: 4px;
`;
const HeaderSlot = styled.thead`
  background-color: ${({ theme }) => theme.color.shadeBgColor};
  border-bottom: 2px solid ${({ theme }) => theme.color.borderColor};
`;
const BodySlot = styled.tbody``;
const Table = styled.table`
  border-collapse: collapse;
  margin: 0px;
  width: ${(props) => props.width};
`;

export default MyTable;
