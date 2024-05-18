import { IconButton, Input } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export default function NoteSearch(props: {
    searchValue: string
    onClear: () => void
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {

    const isClearable = props.searchValue != ""

    return (
        <Input
            sx={{ marginTop: '1rem', width: '100%' }}
            startAdornment={<SearchIcon />}
            endAdornment={
                isClearable &&
                <IconButton sx={{ height: '2rem' }}
                    onClick={props.onClear}
                >
                    <ClearIcon fontSize="small" />
                </IconButton>
            }
            type='search'
            value={props.searchValue}
            onChange={props.onChange}
        />
    )
}