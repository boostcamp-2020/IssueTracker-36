import React from 'react';
import PropTypes from 'prop-types';
import Mytable from '@components/common/table';
import IssueCard from '@components/IssueCard';
import Label from '@components/common/label';

const IssueList = ({ issues }) => {
  return (
    <>
      <Mytable
        width='100%'
        renderHeader={() => {}}
        renderBody={() => {
          return issues.map((issue) => {
            return (
              <IssueCard
                title={issue.title}
                labelList={issue.issue_labels.reduce((acc, issueLabels) => {
                  acc.push(
                    <Label
                      text={issueLabels.label.title}
                      bg={issueLabels.label.color}
                      key={issueLabels.id}
                    />,
                  );
                  return acc;
                }, [])}
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
