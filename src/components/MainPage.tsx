/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import {
  StyledButton,
  StyledContainer,
  StyledContainerCentred,
  StyledForm,
} from './styledComponents';

function MainPage() {
  const { register } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { difficulty: 'easy', bombNumber: 10 },
  });

  return (
    <main>
      <StyledContainerCentred>
        <StyledForm method="post" action="game-board">
          <StyledContainer>
            <h3>Choose game difficulty</h3>
            <select {...register('difficulty')}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </StyledContainer>

          <StyledContainer>
            <h3>Enter number of bombs</h3>
            <input
              type="number"
              {...register('bombNumber', { required: true, max: 99, min: 10 })}
            />
          </StyledContainer>

          <StyledButton type="submit">Start</StyledButton>
        </StyledForm>
      </StyledContainerCentred>
    </main>
  );
}

export default MainPage;
