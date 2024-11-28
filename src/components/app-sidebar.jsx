"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Bell,
  Gift,
  HousePlus,
  UsersRound
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { CreditCard } from "lucide-react"
import { Wallet } from "lucide-react"
import { ClipboardMinus } from "lucide-react"

const data = {
  user: {
    name: "Mr. Master Admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Mytro Deals",
      url: "",
      icon: Gift,
      isActive: true,
      items: [
        {
          title: "Deal Home Banners",
          url: "#",
        },
        {
          title: "Shops List",
          url: "#",
        },
        {
          title: "Deals List",
          url: "#",
        },
        {
          title: "Purchased Deals",
          url: "#",
        },
      ],
    },
    {
      title: "Mytro Admin",
      url: "#",
      icon: HousePlus,
      items: [
        {
          title: "Stores",
          url: "#",
        },
        {
          title: "Catergories",
          url: "#",
        },
        {
          title: "Sub-Catergories",
          url: "#",
        },
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Products Bulk Upload",
          url: "#",
        },
        {
          title: "Home Banners",
          url: "#",
        },
        {
          title: "Home Block Banners",
          url: "#",
        },
        {
          title: "Discount Coupons",
          url: "#",
        },
        {
          title: "Abandoned Cart",
          url: "#",
        },
        {
          title: "Brands",
          url: "#",
        },
      ],
    },
    {
      title: "Mytro Broadcast",
      url: "#",
      icon: Bell,
      items: [
        {
          title: "Send SMS",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Whatsapp Notifications",
          url: "#",
        },
      ],
    },
    {
      title: "Reporting",
      url: "#",
      icon: ClipboardMinus,
      items: [
        {
          title: "Reports 01",
          url: "#",
          icon: ClipboardMinus,
          items: [
            {
              title: "Purchase Stock",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Sales Stock",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Sales Refund",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Expired Items",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Out of Stock Report",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Payment Collection",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Customer Reviews",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Order Report",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Couopn Code Report",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Sale Return Report",
              url: "#",
              icons: Settings2,
            },
          ]
        },
        {
          title: "Reports 02",
          url: "#",
          icon: ClipboardMinus,
          items: [
            {
              title: "Datawise Analytics",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Prouduct Analytics",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Monthwise Analytics",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Monthwise Sales > &quot N &quot",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Userwise Sales > &quot N &quot",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Userwise Analytics",
              url: "#",
              icons: Settings2,
            },
            {
              title: "1st Order in Last 30 Days",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Refferal Reports",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Month & Areawise Sales",
              url: "#",
              icons: Settings2,
            },
            {
              title: "User Activity",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Timewise Statistics",
              url: "#",
              icons: Settings2,
            },
            {
              title: "Master Reports",
              url: "#",
              icons: Settings2,
            },
          ]
        },
      ],
    },
    {
      title: "Wallet",
      url: "#",
      icon: Wallet,
      items: [
        {
          title: "Cash Credit",
          url: "#",
        },
        {
          title: "Cash Debit",
          url: "#",
        },
        {
          title: "Ecoin Credit",
          url: "#",
        },
        {
          title: "Ecoin Debit",
          url: "#",
        },
      ],
    },
    {
      title: "Subscription",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Reports 01",
          url: "#",
        },
        {
          title: "Reports 02",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  return (
    (<Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain items={data.navMain} />        
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>)
  );
}