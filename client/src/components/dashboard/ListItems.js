import React from "react";
import { useHistory } from "react-router-dom";

import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import LayersIcon from "@material-ui/icons/Layers";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

export const mainListItems = (
  <div>
    {/* <ListItem button>
      <ListItemIcon onClick={() => useHistory().push("/profile")}>
        <AccountCircleIcon />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem>
    <ListItem button onClick={() => useHistory().push("/volunteers")}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Volunteers overview" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountTreeIcon />
      </ListItemIcon>
      <ListItemText primary="Projects overview" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Management" />
    </ListItem> */}
  </div>
);
