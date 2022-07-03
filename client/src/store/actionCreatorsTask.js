import * as actTypes from "./actiontypes";
import axios from "axios";

const actionOne = () => {
  const action = { type: actTypes.LOADING, payload: "isLoading" };
  return action;
};

const actionTwo = async () => {
  const { data } = await axios.get("http://localhost:5000/task/getTaskList");

  if (!data) {
    const action = { type: actTypes.LOAD_FAILED, payload: "loadFail" };
    return action;
  }

  const action = { type: actTypes.TASK, payload: data.taskList };
  return action;
};

export const getTask = async (dispatch, payload) => {
  dispatch(actionOne());
  dispatch(await actionTwo(payload));
};
