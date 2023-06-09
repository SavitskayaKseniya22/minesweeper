/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useNavigate } from 'react-router-dom';
import {
  StyledButton,
  StyledContainer,
  StyledContainerCentred,
  StyledForm,
} from './styledComponents';
import { getFieldSettings } from '../utils/utils';

import { update } from '../store/FormSlice';

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, control, handleSubmit, setValue } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { difficulty: 'easy', bombNumber: 10 },
  });

  const difficulty = useWatch({
    control,
    name: 'difficulty',
  });

  const bombNumber = useWatch({
    control,
    name: 'bombNumber',
  });

  useEffect(() => {
    setValue('bombNumber', getFieldSettings(difficulty).bombNumberDefault);
  }, [difficulty, setValue]);

  useEffect(() => {
    dispatch(update({ difficulty, bombNumber }));
  }, [bombNumber, difficulty, dispatch]);

  const onSubmit = () => {
    navigate('/game-board');
  };

  return (
    <main>
      <StyledContainerCentred>
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
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
