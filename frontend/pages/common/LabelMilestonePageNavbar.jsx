import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LabelMilestoneTab from '@components/LabelMilestoneTab';

const LabelMilestonePageNavbar = ({ location, newButton }) => {
  return (
    <Wrapper>
      <LabelMilestoneTab currentPage={location.pathname} />
      {newButton && newButton}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

LabelMilestonePageNavbar.propTypes = {
  location: PropTypes.object.isRequired,
  newButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

export default LabelMilestonePageNavbar;
