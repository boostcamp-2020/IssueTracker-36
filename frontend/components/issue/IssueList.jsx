import React from 'react';
import PropTypes from 'prop-types';
import Mytable from '@components/common/table';
import IssueCard from '@components/IssueCard';
import Label from '@components/common/label';
import IssueListHeader from './IssueListHeader';

const labelGenerator = (issueLabels) => {
  return issueLabels.reduce((acc, issueLabel) => {
    acc.push(<Label text={issueLabel.label.title} bg={issueLabel.label.color} key={issueLabel.id} />);
    return acc;
  }, []);
};

const IssueList = ({ issues }) => {
  return (
    <>
      <Mytable
        width='100%'
        renderHeader={() => {
          return <IssueListHeader />;
        }}
        renderBody={() => {
          return issues.map((issue) => {
            return (
              <IssueCard
                title={issue.title}
                labelList={labelGenerator(issue.issue_labels)}
                issueId={issue.id}
                created={issue.createdAt}
                userNickname=''
                milestoneName={issue.milestone.title}
                isClosed={issue.isClosed}
                key={issue.id}
              />
            );
          });
        }}
      />
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
