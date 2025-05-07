import Container from '@mui/material/Container';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState } from 'react';

import Charts from './Charts';
import Diary from './components/Diary';

type TabValue = 0 | 1 | 2
interface TabType {
    label: string
    value: TabValue
    child: JSX.Element
}

export default function Statistics() {
    const [selectedTab, setSelectedTab] = useState<TabValue>(0)

    const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue) => {
        setSelectedTab(newValue)
    }

    const tabs: Array<TabType> = [
        { label: 'Symptom', value: 0, child: <Charts type='symptom' /> },
        { label: 'Essen', value: 1, child: <Charts type='ingredient' /> },
        { label: 'Export', value: 2, child: <Diary /> },
    ]

    return (
        <Container sx={{ padding: '2rem' }}>
            <Tabs onChange={handleTabChange} value={selectedTab}>
                {tabs.map(tab => (
                    <Tab key={tab.value} label={tab.label} value={tab.value} />
                ))}
            </Tabs>
            {tabs.map(tab => (
                <VisibleTab
                    selectedTab={selectedTab}
                    key={tab.value}
                    value={tab.value}
                >
                    {tab.child}
                </VisibleTab>
            ))}
        </Container>
    )
}

function VisibleTab(props: React.PropsWithChildren<{
    selectedTab: number
    value: number
}>) {
    return (
        <div hidden={props.selectedTab !== props.value}>
            {props.children}
        </div>
    )
}