import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import CircleIcon from '@mui/icons-material/Circle';

interface ListItemInterface {
    id: number
    date: Date
    severity?: number
}

export default function OverviewList(props: {
    items: Array<ListItemInterface>
    showSeverity?: boolean
    onClick: (id: number) => void
    onDelete: (id: number) => Promise<void>
    getData: () => Promise<void>
    severityColorMapping?: (severity: number) => string
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
                        showSeverity={props.showSeverity}
                        severity={i.severity}
                        severityColorMapping={props.severityColorMapping}
                    />
                ))}
            </List>
        </>
    )
}

function OverviewListItem(props: {
    date: Date
    secondary?: string
    severity?: number
    showSeverity: boolean
    onClick: () => void
    onDelete: (e: React.MouseEvent) => Promise<void>
    severityColorMapping?: (severity: number) => string
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
            {props.showSeverity && props.severity !== undefined &&
                <ListItemIcon><CircleIcon
                    sx={{ color: props.severityColorMapping(props.severity) }}
                /> </ListItemIcon>}
        </StyledListItem>
    )

}


const StyledListItem = styled(ListItem)`
:hover{
    cursor: pointer;
    background-color: rgba(255,255,255,0.1);
}
`