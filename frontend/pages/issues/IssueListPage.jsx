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
import { BiSearchAlt2 } from 'react-icons/bi';
import { UserContext } from '@store/UserProvider';
import { LabelContext } from '@store/LabelProvider';
import { MilestoneContext } from '@store/MilestoneProvider';

const IssueListPage = ({ location }) => {
  const history = useHistory();
  const useloc = useLocation();
  const inputRef = useRef();
  const [user] = useContext(UserContext);
  const [labels] = useContext(LabelContext);
  const [milestones] = useContext(MilestoneContext);
  const urlObject = qs.parse(useloc.search);
  const [issues, setIssues] = useState([]);
  const [showDropDown, setShowDropDown] = useState(false);
  const [LabelMilestoneNumber, setLabelMilestoneNumber] = useState({ labels: 0, milestones: 0 });

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
    { id: 1, type: 'Open issues', action: changeUrl('isClosed', false) },
    { id: 2, type: 'Your issues', action: changeUrl('author', user.id) },
    { id: 3, type: 'Everything assigned to you', action: changeUrl('assignee', user.id) },
    { id: 4, type: 'Everything mentioning you', action: changeUrl('comment', user.id) },
    { id: 5, type: 'Closed issues', action: changeUrl('isClosed', true) },
  ];

  useEffect(() => {
    urlToInputText();
    setFilterData(urlObject);
    getIssues();
  }, [useloc.search]);
  useEffect(() => {
    setLabelMilestoneNumber({
      labels: labels.length,
      milestones: milestones.open.length + milestones.close.length,
    });
  }, [labels, milestones]);

  return (
    <MainPageLayout>
      <NavBar>
        <FilterWrapper>
          <Button className='btn' text='filters' size='large' onClick={toggleDropdown} type='secondary'>
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
          <InputWrapper>
            <BiSearchAlt2 className='icon' />
            <FilterInput ref={inputRef} onKeyPress={handleKeyPress} placeholder='Search all issues' />
          </InputWrapper>
        </FilterWrapper>
        <BtnWrapper>
          <LabelMilestoneTab
            labelsNumber={LabelMilestoneNumber.labels}
            milestonesNumber={LabelMilestoneNumber.milestones}
          />
          <Button
            style={{ marginLeft: '10px' }}
            text='New issue'
            onClick={() => {
              history.push('/issues/new');
            }}
            size='large'
          />
        </BtnWrapper>
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
  width: 100%;
  height: 100%;
`;
const BtnWrapper = styled.div`
  position: relative;
  display: flex;
  @media (max-width: 1012px) {
    width: 100%;
    margin-bottom: 10px;
    justify-content: space-between !important;
  }
`;
const FilterWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-right: 10px;
  display: flex;
  > .lg-btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }

  @media (max-width: 1012px) {
    margin-right: 0px;
    justify-content: space-between !important;
  }
`;
const InputWrapper = styled.div`
  display: inline-flex;
  position: relative;
  width: 100%;
  > .icon {
    position: absolute;
    height: 100%;
    padding: 10px 0px 9px 10px;
    width: 32px;
    z-index: 11;
    color: ${({ theme }) => theme.color.iconColor};
  }
`;

const NavBar = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  @media (max-width: 1012px) {
    flex-direction: column-reverse !important;
    justify-content: space-between !important;
    align-items: flex-end !important;
  }
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
