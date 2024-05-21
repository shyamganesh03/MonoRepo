import React from "react";
import { Icon } from "@mono-repo/native-icons";

const allIconsData = [
  "Alarm",
  "AppleIcon",
  "BlockUserIcon",
  "BookmarkNoIcon",
  "BookmarkYesIcon",
  "CalanderIcon",
  "CameraIcon",
  "CareerMapIcon",
  "ChangeRole",
  "CheckIcon",
  "ChevronDownIcon",
  "ChevronLeftIcon",
  "ChevronRightIcon",
  "ChevronUpIcon",
  "ClipIcon",
  "CloseIcon",
  "CopyIcon",
  "DeleteIcon",
  "DownIcon",
  "DownVoteIcon",
  "DownloadIcon",
  "EditIcon",
  "EdvanzaLogo",
  "EmailIcon",
  "ExclamationErrorIcon",
  "ExitIcon",
  "ExternalLinkIcon",
  "FacebookIcon",
  "FilterIcon",
  "Flag",
  "GalleryIcon",
  "GoogleIcon",
  "HidePasswordIcon",
  "HomeIcon",
  "ImageIcon",
  "JobsIcon",
  "KeyboardIcon",
  "LearnIcon",
  "LeftIcon",
  "LikeNoIcon",
  "LikeYesIcon",
  "LockIcon",
  "MenuIcon",
  "MessageIcon",
  "MoreIcon",
  "NotificationNoIcon",
  "NotificationYesIcon",
  "PlusIcon",
  "ProfileIcon",
  "RefreshIcon",
  "RemoveConnectionIcon",
  "ReplyIcon",
  "RightIcon",
  "SearchIcon",
  "SelectorTickIcon",
  "SendIcon",
  "ShareIcon",
  "ShowPasswordIcon",
  "SocialIcon",
  "TickIcon",

  "UnlockIcon",
  "UpIcon",
  "UpVoteIcon",
  "XpIcon",
];

function IconTable() {
  return allIconsData.map((icon) => (
    <Icon
      name={icon}
      width={40}
      height={40}
      color='#fff'
      style={{ padding: 40 }}
    />
  ));
}

export default IconTable;
