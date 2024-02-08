import PropTypes from 'prop-types';
// import { useSelector } from 'react-redux';

// material-ui
import { List, Typography, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';

// project import
import NavItem from './NavItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';

const textColor = 'text.primary';
const iconSelectedColor = 'white';

// ==============================|| NAVIGATION - LIST GROUP ||============================== //

const NavGroup = ({ item }) => {
  const theme = useTheme();
  const { drawerOpen } = useSelector((state) => state.menu);
  const [open, setOpen] = useState(false);

  const Icon = item.icon;
  const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

  const handleClick = () => {
    setOpen(!open);
  };

  const navCollapse = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'collapse':
        return (
          <Typography key={menuItem.id} variant="caption" color="error" sx={{ p: 2.5 }}>
            collapse - only available in paid version
          </Typography>
        );
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List
      sx={{
        py: 0,
        zIndex: 0
      }}
    >
      <ListItemButton
        className="parent"
        onClick={handleClick}
        sx={{
          zIndex: 1201,
          justifyContent: 'space-between',
          ...(drawerOpen &&
            open && {
              ...{
                bgcolor: 'primary.main',
                color: iconSelectedColor,
                '&:hover': {
                  color: iconSelectedColor,
                  bgcolor: 'primary.main'
                }
              }
            })
        }}
      >
        {itemIcon && (
          <ListItemIcon
            sx={{
              minWidth: 28,
              color: open ? iconSelectedColor : textColor,
              ...(!drawerOpen && {
                borderRadius: 1.5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                '&:hover': {
                  bgcolor: 'secondary.lighter'
                }
              }),
              ...(!drawerOpen &&
                open && {
                  bgcolor: 'primary.lighter',
                  '&:hover': {
                    bgcolor: 'primary.lighter'
                  }
                })
            }}
          >
            {itemIcon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ color: open ? iconSelectedColor : textColor }}>
              {item.title}
            </Typography>
          }
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {navCollapse}
        </List>
      </Collapse>
    </List>
  );
};

NavGroup.propTypes = {
  item: PropTypes.object
};

export default NavGroup;
