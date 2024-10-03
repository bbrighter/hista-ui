import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CircularProgress, IconButton, List, ListItem, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


interface ListItemInterface {
    id: number
    date: Date
    secondary?: string
}

export default function OverviewList(props: {
    items: Array<ListItemInterface>
    secondary?: string
    onClick: (id: number) => void
    onDelete: (id: number) => Promise<void>
    getData: () => Promise<void>
}) {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        props.getData().finally(
            () => setLoading(false),
        )
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
                        secondary={i.secondary}
                    />
                ))}
            </List>
        </>
    )
}

function OverviewListItem(props: {
    date: Date
    secondary?: string
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
            <ListItemText
                primary={props.date.toLocaleString([], { dateStyle: 'long', timeStyle: 'short' })}
                secondary={props.secondary}
            />
        </StyledListItem>
    )

}


const StyledListItem = styled(ListItem)`
:hover{
    cursor: pointer;
    background-color: rgba(255,255,255,0.1);
}
`