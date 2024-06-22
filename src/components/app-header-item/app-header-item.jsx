import {
BurgerIcon, 
ListIcon, 
ProfileIcon 
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header-item.module.css';
import PropTypes from 'prop-types'

const AppHeaderItem = ({ iconMenu, textMenu, isActive }) => {
  let iconItem;
    if ('burger' == iconMenu) { 
      iconItem = <BurgerIcon type={isActive ? 'primary' : 'secondary'} />;
    }
    if ('list' == iconMenu) {
      iconItem = <ListIcon type={isActive ? 'primary' : 'secondary'} />;
    }
    if ('profile' == iconMenu) {
      iconItem = <ProfileIcon type={isActive ? 'primary' : 'secondary'} />;
    }

  return (
    <li className={styles.last_item}>
      <a href='/' className={`${styles.menu} ${isActive ? '' : styles.inactive}`}>
        {iconItem}{textMenu}
      </a>
    </li>
  );
};

AppHeaderItem.propTypes = {
  isActive: PropTypes.bool,
  iconMenu: PropTypes.string,
  textMenu: PropTypes.string
};

export default AppHeaderItem;
