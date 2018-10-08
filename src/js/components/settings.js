import React from "react"
import SettingsAccount from "../containers/settingsAccount"
import SettingsUser from "../containers/settingsUser"
import {isAdmin} from "./utilities"

const Settings = ({user}) => user.roles ? 
	isAdmin(user.roles) ? <SettingsAccount /> : <SettingsUser /> :
	<div>NO USER DATA YET</div>

export default Settings
