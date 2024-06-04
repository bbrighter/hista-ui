import { useEffect } from "react"
import useHista from "../../store/store"
import { Container, Grid, Skeleton } from "@mui/material"
import KPIPanel from "../statistics/components/KPIPanel"

export default function Pollens() {
    const getPollens = useHista(state => state.getPollens)
    const pollens = useHista(state => state.pollens)
    const pollensAreLoaded = useHista(state => state.pollensAreLoaded)

    useEffect(() => {
        if (!pollensAreLoaded) {
            getPollens()
        }
    }, [getPollens, pollensAreLoaded])

    return (
        <Container sx={{ padding: 2 }}>
            {!pollensAreLoaded && <Skeleton variant="rectangular" sx={{ width: '100%', height: '40px' }} />}
            <Grid container padding={0} rowGap={1}>
                {pollensAreLoaded && <Grid container item xs={12} gap={1}>
                    <KPIPanel xs={2} header />
                    <KPIPanel xs={1} header label="Ambrosia" />
                    <KPIPanel xs={1} header label="Beifuss" />
                    <KPIPanel xs={1} header label="Birke" />
                    <KPIPanel xs={1} header label="Erle" />
                    <KPIPanel xs={1} header label="Esche" />
                    <KPIPanel xs={1} header label="Gräser" />
                    <KPIPanel xs={1} header label="Hasel" />
                    <KPIPanel xs={1} header label="Roggen" />
                </Grid>}
                {!pollensAreLoaded && [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (<Skeleton key={n} variant="rectangular" sx={{ width: '100%', height: '40px' }} />))}
                {pollensAreLoaded && pollens.map(p => (
                    <Grid container item xs={12} gap={1} key={p.date.valueOf()}>
                        <KPIPanel xs={2} header label={p.date.toLocaleDateString()} />
                        <KPIPanel xs={1} value={{ current: p.ambrosia.intensity, max: 7 }} />
                        <KPIPanel xs={1} value={{ current: p.beifuss.intensity, max: 7 }} />
                        <KPIPanel xs={1} value={{ current: p.birke.intensity, max: 7 }} />
                        <KPIPanel xs={1} value={{ current: p.erle.intensity, max: 7 }} />
                        <KPIPanel xs={1} value={{ current: p.esche.intensity, max: 7 }} />
                        <KPIPanel xs={1} value={{ current: p.graeser.intensity, max: 7 }} />
                        <KPIPanel xs={1} value={{ current: p.hasel.intensity, max: 7 }} />
                        <KPIPanel xs={1} value={{ current: p.roggen.intensity, max: 7 }} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}