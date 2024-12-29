import { UserIcon } from "@heroicons/react/20/solid";
import React from "react";

const GroupAvatar = () => {
	return (
		<>

				<div
					className={`avatar placeholder`}
				>
					<div
						className={`rounded-full bg-gray-400 text-gray-800 `}
					>
						<span className="text-xl">
							<UserIcon className="w-4" />
						</span>
					</div>
				</div>
		</>
	);

};

export default GroupAvatar;
