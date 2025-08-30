/// <reference types="vite-plugin-svgr/client" />
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid, GridCellParams, gridClasses, GridColDef, GridColumnHeaderParams } from '@mui/x-data-grid';

import { PollenIntensity } from '../../../store/pollen/pollen';
import useHista from '../../../store/store';
import AmbrosiaIcon from './ambrosia.svg?react'
import BeifussIcon from './beifuss.svg?react'
import BirkeIcon from './birke.svg?react'
import ErleIcon from './erle.svg?react'
import EscheIcon from './esche.svg?react'
import GraeserIcon from './graeser.svg?react'
import HaselIcon from './hasel.svg?react'
import RoggenIcon from './roggen.svg?react'

export default function PollenGrid(props: { loading: boolean }) {
    const isSmall = useMediaQuery('(max-width:600px)');

    const iconMap: Record<string, React.ElementType> = {
        ambrosia: AmbrosiaIcon,
        beifuss: BeifussIcon,
        birke: BirkeIcon,
        erle: ErleIcon,
        esche: EscheIcon,
        graeser: GraeserIcon,
        hasel: HaselIcon,
        roggen: RoggenIcon,
    };

    const pollens = useHista(state => state.pollens)
    const columns: Array<GridColDef> = [
        { field: 'date', headerName: 'Datum', valueFormatter: (p: Date) => p.toLocaleDateString('de-DE') },
        { field: 'ambrosia', headerName: 'Ambrosia', renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <AmbrosiaIcon width={16} color='white' /> : p.colDef.headerName) },
        { field: 'beifuss', headerName: 'Beifuss', renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <BeifussIcon width={16} /> : p.colDef.headerName) },
        { field: 'birke', headerName: 'Birke', renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <BirkeIcon width={16} /> : p.colDef.headerName) },
        { field: 'erle', headerName: 'Erle', renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <ErleIcon width={16} /> : p.colDef.headerName) },
        { field: 'esche', headerName: 'Esche', renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <EscheIcon width={16} /> : p.colDef.headerName) },
        { field: 'graeser', headerName: 'Gräser', renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <GraeserIcon width={16} /> : p.colDef.headerName) },
        { field: 'hasel', headerName: 'Hasel', renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <HaselIcon width={16} /> : p.colDef.headerName) },
        { field: 'roggen', headerName: 'Roggen', renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <RoggenIcon width={16} color='white' /> : p.colDef.headerName) },
    ].map(col => {
        if (col.field == 'date') return col

        const Icon = iconMap[col.field]
        return {
            ...col,
            valueFormatter: isSmall ? () => '' : (p: PollenIntensity) => p.intensityString,
            flex: 1,
            renderHeader: (p: GridColumnHeaderParams) => (isSmall ? <Icon width={16} fill='currentColor' /> : p.colDef.headerName),
        }
    })

    const rows = pollens.map(p => ({
        id: p.date.toISOString(),
        date: p.date,
        ambrosia: p.ambrosia,
        beifuss: p.beifuss,
        birke: p.birke,
        erle: p.erle,
        esche: p.esche,
        graeser: p.graeser,
        hasel: p.hasel,
        roggen: p.roggen,
    }))
    return (
        <Box
            sx={{
                height: '100%',
                width: '100%',
                [`.${gridClasses.cell}.level-1`]: {
                    backgroundColor: 'darkgreen',
                    color: 'black',
                },
                [`.${gridClasses.cell}.level-2`]: {
                    backgroundColor: 'green',
                    color: 'black',
                },
                [`.${gridClasses.cell}.level-3`]: {
                    backgroundColor: 'greenyellow',
                    color: 'black',
                },
                [`.${gridClasses.cell}.level-4`]: {
                    backgroundColor: 'yellow',
                    color: 'black',
                },
                [`.${gridClasses.cell}.level-5`]: {
                    backgroundColor: 'orange',
                    color: 'white',
                },
                [`.${gridClasses.cell}.level-6`]: {
                    backgroundColor: 'red',
                    color: 'white',
                },
                [`.${gridClasses.cell}.level-7`]: {
                    backgroundColor: 'purple',
                    color: 'white',
                },
            }}
        >
            <DataGrid
                loading={props.loading}
                rows={rows}
                columns={columns}
                getCellClassName={(params: GridCellParams<unknown, PollenIntensity, number>) => {
                    if (params.field === 'date') {
                        return '';
                    }
                    return `level-${params.value.intensity}`;
                }}
                disableColumnMenu
                disableColumnSorting
                pageSizeOptions={[100, 365]}

            />
        </Box>
    );
}