/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';

export const InitContext = React.createContext({ difficulty: 'easy', bombNumber: '10' });
export const GameCycleContext = React.createContext({
  isGameStarted: false,
  isGameFinished: false,
});

function MainPage() {
  const { register } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { difficulty: 'easy', bombNumber: 10 },
  });

  return (
    <main>
      <Form method="post" action="game-board">
        <select {...register('difficulty')}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <input type="number" {...register('bombNumber', { required: true, max: 99, min: 10 })} />
        <button type="submit">Start</button>
      </Form>
    </main>
  );
}

export default MainPage;
