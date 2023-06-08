/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { StyledButton, StyledContainer, StyledForm } from './styledComponents';

function MainPage() {
  const { register } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { difficulty: 'easy', bombNumber: 10 },
  });

  return (
    <main>
      <StyledContainer>
        <h3>Choose the game difficulty</h3>
        <StyledForm method="post" action="game-board">
          <select {...register('difficulty')}>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
          <input type="number" {...register('bombNumber', { required: true, max: 99, min: 10 })} />
          <StyledButton type="submit">Start</StyledButton>
        </StyledForm>
      </StyledContainer>
    </main>
  );
}

export default MainPage;
