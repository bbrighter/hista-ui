import { Container, Tab, Tabs } from "@mui/material";
import Charts from "./Charts";
import Diary from "./components/Diary";
import { useState } from "react";
import IngredientCharts from "./IngredientCharts";


export default function Statistics() {
    const [tab, setTab] = useState(0)


    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue)
    }

    return (
        <Container sx={{ padding: '2rem' }}>
            <Tabs onChange={handleTabChange} value={tab}>
                <Tab label="Symptome" value={0} />
                <Tab label="Essen" value={1} />
                <Tab label="Export" value={2} />
            </Tabs>
            <div hidden={tab !== 0}>
                <Charts />
            </div>
            <div hidden={tab !== 1}>
                <IngredientCharts />
            </div>
            <div hidden={tab !== 2}>
                <Diary />
            </div>

        </Container>
    )
}