import { registerIconAlias, registerIcons as _registerIcons } from "@fluentui/react/lib/Styling";
import React from "react";

import { CancelIcon } from "./CancelIcon";
import { CheckmarkCircleIcon } from "./CheckmarkCircleIcon";
import { CheckmarkIcon } from "./CheckmarkIcon";
import { ChevronDownIcon } from "./ChevronDownIcon";
import { ContractTwoArrowsIcon } from "./ContractTwoArrowsIcon";
import { CopyIcon } from "./CopyIcon";
import { DownloadIcon } from "./DownloadIcon";
import { HelpCircleIcon } from "./HelpCircleIcon";
import { HomeIcon } from "./HomeIcon";
import { PauseIcon } from "./PauseIcon";
import { PlayIcon } from "./PlayIcon";
import { ResizeIcon } from "./ResizeIcon";
import { ReturnUpBackIcon } from "./ReturnUpBackIcon";
import { ReturnUpForwardIcon } from "./ReturnUpForwardIcon";
import { SearchIcon } from "./SearchIcon";
import { SettingsIcon } from "./SettingsIcon";
import { ShareSocialIcon } from "./ShareSocialIcon";
import { TimeIcon } from "./TimeIcon";
import { VideoCameraIcon } from "./VideoCameraIcon";
import { VolumeHighIcon } from "./VolumeHighIcon";
import { VolumeLowIcon } from "./VolumeLowIcon";
import { VolumeMediumIcon } from "./VolumeMediumIcon";
import { VolumeMuteIcon } from "./VolumeMuteIcon";

export const registerIcons = () => {
	_registerIcons({
		icons: {
			Cancel: <CancelIcon />,
			CheckMark: <CheckmarkIcon />,
			ChevronDown: <ChevronDownIcon />,
			Completed: <CheckmarkCircleIcon />,
			ContractTwoArrows: <ContractTwoArrowsIcon />,
			Copy: <CopyIcon />,
			Download: <DownloadIcon />,
			HelpCircle: <HelpCircleIcon />,
			Home: <HomeIcon />,
			Pause: <PauseIcon />,
			Play: <PlayIcon />,
			Resize: <ResizeIcon />,
			ReturnUpBack: <ReturnUpBackIcon />,
			ReturnUpForward: <ReturnUpForwardIcon />,
			Search: <SearchIcon />,
			Settings: <SettingsIcon />,
			ShareSocial: <ShareSocialIcon />,
			Time: <TimeIcon />,
			VideoCamera: <VideoCameraIcon />,
			VolumeHigh: <VolumeHighIcon />,
			VolumeLow: <VolumeLowIcon />,
			VolumeMedium: <VolumeMediumIcon />,
			VolumeMute: <VolumeMuteIcon />,
		},
	});
};

registerIconAlias("Clear", "Cancel");
