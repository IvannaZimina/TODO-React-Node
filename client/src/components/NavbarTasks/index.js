import style from './style.module.scss';
import createIcon from './create.png';
import deleteIcon from './delete.png';
import editIcon from './edit.jpg'
import { useNavigate } from 'react-router-dom';

function NavbarTasks() {

  let navigate = useNavigate();

  const createTask = () => {
    navigate('/createTask');
  };

  // const editTask = (id) => {
    
  // };

  const deleteTask = (data) => {
    
  };

  return (
    <>
      <div className={style.iconsContainer}>
        
        <div className={style.navIcon} onClick={createTask}>
          <img src={createIcon} alt="create" title="create" />
        </div>

        {/* <div className={style.navIcon} onClick={editTask}>
          <img src={editIcon} alt="edit" title="edit" />
        </div> */}

        <div className={style.navIcon} onClick={deleteTask}>
          <img src={deleteIcon} alt="delete" title="delete" />
        </div>

      </div>
    </>
  );
};

export default NavbarTasks;