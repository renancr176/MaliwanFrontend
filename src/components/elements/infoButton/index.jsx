import React from 'react';
import {Tooltip} from 'react-tippy';
import {FaQuestionCircle} from 'react-icons/fa';

import styles from './index.module.css';

export default function InfoButton({children, className, title, position="bottom", trigger="mouseenter" }) {
	return (
		<div className={className}>
			<Tooltip
				title={title}
				position={position}
				trigger={trigger}
				html={(<div className={`${styles.body}`}>{children}</div>)}>
				<FaQuestionCircle className={`text-muted ${styles.pointer}`}/>
			</Tooltip>
		</div>
	)
}