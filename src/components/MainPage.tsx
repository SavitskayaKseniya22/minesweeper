/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';

function MainPage() {
  const { register, handleSubmit } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { difficulty: 'easy', bombNumber: 10 },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate('game-board', { state: { difficulty: data.difficulty, bombNumber: data.bombNumber } });
  };

  return (
    <main>
      <Form method="post" action="/" onSubmit={handleSubmit(onSubmit)}>
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
