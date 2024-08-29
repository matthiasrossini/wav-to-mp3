import { HomeIcon, FileAudioIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Mp3ToWavConverter from "./pages/Mp3ToWavConverter.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "MP3 to WAV",
    to: "/mp3-to-wav",
    icon: <FileAudioIcon className="h-4 w-4" />,
    page: <Mp3ToWavConverter />,
  },
];
