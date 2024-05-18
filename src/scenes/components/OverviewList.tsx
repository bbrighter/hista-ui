import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { CircularProgress, IconButton, List, ListItem, ListItemText } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';


interface ListItemInterface {
    id: number
    date: Date
}

export default function OverviewList(props: {
    items: Array<ListItemInterface>
    onClick: (id: number) => void
    onDelete: (id: number) => Promise<void>
    getData: () => Promise<void>
}) {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        props.getData().finally(
            () => setLoading(false)
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {loading && <CircularProgress sx={{ position: 'absolute', left: '50%', top: '50%' }} />}
            <List>
                {props.items.map(i => (
                    <OverviewListItem
                        key={i.id}
                        date={i.date}
                        onClick={() => props.onClick(i.id)}
                        onDelete={() => props.onDelete(i.id)}
                    />
                ))}
            </List>
        </>
    )
}

function OverviewListItem(props: {
    date: Date
    onClick: () => void
    onDelete: (e: React.MouseEvent) => Promise<void>
}) {
    const onDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        await props.onDelete(e)
    }

    return (
        <StyledListItem
            onClick={props.onClick}
            secondaryAction={
                <IconButton onClick={onDelete}>
                    <DeleteIcon />
                </IconButton>
            }
        >
            <ListItemText>
                {props.date.toLocaleString([], { dateStyle: "long", timeStyle: 'short' })}
            </ListItemText>
        </StyledListItem>
    )

}


const StyledListItem = styled(ListItem)`
:hover{
    cursor: pointer;
    background-color: rgba(255,255,255,0.1);
}
`