import React from 'react';
import PropTypes from 'prop-types';
import IssueCard from '@components/IssueCard';

const IssueList = ({ issues }) => {
  return (
    <>
      {issues.map((issue) => {
        return (
          <IssueCard
            title={issue.title}
            issueId={issue.id}
            created={issue.createdAt}
            userNickname=''
            isClosed={issue.isClosed}
            key={issue.id}
          />
        );
      })}
    </>
  );
};

IssueList.propTypes = {
  issues: PropTypes.array,
};

IssueList.defaultProps = {
  issues: [],
};

export default IssueList;
