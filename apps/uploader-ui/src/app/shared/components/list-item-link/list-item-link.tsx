import './list-item-link.module.scss';

import {
  ListItem,
  ListItemIcon,
  ListItemProps,
  ListItemText,
} from '@material-ui/core';
import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';

/* eslint-disable-next-line */
export interface ListItemLinkProps extends ListItemProps {
  to: string;
  text: string;
  icon?: ReactElement;
}

export function ListItemLink(props: ListItemLinkProps) {
  const { to, text, icon } = props;
  return (
    <ListItem component={NavLink} to={to} exact={true}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}

      <ListItemText>{text}</ListItemText>
    </ListItem>
  );
}

export default ListItemLink;
