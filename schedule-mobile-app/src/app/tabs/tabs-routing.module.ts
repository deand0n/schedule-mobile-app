import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "schedule-tabs",
    component: TabsPage,
    children: [
      {
        path: ":id",
        children: [
          {
            path: "",
            loadChildren: () => import("../schedule/schedule.module").then((m) => m.SchedulePageModule)
          }
        ]
      },
      {
        path: "",
        redirectTo: "/schedule-tabs/0",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/schedule-tabs/0",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class TabsPageRoutingModule {
}
