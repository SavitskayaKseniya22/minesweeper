/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import './App.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Field from './components/Field';

function App() {
  const [difficulty, setdifficulty] = useState('easy');
  const { register, handleSubmit } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (data) => setdifficulty(data.difficulty);

  return (
    <div className="App">
      <form onChange={handleSubmit(onSubmit)}>
        <select defaultValue={difficulty} {...register('difficulty')}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </form>
      <Field difficulty={difficulty} />
    </div>
  );
}

export default App;
