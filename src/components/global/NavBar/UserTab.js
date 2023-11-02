import React from "react";
import { withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import {  Icon } from "semantic-ui-react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";



import { options } from "./user-dropdown-menu-list";
import UserAvatar from "../../elements/UserAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { BiChevronDown } from "react-icons/bi";


const UserTab = props => {
  const history = useHistory();

  // const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
 
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };
  const optionClicked = option => {
    console.log('option::', option);
    setAnchorEl(null);
    history.push(`/${option.link}`);
  };

  return (
    <>

      <div id="user-header-tab">
        <h6 style={{ display: "flex" }}>
          <UserAvatar size={21} className={'user-icon'} />
          <span className="user-name">
            {props.data.user._source.first_name}    {props.data.user._source.last_name}
          </span>
          <IconButton
            aria-label="more"
            aria-haspopup="true"
            aria-controls="fade-menu"
            onClick={handleClick}
            className='btn-more'
            edge="start"
            color="inherit"
          >
            <BiChevronDown />
          </IconButton>
        </h6>


      </div>
      <Menu
        id="user-drop-long-menu"
        anchorEl={anchorEl}
        // keepMounted
        variant='menu'
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 150
          }
        }}
      >
        {options[props.data.user._source.user_role].map(option => (
          <MenuItem
            key={option.id}
            onClick={() => optionClicked(option)}
            className='dropdown-menu'
          >
            <ListItemIcon className='list-items'>
              <Icon name={option.icon} />
            </ListItemIcon>

            {option.title}
          </MenuItem>
        ))}
      </Menu>



      {/* <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown> */}
    </>
  );
};

export default withRouter(UserTab);
