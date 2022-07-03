/* eslint-disable react-hooks/exhaustive-deps */
import style from './style.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import NavbarTasks from '../../components/NavbarTasks';
import AuthCheckTask from '../../components/AuthCheckTask';
import TaskListForm from '../../components/TaskListForm';

import { getTask } from '../../store/actionCreatorsTask';

function TaskListPage() {

  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const task = useSelector(state => state.task.task);

  useEffect(() => {
    getTask(dispatch);
  }, []);

  const taskFilter = (userLogin) => {
    const tasks = task.filter(item => item.performer === userLogin);
    return tasks;
  };
  const tasks = taskFilter(user.login);

  return (
    <>
      <AuthCheckTask user={user}>

        <div className={style.taskListContainer}>

          {user.role === 'admin' ?
            <>
              <div className={style.navbarTasks}> <NavbarTasks /> </div>
              <div className={style.taskListBlock}> <TaskListForm task={task} /> </div>
            </>
            :
            user.role === 'manager' ?
              <div className={style.taskListBlock}> <TaskListForm task={tasks} /> </div>
            :
            null
          }
        </div>
      </AuthCheckTask>

    </>
  );
}

export default TaskListPage;
