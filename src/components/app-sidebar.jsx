import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HelpCircle,
  HomeIcon,
  Library,
  LogOut,
  Map,
  MenuIcon,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Menu'",
      url: "#",
      icon: HomeIcon,
      isActive: true,
      items: [
        {
          title: "Home",
          url: "#",
        },
        {
          title: "Discovery",
          url: "#",
        },
        {
          title: "Community",
          url: "#",
        },
        {
          title: "Coming Soon",
          url: "#",
        }
      ],
    },
    {
      title: "Libary",
      url: "#",
      icon: Library,
      items: [
        {
          title: "Recent",
          url: "#",
        },
        {
          title: "Book-Marked",
          url: "#",
        },
        {
          title: "Top-rated",
          url: "#",
        },
        {
          title: "Downloaded",
          url: "#",
        }
      ],
    },
  ],
  projects: [
    {
      name: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      name: "Help",
      url: "#",
      icon: HelpCircle,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}
