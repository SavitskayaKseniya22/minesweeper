import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import {
  StyledContainerCentred,
  StyledList,
  StyledListItem,
  StyledTransparentButton,
} from '../../components/styledComponents';
import { RootState } from '../../store/store';

function Stats() {
  const scoreTable = useSelector((state: RootState) => state.scoreTable);
  const { easy, medium, hard } = scoreTable;
  const navigate = useNavigate();
  return (
    <StyledContainerCentred>
      <StyledTransparentButton
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        <FontAwesomeIcon icon={faBackward} />
      </StyledTransparentButton>
      <StyledList>
        <StyledListItem>
          <h3>Easy</h3>
          <ol>
            {easy.first && (
              <li>
                {easy.first.name}: {easy.first.time} <br />
                {new Date(easy.first.date).toLocaleString()}
              </li>
            )}
            {easy.second && (
              <li>
                {easy.second.name}: {easy.second.time}
                <br /> {new Date(easy.second.date).toLocaleString()}
              </li>
            )}
            {easy.third && (
              <li>
                {easy.third.name}: {easy.third.time}
                <br /> {new Date(easy.third.date).toLocaleString()}
              </li>
            )}
          </ol>
        </StyledListItem>
        <StyledListItem>
          <h3>Medium</h3>
          <ol>
            {medium.first && (
              <li>
                {medium.first.name}: {medium.first.time}
                <br /> {new Date(medium.first.date).toLocaleString()}
              </li>
            )}

            {medium.second && (
              <li>
                {medium.second.name}: {medium.second.time}
                <br /> {new Date(medium.second.date).toLocaleString()}
              </li>
            )}

            {medium.third && (
              <li>
                {medium.third.name}: {medium.third.time}
                <br /> {new Date(medium.third.date).toLocaleString()}
              </li>
            )}
          </ol>
        </StyledListItem>
        <StyledListItem>
          <h3>Hard</h3>
          <ol>
            {hard.first && (
              <li>
                {hard.first.name}: {hard.first.time}
                <br /> {new Date(hard.first.date).toLocaleString()}
              </li>
            )}

            {hard.second && (
              <li>
                {hard.second.name}: {hard.second.time}
                <br /> {new Date(hard.second.date).toLocaleString()}
              </li>
            )}

            {hard.third && (
              <li>
                {hard.third.name}: {hard.third.time}
                <br /> {new Date(hard.third.date).toLocaleString()}
              </li>
            )}
          </ol>
        </StyledListItem>
      </StyledList>
    </StyledContainerCentred>
  );
}

export default Stats;
