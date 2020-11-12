import React, { useState, useEffect, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import MainPageLayout from '@layouts/MainPageLayout';
import LabelMilestoneTab from '@components/LabelMilestoneTab';
import Button from '@components/common/Button';
import IssueList from '@components/issue/IssueList';
import service from '@services';
import qs from 'query-string';
import Dropdown from '@components/common/Dropdown';
import optionGenerator from '@utils/OptionGenerator';
import { RiArrowDownSFill, RiArrowUpSFill } from 'react-icons/ri';
import { UserContext } from '@store/UserProvider';

const IssueListPage = ({ location }) => {
  const history = useHistory();
  const useloc = useLocation();
  const inputRef = useRef();
  const [user, dispatch] = useContext(UserContext);
  const urlObject = qs.parse(useloc.search);
  const [issues, setIssues] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
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
  const toggleDropdown = () => {
    setShowDropDown(!showDropDown);
  };
  const urlToInputText = () => {
    let text = '';
    Object.keys(urlObject).forEach((key) => {
      if (typeof urlObject[key] === 'object') {
        urlObject[key].forEach((labelId) => {
          text += ` ${key}:${labelId}`;
        });
      } else {
        if (urlObject[key] === undefined) return;
        text += ` ${key}:${urlObject[key]}`;
      }
    });
    text.trim();
    if (typeof urlObject.label === 'string') {
      urlObject.label = [urlObject.label];
    } else if (!urlObject.label) {
      urlObject.label = [];
    }
    inputRef.current.value = text;
  };
  const getIssues = async () => {
    const { data: issuesResponse } = await service.getIssues(location.pathname, location.search);
    setIssues(issuesResponse.rows);
  };

  const changeUrl = (key, val) => () => {
    const url = qs.stringifyUrl({
      url: '/issues',
      query: {
        ...filterData,
        [`${key}`]: val,
      },
    });
    history.push(url);
    toggleDropdown();
  };
  const isClosedOptions = [
    { id: 1, type: 'Open issues', action: changeUrl('isClosed', true) },
    { id: 2, type: 'Your issues', action: changeUrl('author', user.id) },
    { id: 3, type: 'Everything assigned to you', action: changeUrl('assignee', user.id) },
    { id: 4, type: 'Everything mentioning you', action: changeUrl('author', user.id) },
    { id: 5, type: 'Closed issues', action: changeUrl('isClosed', false) },
  ];

  useEffect(async () => {
    urlToInputText();
    setFilterData(urlObject);
    getIssues();
    const { data: labelsResponse } = await service.getLabels();
    const { data: milestonesResponse } = await service.getMilestones({});
    setLabelMilestoneNumber({
      labels: labelsResponse.length,
      milestones: milestonesResponse.length,
    });
  }, [useloc.search]);

  return (
    <MainPageLayout>
      <NavBar>
        <Button text='filters' size='large' onClick={toggleDropdown} type='secondary'>
          <IconWrapper> {!showDropDown ? <RiArrowDownSFill /> : <RiArrowUpSFill />}</IconWrapper>
        </Button>
        {showDropDown && (
          <Dropdown
            title='Filter Issues'
            isInputExist={false}
            marginTop='34px'
            toggleDropdown={toggleDropdown}
            options={optionGenerator.isClosed(isClosedOptions)}
          />
        )}
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
      <IssueList
        issues={issues}
        filterData={filterData}
        setFilterData={setFilterData}
        getIssues={getIssues}
      />
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
const IconWrapper = styled.div`
  line-height: 20px;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

IssueListPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default IssueListPage;
