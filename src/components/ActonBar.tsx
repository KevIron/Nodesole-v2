import StartIcon from "../assets/icons/start_icon.svg?react"; 
import StopIcon from "../assets/icons/stop_icon.svg?react"; 
import RestartIcon from "../assets/icons/replay_icon.svg?react"; 

import ActionButton from "./ActionButton";

export default function ActionBar() {
  return (
    <nav id="action-bar">
      <ActionButton Icon={StartIcon} />
      <ActionButton Icon={StopIcon} />
      <ActionButton Icon={RestartIcon} />
    </nav>
  );
}