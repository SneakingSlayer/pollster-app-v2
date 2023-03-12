export interface PollProps {
  title: string;
  description: string;
  firstname: string;
  lastname: string;
  totalVotes: number;
  _id: string;
  choices: ChoiceProps[];
  date: any;
  img: string;
  createdAt: string;
}

export interface OptionProps {
  choice: string;
  idx: string;
  votes: string;
}

export interface UserProps {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  username: string;
  password: string;
  organization: string;
  role: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ChoiceProps {
  choice: string;
  votes: number;
}

export interface Navigation {
  navigate: (value: string) => void;
  goBack: () => void;
}

export interface VoteProps {
  user_id: string;
  poll_id: string;
  choice: string;
  choice_description: string;
  title: string;
  poster_name: string;
}
