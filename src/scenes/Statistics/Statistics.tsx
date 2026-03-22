import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural"
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ScienceIcon from "@mui/icons-material/Science";
import Container from "@mui/material/Container"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import { JSX, useState } from "react"

import { Charts } from "./Charts"
import { Diary } from "./Diary"
import { HeadacheDiary } from "./Headaches"
import { NutritionStats } from "./Nutrition"

type TabValue = 1 | 2 | 3 | 4
interface TabType {
  icon: JSX.Element
  value: TabValue
  child: JSX.Element
}

export default function Statistics() {
  const [selectedTab, setSelectedTab] = useState<TabValue>(1)

  const handleTabChange = (_: React.SyntheticEvent, newValue: TabValue) => {
    setSelectedTab(newValue)
  }

  const tabs: Array<TabType> = [
    { icon: <ScienceIcon/>, value: 1, child: <NutritionStats/> },
    { icon: <RestaurantIcon/>, value: 2, child: <Charts /> },
    { icon: <AutoStoriesIcon/>, value: 3, child: <Diary /> },
    { icon: <FaceRetouchingNaturalIcon/>, value: 4, child: <HeadacheDiary /> },
  ]

  return (
    <Container sx={{ padding: "2rem" }}>
      <Tabs 
        onChange={handleTabChange} value={selectedTab}
        variant="fullWidth"
        sx={{
          minHeight: 40,
          "& .MuiTab-root": {
            minWidth: 40,
          },
        }}
      >
        {tabs.map(tab => (
          <Tab 
            key={tab.value} 
            icon={tab.icon} 
            value={tab.value}
          />
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
    <div>
      {props.selectedTab == props.value && props.children}
    </div>
  )
}
