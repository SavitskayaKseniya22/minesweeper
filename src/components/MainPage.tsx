/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import styled from 'styled-components';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 300px;
  padding: 1rem;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  input,
  select,
  button {
    padding: 0.2rem;
  }
`;

function MainPage() {
  const { register } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { difficulty: 'easy', bombNumber: 10 },
  });

  return (
    <main>
      <StyledForm method="post" action="game-board">
        <select {...register('difficulty')}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <input type="number" {...register('bombNumber', { required: true, max: 99, min: 10 })} />
        <button type="submit">Start</button>
      </StyledForm>
    </main>
  );
}

export default MainPage;
