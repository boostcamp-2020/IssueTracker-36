/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MyTable = ({ header, body, width }) => (
  <Table width={width}>
    <HeaderSlot>{header()}</HeaderSlot>
    <BodySlot>{body()}</BodySlot>
  </Table>
);

MyTable.propTypes = {
  header: PropTypes.func.isRequired,
  body: PropTypes.func.isRequired,
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
  width: ${(props) => props.width || '100%'};
`;

export default MyTable;
