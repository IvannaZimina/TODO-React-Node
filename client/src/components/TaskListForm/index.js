/* eslint-disable react-hooks/exhaustive-deps */
import style from "./style.module.scss";
import check from "./check.jpg";
import { Link } from "react-router-dom";

function TaskListForm({ task }) {
  const taskCard = task.map((item) => (
    <div className={style.taskList} key={item.id}>
      <input type="checkbox" value={item.id} name="task" />

      <h5 className={style.titleTask}>
        <Link to={`/taskItem/${item.id}`}>{item.title} </Link>
      </h5>

      <div className={style.performerTask}>{item.performer}</div>
      <div className={style.priorityTask}>{item.priority}</div>

      <div className={style.statusDoneTask}>
        {item.statusDone === false ? "Не выполнено" : "Выполнено"}
      </div>

      <div className={style.dateDoneToTask}>
        {new Date(item.dateDoneTo).toLocaleDateString()}
      </div>

      <div className={style.updatedAtTask}>
        {new Date(item.updatedAt).toLocaleDateString()}
      </div>
    </div>
  ));

  const tasksForm = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
  };

  return (
    <>
      <div className={style.taskList}>
        <div>
          <img src={check} alt="check" className={style.checkPoint} />
        </div>
        <h6 className={style.titleTask}>Название задачи</h6>
        <h6 className={style.performerTask}>Исполнитель</h6>
        <h6 className={style.priorityTask}>Приоритетность</h6>
        <h6 className={style.statusDoneTask}>Статус</h6>
        <h6 className={style.dateDoneToTask}>Дата выполнения</h6>
        <h6 className={style.updatedAtTask}>Обновлено</h6>
      </div>
      <hr className={style.line} />
      <form onSubmit={tasksForm}>{taskCard}</form>
    </>
  );
}

export default TaskListForm;
