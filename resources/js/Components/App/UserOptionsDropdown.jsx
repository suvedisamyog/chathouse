import {  Menu, MenuButton, MenuItem, MenuItems , Transition} from '@headlessui/react'
import { EllipsisVerticalIcon, LockClosedIcon, LockOpenIcon, ShieldCheckIcon, UserIcon } from '@heroicons/react/20/solid'
import axios from 'axios';
import { Fragment } from 'react'


const UserOptionsDropdown = () => {
	const changeUserRole = () => {
		if( conversation.is_user){
			return ;
		}
		axios
			.post(route('user.changeRole', conversation.id))
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const onBlockUser = () => {
		if( conversation.is_user){
			return ;
		}
		axios
			.post(route('user.blockUnblock', conversation.id))
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	};
  return (
	<div>
		<Menu as="div" className="relative inline-block text-left">
			<div>
				<MenuButton className="inline-flex justify-center item-center w-8 h-8 rounded-full hover:bg-black/40">
					<EllipsisVerticalIcon className="w-5 h-5" />
				</MenuButton>
			</div>
			<Transition 
				as={Fragment} 
				enter="transition ease-out duration-100" 
				enterFrom="transform opacity-0 scale-95" 
				enterTo="transform opacity-100 scale-100"
			 	leave="transition ease-in duration-75" 
			 	leaveFrom="transform opacity-100 scale-100" 
			 	leaveTo="transform opacity-0 scale-95">
				<MenuItems className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div>
						<MenuItem>
							{({ active }) => (
								<button
									onClick={onBlockUser}
									className={`${
										active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
									} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
								>
									{ conversation.blocked_at && (
										<>
											<LockOpenIcon className="w-5 h-5 mr-2 text-gray-500" />
											Unblock User
										</>
									)}
									{ !conversation.blocked_at && (
										<>
											<LockClosedIcon className="w-5 h-5 mr-2 text-gray-500" />
											Block User
										</>
									)}
								</button>
							)}
						</MenuItem>
					</div>
					<div className="py-1 px-1">
						<MenuItem >
							{({ active }) => (
								<button
									onClick={changeUserRole}
									className={`${
										active ? 'bg-black/30 text-white-900' : 'text-gray-100'
									} group flex rounded-md items-center w-full px-2 py-2 text-sm`}
									>
										{ conversation.is_admin && (
											<>
											<UserIcon className="w-4 h-4 mr-2" />
												Make Regular User
											</>
										)}

										{ !conversation.is_admin && (
											<>
												<ShieldCheckIcon className="w-4 h-4 mr-2" />
												Make Admin
											</>
										)}

								</button>
							)}
						</MenuItem>
					</div>
				</MenuItems>
			</Transition>
		</Menu>
	</div>
  )
}

export default UserOptionsDropdown