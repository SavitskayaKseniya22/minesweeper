/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Form, useNavigate } from 'react-router-dom';

function MainPage() {
  const [difficulty, setDifficulty] = useState('easy');
  const { register, watch, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = () =>
    navigate('game-board', { state: { difficulty } });

  useEffect(() => {
    watch((value) => setDifficulty(value.difficulty));
  }, [watch]);

  return (
    <main>
      <Form method="post" action="/" onSubmit={handleSubmit(onSubmit)}>
        <select defaultValue={difficulty} {...register('difficulty')}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <button type="submit">Start</button>
      </Form>
    </main>
  );
}

export default MainPage;
