import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Mytable from '@components/common/Table';
import IssueCard from '@components/issue/IssueCard';
import Label from '@components/common/Label';
import toggleArray from '@utils/toggle-array';
import IssueListHeader from './IssueListHeader';

const labelGenerator = (issueLabels) => {
  return issueLabels.reduce((acc, issueLabel) => {
    acc.push(<Label text={issueLabel.label.title} bg={issueLabel.label.color} key={issueLabel.id} />);
    return acc;
  }, []);
};

const IssueList = ({ issues, filterData, setFilterData, getIssues }) => {
  const [selectedIssues, setSelectedIssues] = useState([]);
  const onClickSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIssues(
        issues.map((issue) => {
          return issue.id;
        }),
      );
    } else {
      setSelectedIssues([]);
    }
  };
  const onClickSelectOne = (targetId) => {
    setSelectedIssues(toggleArray(selectedIssues, targetId));
  };
  return (
    <>
      <Mytable
        width='100%'
        renderHeader={() => {
          return (
            <IssueListHeader
              filterData={filterData}
              setFilterData={setFilterData}
              onClickSelectAll={onClickSelectAll}
              selectedIssues={selectedIssues}
              setSelectedIssues={setSelectedIssues}
              getIssues={getIssues}
            />
          );
        }}
        renderBody={() => {
          return issues.map((issue) => {
            return (
              <IssueCard
                title={issue.title}
                labelList={labelGenerator(issue.issue_labels)}
                issueId={issue.id}
                created={issue.createdAt}
                userNickname={
                  issue.user_issues.find((user) => user.is_owner).user?.nickName || 'deleted user'
                }
                milestoneName={issue.milestone?.title}
                isClosed={issue.isClosed}
                key={issue.id}
                isChecked={selectedIssues.includes(issue.id)}
                onClickSelectOne={onClickSelectOne}
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
  filterData: PropTypes.object.isRequired,
  setFilterData: PropTypes.func.isRequired,
  getIssues: PropTypes.func.isRequired,
};

IssueList.defaultProps = {
  issues: [],
};

export default IssueList;
