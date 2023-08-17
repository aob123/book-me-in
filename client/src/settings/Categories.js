//Edit this list to edit categories
import {
  GiEightBall as pool,
  Gi3DGlasses as vr,
  GiOldMicrophone as studio,
} from "react-icons/gi";
import { RiComputerLine as computer, RiXboxFill as xbox } from "react-icons/ri";
import { BsNintendoSwitch as nintendo} from "react-icons/bs"
export const categories = [
  {
    id: 0,
    name: "Café",
    duration: 60,
    color: "#0e7a0d",
    icon: xbox,
  },
  {
    id: 1,
    name: "Activity Room",
    duration: 60,
    color: "#0e7a0d",
    icon: xbox,
  },
  {
    id: 2,
    name: "Pool (blue)",
    duration: 30,
    color: "#2B4F81",
    icon: pool,
  },
  {
    id: 3,
    name: "Pool (green)",
    duration: 30,
    color: "#116113",
    icon: pool,
  },
  {
    id: 4,
    name: "VR",
    duration: 30,
    color: "#800080",
    icon: vr,
  },
  {
    id: 5,
    name: "Computer 1",
    duration: 60,
    color: "#595959",
    icon: computer,
  },
  {
    id: 6,
    name: "Computer 2",
    duration: 60,
    color: "#595959",
    icon: computer,
  },
  {
    id: 7,
    name: "Computer 3",
    duration: 60,
    color: "#595959",
    icon: computer,
  },
  {
    id: 8,
    name: "Computer 4",
    duration: 60,
    color: "#595959",
    icon: computer,
  },
  {
    id: 9,
    name: "Studio",
    duration: 60,
    color: "#00264d",
    icon: studio,
  },
  {
    id: 10,
    name: "Switch",
    duration: 60,
    color: "#f54242",
    icon: nintendo,
  },
  {
    id: 11,
    name: "Bio",
    duration: 120,
    color: "#f54242",
    icon: computer,
  },
];
