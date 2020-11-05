import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Moment from 'react-moment';
import { VscMilestone } from 'react-icons/vsc';
import { GoIssueOpened, GoIssueClosed } from 'react-icons/go';

const IssueCard = ({ title, labelList, issueId, created, userNickname, milestoneName, isClosed }) => {
  return (
    <Wrapper>
      <CardMain>
        <InputCheckbox />
        <IssueClosedIcon>
          {isClosed ? (
            <GoIssueClosed style={{ color: 'red' }} />
          ) : (
            <GoIssueOpened style={{ color: 'green' }} />
          )}
        </IssueClosedIcon>
        <Title>{title}</Title>
        {labelList.map((label) => label)}
      </CardMain>
      <CardInfo>
        <div>{`#${issueId} opened`}&nbsp;</div>
        <Moment fromNow>{created}</Moment>
        <div>&nbsp;{`by ${userNickname}`}</div>
        {milestoneName && (
          <CardInfoMilestone>
            <VscMilestone />
            <CardInfoMilestoneName>{milestoneName}</CardInfoMilestoneName>
          </CardInfoMilestone>
        )}
      </CardInfo>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 16px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  &:hover {
    background-color: ${({ theme }) => theme.color.hoverBgColor};
  }
`;

const CardMain = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  border-radius: 5px;
`;

const IssueClosedIcon = styled.div`
  margin: 0 10px 0 15px;
  > svg {
    height: 20px;
    width: 20px;
  }
`;

const Title = styled.h2`
  margin-right: 5px;
  font-size: ${({ theme }) => theme.fontSize.md};
  &:hover {
    color: ${({ theme }) => theme.color.blueColor};
    cursor: pointer;
  }
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 2px 0 0 55px;
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: gray;
`;

const CardInfoMilestone = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
  svg {
    color: gray;
  }
`;

const CardInfoMilestoneName = styled.div`
  margin-left: 7px;
`;

IssueCard.propTypes = {
  title: PropTypes.string.isRequired,
  labelList: PropTypes.array,
  issueId: PropTypes.number.isRequired,
  created: PropTypes.object.isRequired,
  userNickname: PropTypes.string.isRequired,
  milestoneName: PropTypes.string,
  isClosed: PropTypes.bool.isRequired,
};

IssueCard.defaultProps = {
  labelList: [],
  milestoneName: '',
};

export default IssueCard;
