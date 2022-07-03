/* eslint-disable react-hooks/exhaustive-deps */
import style from './style.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthCheckTask from '../../components/AuthCheckTask';
import CreateTaskForm from '../../components/CreateTaskForm';

function CreateTaskPage() {

  const user = useSelector(state => state.user.user);

  return (
    <>
      <AuthCheckTask user={user}>
        <div className={style.createContainer}>
          <div className={style.createContent}>

            <div className={style.backLink}> <Link to="/taskList"> &lt;&lt; </Link> </div>
            
            <CreateTaskForm user={user}/>

          </div>
        </div>
      </AuthCheckTask>

    </>
  );
}

export default CreateTaskPage;
