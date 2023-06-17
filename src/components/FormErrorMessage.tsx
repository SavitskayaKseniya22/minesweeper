import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import negative from '../assets/images/FO3NegativeKarmaPoints.webp';
import { BasicStyledContainer } from './styledComponents';

export const StyledErrorMessage = styled('li')`
  ${BasicStyledContainer}
  gap:0;
  p {
    flex-grow: 2;
  }
`;

export function FormErrorMessageContainer({
  errors,
  name,
}: {
  errors: FieldErrors<{
    difficulty: string;
    bombNumber: number;
    name: string;
  }>;
  name: 'name' | 'bombNumber' | 'difficulty';
}) {
  return (
    <StyledErrorMessage>
      <img src={negative} alt="error face" />
      <p>
        <ErrorMessage errors={errors} name={name} />
      </p>
    </StyledErrorMessage>
  );
}

export const StyledErrorMessagesList = styled('ul')`
  position: absolute;
  top: 2rem;
  left: 2rem;
  display: flex;
  width: 300px;
  flex-direction: column;
  gap: 1rem;
`;

export function FormErrorMessagesList({
  errors,
  names,
}: {
  errors: FieldErrors<{
    difficulty: string;
    bombNumber: number;
    name: string;
  }>;

  names: ('name' | 'difficulty' | 'bombNumber')[];
}) {
  return (
    <StyledErrorMessagesList>
      {names.map(
        (elem) =>
          errors[elem] && (
            <FormErrorMessageContainer key={elem.toString()} errors={errors} name={elem} />
          )
      )}
    </StyledErrorMessagesList>
  );
}
