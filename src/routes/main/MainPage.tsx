/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import {
  StyledButtonWide,
  StyledContainer,
  StyledContainerCentred,
  StyledTransparentButton,
} from '../../components/styledComponents';
import { updateFieldParameters, updateFormValues } from '../../store/GameSettingsSlice';
import { RootState } from '../../store/store';
import { resetGameData } from '../../store/GameDataSlice';
import { resetGameCycle } from '../../store/GameCycleSlice';
import { resetStopwatch } from '../../store/StopwatchSlice';
import { updateName } from '../../store/UserSlice';
import { FormErrorMessagesList } from './FormErrorMessage';
import { MainFormFieldType } from '../../utils/interfaces';

export const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  width: 300px;

  input,
  select {
    width: 100%;
    padding: 0.5rem;
    background-color: rgba(0, 47, 0, 0);
    color: #00ee00;
    text-align: center;
    cursor: pointer;
    border: none;
    outline: none;
  }

  input {
    appearance: textfield;
  }

  select {
    appearance: none;
    &:focus {
    }
  }
`;

function MainPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initFormValues = useSelector((state: RootState) => state.gameSettings);
  const name = useSelector((state: RootState) => state.user.name);
  const { formValues } = initFormValues;

  const {
    register,
    control,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      difficulty: formValues.difficulty,
      bombNumber: formValues.bombNumber,
      name,
    },
  });

  const { bombNumberDefault, range } = initFormValues.fieldParameters;
  const gameCycleValues = useSelector((state: RootState) => state.gameCycle);
  const { isGameStarted } = gameCycleValues;

  const difficulty = useWatch({
    control,
    name: MainFormFieldType.DIFFICULTY,
  });

  const bombNumber = useWatch({
    control,
    name: MainFormFieldType.BOMBNUMBER,
  });

  const userName = useWatch({
    control,
    name: MainFormFieldType.NAME,
  });

  useEffect(() => {
    setValue(MainFormFieldType.BOMBNUMBER, bombNumberDefault);
  }, [bombNumberDefault, dispatch, setValue]);

  useEffect(() => {
    dispatch(updateFormValues({ difficulty, bombNumber: Number(bombNumber) }));
  }, [bombNumber, difficulty, dispatch]);

  useEffect(() => {
    dispatch(updateFieldParameters(difficulty));
  }, [difficulty, dispatch]);

  const onSubmit = () => {
    dispatch(resetGameCycle());
    dispatch(resetGameData());
    dispatch(resetStopwatch());
    dispatch(updateName(userName));
    navigate('/game-board');
  };

  return (
    <main>
      <StyledContainerCentred>
        <StyledTransparentButton
          type="button"
          onClick={() => {
            navigate('/stats');
          }}
        >
          <FontAwesomeIcon icon={faClipboard} />
        </StyledTransparentButton>

        <StyledForm
          onSubmit={handleSubmit(onSubmit)}
          onChange={() => {
            dispatch(resetGameCycle());
            dispatch(resetGameData());
            dispatch(resetStopwatch());
          }}
        >
          <StyledContainer>
            <h3>Choose game difficulty</h3>
            <select {...register(MainFormFieldType.DIFFICULTY)}>
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </StyledContainer>
          <StyledContainer>
            <h3>Enter number of bombs</h3>
            <input
              type="text"
              {...register(MainFormFieldType.BOMBNUMBER, {
                required: {
                  value: true,
                  message: `Please enter a value between ${range.min} and  ${range.max}.`,
                },
                pattern: {
                  value: /[0-9]+/,
                  message: 'The value is not a number.',
                },
                max: {
                  value: range.max,
                  message: `The value of bombs is too high. Enter a value between ${range.min} and  ${range.max}.`,
                },
                min: {
                  value: range.min,
                  message: `The value of bombs is too low. Enter a value between ${range.min} and  ${range.max}.`,
                },
              })}
              placeholder={`${String(range.min)} - ${String(range.max)}`}
            />
          </StyledContainer>

          <StyledContainer>
            <h3>Enter a name</h3>
            <input
              type="text"
              {...register(MainFormFieldType.NAME, {
                required: {
                  value: true,
                  message: `Please enter a name.`,
                },

                minLength: {
                  value: 4,
                  message: `The name is too short. Please enter a name that is longer than three characters.`,
                },
              })}
              placeholder="Anonymous"
            />
          </StyledContainer>
          <StyledButtonWide type="submit">Start</StyledButtonWide>
          {isGameStarted && (
            <StyledButtonWide
              type="button"
              onClick={() => {
                navigate('/game-board');
              }}
            >
              resume game
            </StyledButtonWide>
          )}
        </StyledForm>
      </StyledContainerCentred>
      <FormErrorMessagesList
        errors={errors}
        names={[MainFormFieldType.NAME, MainFormFieldType.BOMBNUMBER]}
      />
    </main>
  );
}

export default MainPage;
