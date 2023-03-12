import React from 'react';
import { ChoiceProps } from '../types/globalTypes';
export const totalVotes = (choices: ChoiceProps[]): number => {
  const total = choices
    ?.map((choice) => parseInt(choice.votes as string))
    .reduce((prev, curr) => prev + curr, 0);
  return total;
};
