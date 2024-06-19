import { Grid, Paper, SxProps, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { useState } from "react"

export type KPIGridValues = Array<{
    label: string
    subline?: string
    count: number
    entries: number[]
}>

export default function KPIGrid(props: {
    values: KPIGridValues,
    headers: string[],
}) {
    const [isRelative, setIsRelative] = useState(true)

    const maxValue = props.values.reduce((prev, curr) => Math.max(prev, Math.max(...curr.entries)), 0)

    let values = props.values
    if (isRelative) {
        values = values.map(v => ({
            count: v.count,
            label: v.label,
            subline: v.subline,
            entries: v.entries.map(e => Math.round(e / v.count * 100))
        }))
    }

    values.sort((a, b) => {
        const len = a.entries.length
        let cmp = 0
        for (let i = 0; i < len; i++) {
            const diff = b.entries[len - 1 - i] - a.entries[len - 1 - i]
            if (diff > 0) { cmp = diff }
            else { continue }
        }
        return cmp
    })

    console.log(values)

    return (
        <Grid container>
            <GridSettings
                onToggleChange={() => setIsRelative(!isRelative)}
                showRelative={isRelative}
            />
            <Grid container spacing={1}>
                <KPIHeaderRow headers={["", ...props.headers]} />
                {values.map(v => {
                    return (<KPIRow
                        entries={v.entries}
                        label={v.label}
                        maxValue={maxValue}
                        showPercent={isRelative}
                        key={v.label + v.subline}
                        subline={v.subline}
                    />
                    )
                })}
            </Grid>
        </Grid>

    )
}

function KPIHeaderRow(props: {
    headers: string[]
}) {
    return (
        <>
            {props.headers.map(h => (
                <KPIHeaderCell key={h} label={h} />
            ))}
        </>
    )
}

function KPIRow(props: {
    label: string
    subline?: string
    maxValue: number
    entries: number[]
    showPercent: boolean
}) {
    return (
        <>
            <KPIHeaderCell
                label={props.label}
                subline={props.subline}
            />
            {
                props.entries.map((entry, i) => (
                    <KPIValueCell
                        key={i}
                        value={entry}
                        max={props.maxValue}
                        relative={props.showPercent} />
                ))
            }
        </>
    )
}

const CellStyle: SxProps = {
    textAlign: 'center',
    minHeight: '55px',
    alignContent: 'center'
}

function KPIHeaderCell(props: {
    label: string
    subline?: string
    xs?: number
}) {
    const xs = props.xs ? props.xs : 3

    return (
        <Grid item xs={xs}>
            <Paper
                elevation={10}
                sx={CellStyle}
            >
                <Typography noWrap>{props.label}</Typography>
                <Typography variant="caption">{props.subline}</Typography>
            </Paper >
        </Grid >
    )
}

function KPIValueCell(props: {
    value: number
    relative: boolean
    max: number
    xs?: number
}) {
    let backgroundColor: string | undefined = undefined
    let textcolor: string | undefined = undefined
    if (props.value != undefined) {
        const currentValue = props.value
        const maxValue = props.max
        const step = maxValue / 5

        if (currentValue == 0) {
            backgroundColor = undefined
        } else if (currentValue < step) {
            backgroundColor = '#007f4e'
            textcolor = 'black'
        } else if (currentValue < step * 2) {
            backgroundColor = '#72b043'
            textcolor = 'black'
        } else if (currentValue < step * 3) {
            backgroundColor = '#f8cc1b'
            textcolor = 'black'
        } else if (currentValue < step * 4) {
            backgroundColor = '#f37324'
            textcolor = 'black'
        } else {
            backgroundColor = '#e12729'
            textcolor = 'black'
        }
    }

    const xs = props.xs ? props.xs : 3
    return (
        <Grid item xs={xs}>
            <Paper
                elevation={1}
                sx={{ ...CellStyle, backgroundColor: backgroundColor }}
            >
                <Typography color={textcolor}>
                    {props.value}{props.relative ? '%' : ''}
                </Typography>
            </Paper >
        </Grid >
    )
}


function GridSettings(props: {
    showRelative: boolean
    onToggleChange: (event: React.MouseEvent, value: boolean) => void
}) {

    return (
        <ToggleButtonGroup
            sx={{ mt: 2, mb: 2 }}
            value={props.showRelative}
            onChange={props.onToggleChange}
            exclusive
        >
            <ToggleButton value={true}>Relativ</ToggleButton>
            <ToggleButton value={false}>Absolut</ToggleButton>
        </ToggleButtonGroup>
    )
}