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
          url: "/dashboard/deal_banners",
        },
        {
          title: "Shops List",
          url: "/dashboards/shops/list",
        },
        {
          title: "Deals List",
          url: "/dashboards/deals/list",
        },
        {
          title: "Purchased Deals",
          url: "/dashboards/purchased_deals",
        },
      ],
    },
    {
      title: "Mytro Admin",
      icon: HousePlus,
      items: [
        {
          title: "Stores",
          url: "/dashboards/stores",
        },
        {
          title: "Catergories",
          url: "/dashboards/categories",
        },
        {
          title: "Sub-Catergories",
          url: "/dashboards/sub-categories",
        },
        {
          title: "Products",
          url: "/dashboards/products",
        },
        {
          title: "Products Bulk Upload",
          url: "/dashboards/products-bulk-upload",
        },
        {
          title: "Home Banners",
          url: "/dashboards/home-banners",
        },
        {
          title: "Home Block Banners",
          url: "/dashboards/home-block-banners",
        },
        {
          title: "Discount Coupons",
          url: "/dashboards/discount-coupons",
        },
        {
          title: "Abandoned Cart",
          url: "/dashboards/abandoned-cart",
        },
        {
          title: "Brands",
          url: "/dashboards/brands",
        },
      ],
    },
    {
      title: "Mytro Broadcast",
      icon: Bell,
      items: [
        {
          title: "Send SMS",
          url: "/dashboards/send-sms",
        },
        {
          title: "Notifications",
          url: "/dashboards/notification",
        },
        {
          title: "Whatsapp Notifications",
          url: "/dashboards/whatsapp-notifications",
        },
      ],
    },
    {
      title: "Reporting",
      icon: ClipboardMinus,
      items: [
        {
          title: "Reports 01",
          url: "/dashboards/",
          icon: ClipboardMinus,
          items: [
            {
              title: "Purchase Stock",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Sales Stock",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Sales Refund",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Expired Items",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Out of Stock Report",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Payment Collection",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Customer Reviews",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Order Report",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Couopn Code Report",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Sale Return Report",
              url: "/dashboards/",
              icons: Settings2,
            },
          ]
        },
        {
          title: "Reports 02",
          url: "/dashboards/",
          icon: ClipboardMinus,
          items: [
            {
              title: "Datawise Analytics",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Prouduct Analytics",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Monthwise Analytics",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Monthwise Sales > &quot N &quot",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Userwise Sales > &quot N &quot",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Userwise Analytics",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "1st Order in Last 30 Days",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Refferal Reports",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Month & Areawise Sales",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "User Activity",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Timewise Statistics",
              url: "/dashboards/",
              icons: Settings2,
            },
            {
              title: "Master Reports",
              url: "/dashboards/",
              icons: Settings2,
            },
          ]
        },
      ],
    },
    {
      title: "Wallet",
      url: "/dashboards/",
      icon: Wallet,
      items: [
        {
          title: "Cash Credit",
          url: "/dashboards/",
        },
        {
          title: "Cash Debit",
          url: "/dashboards/",
        },
        {
          title: "Ecoin Credit",
          url: "/dashboards/",
        },
        {
          title: "Ecoin Debit",
          url: "/dashboards/",
        },
      ],
    },
    {
      title: "Subscription",
      url: "/dashboards/",
      icon: CreditCard,
      items: [
        {
          title: "Reports 01",
          url: "/dashboards/",
        },
        {
          title: "Reports 02",
          url: "/dashboards/",
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