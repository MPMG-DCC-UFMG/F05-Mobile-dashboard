import React from "react";

interface NotificationProps {
    message: string,
}

export const MPNotification: React.FC<NotificationProps> = (props) => {

	const {message} = props;
	return (
		<div className="notification is-danger is-light">
			{message}
		</div>
	);
};