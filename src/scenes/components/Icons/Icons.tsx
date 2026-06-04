import AddIcon from "@mui/icons-material/Add";
import ArchiveIcon from "@mui/icons-material/Archive";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import CircleIcon from "@mui/icons-material/Circle";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import Download from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ForestIcon from "@mui/icons-material/Forest";
import MedicationIcon from "@mui/icons-material/Medication";
import NoteIcon from "@mui/icons-material/Note";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SaveIcon from "@mui/icons-material/Save";
import ScienceIcon from "@mui/icons-material/Science";
import SearchIcon from "@mui/icons-material/Search";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SickIcon from "@mui/icons-material/Sick";
import SortIcon from "@mui/icons-material/Sort";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import TodayIcon from "@mui/icons-material/Today";
import UnarchiveIcon from "@mui/icons-material/Unarchive";

export const Icons = {
	meal: RestaurantIcon,
	symptom: SickIcon,
	statistics: QueryStatsIcon,
	notes: NoteIcon,
	pollens: ForestIcon,
	status: SelfImprovementIcon,
	headaches: FaceRetouchingNaturalIcon,
	medicines: MedicationIcon,
	today: TodayIcon,
	circle: CircleIcon,
	manage: SortIcon,
	nutrition: ScienceIcon,
	template: DinnerDiningIcon,
	diary: AutoStoriesIcon,
	actions: {
		archive: ArchiveIcon,
		unarchive: UnarchiveIcon,
		edit: EditIcon,
		close: CloseIcon,
		save: SaveIcon,
		delete: DeleteIcon,
		create: AddIcon,
		reorder: SwapVertIcon,
		expand: ExpandMoreIcon,
		download: Download,
		clear: ClearIcon,
		search: SearchIcon,
	},
};
