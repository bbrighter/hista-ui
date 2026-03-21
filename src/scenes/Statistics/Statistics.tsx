import Container from "@mui/material/Container"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { JSX, useState } from "react"

import { Charts } from "./Charts"
import { Diary } from "./Diary"
import { HeadacheDiary } from "./Headaches"
import { Nutrition } from "./Nutrition"

type TabValue = 0 | 1 | 2 | 3 | 4
interface TabType {
  label: string
  value: TabValue
  child: JSX.Element
}

export default function Statistics() {
  const [selectedTab, setSelectedTab] = useState<TabValue>(1)

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue) => {
    setSelectedTab(newValue)
  }

  const tabs: Array<TabType> = [
    { label: "Essen", value: 1, child: <Charts /> },
    { label: "Tagebuch", value: 2, child: <Diary /> },
    { label: "Kopfschmerzen", value: 3, child: <HeadacheDiary /> },
    { label: "Nährwerte", value: 4, child: <Nutrition/> },
  ]

  return (
    <Container sx={{ padding: "2rem" }}>
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
