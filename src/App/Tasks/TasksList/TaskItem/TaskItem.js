import React from 'react';

import { makeWordFromId } from 'utils/utils';
import './TaskItem.less';

import Badge from 'components/Badge';

const TaskItem = (props) => {
  const {
    className = '',
    id = 0,
    active=false,
    name = '',
    status = 'todo',
    onClick
  } = props;

	const statusName = status
		.split(' ')
		.map((w) => makeWordFromId(w))
		.join(' ');

  return(
    <li
      className={`
        TaskItem list-group-item list-group-item-action ${className}
        ${active ? 'active' : ''}
        `}
      onClick={() => onClick(id)}
    >
      <Badge
        className="TaskItem-status"
        type={status}
        value={statusName}
      />
      <span className="TaskItem-name">
        {name}
      </span>
    </li>
  );
}

export default TaskItem;
