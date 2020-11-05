/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MyTable = ({ renderHeader, renderBody, width }) => (
  <Table width={width}>
    <HeaderSlot>{renderHeader()}</HeaderSlot>
    <BodySlot>{renderBody()}</BodySlot>
  </Table>
);

MyTable.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderBody: PropTypes.func.isRequired,
  width: PropTypes.string,
};
MyTable.defaultProps = {
  width: '100%',
};
const HeaderSlot = styled.thead`
  background-color: #eee;
`;
const BodySlot = styled.tbody`
  /* background-color: #eee; */
`;
const Table = styled.table`
  border-collapse: collapse;
  border: 2px solid #eee;
  border-radius: 20px;
  margin: 0px;
  width: ${(props) => props.width};
`;

export default MyTable;
