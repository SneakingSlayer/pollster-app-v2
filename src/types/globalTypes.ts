export interface PollProps {
  title: string;
  description: string;
  firstname: string;
  lastname: string;
  totalVotes: number;
  _id: string;
  choices: any[];
  date: any;
  img: string;
  createdAt: string;
}

export interface OptionProps {
  choice: string;
  idx: string;
  votes: string;
}
