import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import MainPageLayout from '@layouts/MainPageLayout';
import LabelMilestoneTab from '@components/LabelMilestoneTab';
import Button from '@components/common/Button';
import IssueList from '@components/issue/IssueList';
import service from '@services';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';

const IssueListPage = ({ location }) => {
  const history = useHistory();
  const useloc = useLocation();
  const inputRef = useRef();
  const urlObject = qs.parse(useloc.search);
  const [issues, setIssues] = useState([]);
  const [LabelMilestoneNumer, setLabelMilestoneNumber] = useState({ labels: 0, milestones: 0 });

  const [filterData, setFilterData] = useState({});

  const inputTextToUrl = (inputText) => {
    const queryArray = inputText.split(' ');
    const queryObject = { label: [] };
    queryArray.forEach((option) => {
      const key = option.split(':')[0];
      const val = option.split(':')[1];

      if (key === 'label') {
        queryObject[key].push(Number(val));
      } else {
        queryObject[key] = val;
      }
    });
    return qs.stringifyUrl({
      url: '/issues',
      query: { ...queryObject },
    });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      const inputText = inputRef.current.value.trim();
      const url = inputTextToUrl(inputText);
      history.push(url);
    }
  };
  const urlToInputText = () => {
    let text = '';
    Object.keys(urlObject).forEach((key) => {
      if (typeof urlObject[key] === 'object') {
        urlObject[key].forEach((labelId) => {
          text += ` ${key}:${labelId}`;
        });
      } else {
        text += ` ${key}:${urlObject[key]}`;
      }
    });
    text.trim();
    if (!urlObject.label || typeof urlObject.label === 'string') {
      urlObject.label = [urlObject.label];
    }
    inputRef.current.value = text;
  };

  useEffect(async () => {
    urlToInputText();
    setFilterData(urlObject);
    const { data: issuesResponse } = await service.getIssues(location.pathname, location.search);
    setIssues(issuesResponse.rows);
    const { data: labelsResponse } = await service.getLabels();
    const { data: milestonesResponse } = await service.getMilestones({});
    setLabelMilestoneNumber({
      labels: labelsResponse.length,
      milestones: milestonesResponse.length,
    });
  }, []);

  return (
    <MainPageLayout>
      <NavBar>
        <FilterInput ref={inputRef} onKeyPress={handleKeyPress} placeholder='Search all issues' />
        <LabelMilestoneTab
          labelsNumber={LabelMilestoneNumer.labels}
          milestonesNumber={LabelMilestoneNumer.milestones}
        />
        <Button
          text='New issue'
          onClick={() => {
            history.push('/issues/new');
          }}
          size='large'
        />
      </NavBar>
      <IssueList issues={issues} filterData={filterData} setFilterData={setFilterData} />
    </MainPageLayout>
  );
};

const FilterInput = styled.input`
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding-left: 32px;
  border: 1px solid ${({ theme }) => theme.color.borderColor};
  background-color: ${({ theme }) => theme.color.shadeBgColor};
  font-size: 14px;
  outline: none;
  line-height: 20px;
  margin-right: 10px;
  width: 100%;
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
`;

IssueListPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IssueListPage;
