/* eslint-disable react-hooks/exhaustive-deps */
import style from "./style.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function CreateTaskForm({ user }) {
  const [managers, setManagers] = useState([]);
  const [styleFrom, setStyleForm] = useState(`${style.createWindow}`);
  const [styleMsg, setStyleMsg] = useState(
    `${style.successRegister} ${style.hidden}`
  );

  useEffect(async () => {
    const { data } = await axios.get("/profile/managerList");
    setManagers(data.managers);
  }, []);

  const performers = managers.map((item) => (
    <option value={item.login} key={item.uid}>
      {" "}
      {item.login}{" "}
    </option>
  ));

  const taskForm = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);
    formData.append("uid", user.id);
    const { data } = await axios.post("/task/createTask", formData);

    setStyleForm(`${style.createWindow} ${style.hidden}`);
    setStyleMsg(`${style.successRegister}`);
  };

  return (
    <>
      <div className={styleFrom}>
        <form onSubmit={taskForm}>
          <div className={`${style.title} ${style.formFiled}`}>
            <label>Название</label>
            <input name="title" type="text" placeholder="Название задачи" />
          </div>

          <div className={`${style.description} ${style.formFiled}`}>
            <label>Описание</label>
            <textarea name="description" placeholder="Описание задачи..." />
          </div>

          <div className={`${style.priority}`}>
            <div className={style.titlePriority}>Приоритет</div>
            <div className={style.choosePriority}>
              <label>
                {" "}
                <input
                  type="radio"
                  value="высокий"
                  name="priority"
                /> Низкий{" "}
              </label>
              <label>
                {" "}
                <input
                  type="radio"
                  value="средний"
                  name="priority"
                /> Средний{" "}
              </label>
              <label>
                {" "}
                <input
                  type="radio"
                  value="низкий"
                  name="priority"
                /> Высокий{" "}
              </label>
            </div>
          </div>

          <div className={`${style.performer}`}>
            <div className={style.titlePerformer}>Ответственный</div>
            <select name="performer">
              <option />
              {performers}
            </select>
          </div>

          <div className={`${style.dateDoneTo}`}>
            <div className={style.titleDateDoneTo}>Дата выполнения ДО</div>
            <input name="dateDoneTo" type="date" />
          </div>

          <div className={`${style.files}`}>
            <div className={style.titleFiles}>Загрузите файлы (до 10)</div>
            <input type="file" name="uploadsArray" multiple />
          </div>

          <div className={style.formBtns}>
            <button type="submit">СОЗДАТЬ ЗАДАЧУ</button>
          </div>
        </form>
      </div>

      <div className={styleMsg}> Задача успешно создана. </div>
    </>
  );
}

export default CreateTaskForm;
