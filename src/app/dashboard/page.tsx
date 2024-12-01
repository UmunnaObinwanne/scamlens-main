import DashboardComponent from "../../components/DashboardComponent/Dashboard"
import AdminProtected from "@/components/AdminProtection/AdminProtected"

import React from 'react'

function page() {
  return (

    <AdminProtected>
      <DashboardComponent />
    </AdminProtected>
  )
}

export default page