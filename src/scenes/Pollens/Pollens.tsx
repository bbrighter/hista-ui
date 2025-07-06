/// <reference types="vite-plugin-svgr/client" />
import styled from '@emotion/styled'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Paper from '@mui/material/Paper'
import Skeleton from '@mui/material/Skeleton'
import { Theme } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect, useState } from 'react'

import { Pollens } from '../../store/pollen/pollen'
import useHista from '../../store/store'
import AmbrosiaIcon from './ambrosia.svg?react'
import BeifussIcon from './beifuss.svg?react'
import BirkeIcon from './birke.svg?react'
import ErleIcon from './erle.svg?react'
import EscheIcon from './esche.svg?react'
import GraeserIcon from './graeser.svg?react'
import HaselIcon from './hasel.svg?react'
import RoggenIcon from './roggen.svg?react'


export default function Pollensview() {
    const getPollens = useHista(state => state.getPollens)
    const pollens = useHista(state => state.pollens)
    const pollensAreLoaded = useHista(state => state.pollensAreLoaded)

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!pollensAreLoaded) {
            setIsLoading(true)
            getPollens().
                finally(() => setIsLoading(false))
        }
    }, [getPollens, pollensAreLoaded])

    return (
        <Container sx={{ padding: 2 }}>
            <PollenHeader />
            <PollenGrid pollens={pollens} isLoading={isLoading} />
        </Container >
    )
}

const StyledDate = styled(Paper)`
    width: max(20%, 100px);
`

function PollenGrid(props: {
    pollens: Pollens,
    isLoading: boolean
}) {
    type StyledPollenProps = {
        intensity: number
    }

    const StyledPollen = styled.span<StyledPollenProps>`
        background-color: ${props => intensityToColor(props.intensity)};
        border-radius: 5px;
        width: max(10%, 20px);      
        height: 1.5rem;
        margin-left: 2px;
    `

    const intensityToColor = (intensitiy: number): string => {
        switch (intensitiy) {
            case 1:
                return 'darkgreen'
            case 2:
                return 'green'
            case 3:
                return 'greenyellow'
            case 4:
                return 'yellow'
            case 5:
                return 'orange'
            case 6:
                return 'red'
            case 7:
                return 'purple'
            default:
                return '#121212'
        }
    }

    return (
        <List>
            {props.isLoading &&
                [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(p => (
                    <Skeleton
                        key={p}
                        variant="rectangular"
                        width={'calc(max(20%, 100px) + 8 * max(10%, 20px))'}
                        height={'1.5rem'}
                        sx={{ marginTop: 2 }}
                    />))
            }
            {!props.isLoading && props.pollens.map((pollen, i) =>
                <Typography key={i}>
                    <ListItem >
                        <StyledDate>{pollen.date.toLocaleDateString('de-DE')}</StyledDate>
                        <StyledPollen intensity={pollen.ambrosia.intensity} />
                        <StyledPollen intensity={pollen.beifuss.intensity} />
                        <StyledPollen intensity={pollen.birke.intensity} />
                        <StyledPollen intensity={pollen.erle.intensity} />
                        <StyledPollen intensity={pollen.esche.intensity} />
                        <StyledPollen intensity={pollen.graeser.intensity} />
                        <StyledPollen intensity={pollen.hasel.intensity} />
                        <StyledPollen intensity={pollen.roggen.intensity} />
                    </ListItem>
                </Typography>,
            )}
        </List>
    )
}

function PollenHeader() {
    return (
        <Typography>
            <ListItem>
                <StyledDate></StyledDate>
                <StyledTitle longTitle="Ambrosia" shortTitle={AmbrosiaIcon} />
                <StyledTitle longTitle="Beifuss" shortTitle={BeifussIcon} />
                <StyledTitle longTitle="Birke" shortTitle={BirkeIcon} />
                <StyledTitle longTitle="Erle" shortTitle={ErleIcon} />
                <StyledTitle longTitle="Esche" shortTitle={EscheIcon} />
                <StyledTitle longTitle="Gräser" shortTitle={GraeserIcon} />
                <StyledTitle longTitle="Hasel" shortTitle={HaselIcon} />
                <StyledTitle longTitle="Roggen" shortTitle={RoggenIcon} />
            </ListItem>
            <Divider />
        </Typography >
    )
}

function StyledTitle(props: {
    longTitle: string
    shortTitle: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
}) {
    const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))

    return (
        <Paper sx={{ width: 'max(10%, 20px)' }}>
            {!isXs && <SvgIcon component={props.shortTitle} inheritViewBox color='action' />}
            {isXs && <Typography noWrap>{props.longTitle} </Typography>}
        </Paper>

    )
}