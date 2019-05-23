import React from "react"
import SettingsAccount from "../containers/settingsAccount"
import SettingsUser from "../containers/settingsUser"
import {isAdmin} from "./utilities"

const Settings = ({rolesUser}) => rolesUser ? 
	isAdmin(rolesUser) ? <SettingsAccount /> : <SettingsUser /> :
	<div>NO USER DATA YET</div>

export default Settings
