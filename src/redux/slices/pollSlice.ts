import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  polls: [] as any[],
};

const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    loadPolls(state, action) {
      if (action?.payload?.length > 0) {
        state.polls = state.polls.concat(action.payload);
      }
    },
    updatePoll(state, action) {
      state.polls = state.polls?.map((poll, idx) => {
        if (poll._id === action.payload._id) return action.payload;
        return poll;
      });
    },
    addPoll(state, action) {
      state.polls.unshift(action.payload);
    },
    deletePoll(state, action) {
      state.polls = state.polls.filter((poll) => poll._id !== action.payload);
    },
    clearPoll(state) {
      state.polls = [];
    },
  },
});

export const { loadPolls, updatePoll, addPoll, clearPoll, deletePoll } =
  pollSlice.actions;

export default pollSlice.reducer;
