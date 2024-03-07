import React, { useContext, useState, useEffect } from 'react';
import { Menu, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../darkMode.css';

import { AuthContext } from '../context/auth';

function MenuBar(){
  const { user, logout } = useContext(AuthContext);
  
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);

  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  //Me trying to put a fucking button in here

  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const menuBar = user ? (
    <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name={user.username}
            active
            as={Link}
            to= "/"
          />          
          <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            onClick={logout}         
          />
          </Menu.Menu>
        </Menu>

  ) : (
    <Menu pointing secondary size="massive" color="teal">
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
          to= "/"
          />
          
          <Menu.Menu position='right'>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to = "/login"
          
          />
            <Menu.Item
              name='register'
              active={activeItem === 'register'}
              onClick={handleItemClick}
              as= {Link}
              to= "/register"
            />
            <Menu.Item>
            <div className={`App ${theme}`}>
              <Button color='teal' onClick={toggleTheme}>
              <Icon name='moon' />
              </Button>
            </div>      
            </Menu.Item>
          </Menu.Menu>
        </Menu>
  )
    return menuBar;
}

export default MenuBar;