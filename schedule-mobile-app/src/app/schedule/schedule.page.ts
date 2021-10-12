import { Component, OnInit } from "@angular/core";
import { Day } from "./models/day.model";
import { LoadingController, ModalController } from "@ionic/angular";
import { SearchParamsModalComponent } from "../shared/modals/search-params-modal/search-params-modal.component";
import { TabSettings } from "../shared/models/tab-settings";
import { ActivatedRoute } from "@angular/router";
import { SettingsService } from "../core/services/settings.service";
import { ScheduleService } from "../core/services/schedule.service";
import { clone, isEqual } from "lodash-es";
import { DateTime } from "luxon";
import { SearchParams } from "../shared/models/search-params.model";
import { ToastService } from "../core/services/toast.service";
import { LogService } from "../core/services/log.service";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.page.html",
  styleUrls: ["./schedule.page.scss"]
})
export class SchedulePage implements OnInit {
  days: Day[] = [];

  tabSettings: TabSettings;
  tabId: number;

  constructor (
    private modalController: ModalController,
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private settingsService: SettingsService,
    private loadingController: LoadingController,
    private toastService: ToastService,
    private logService: LogService
  ) {
  }

  async ngOnInit () {
    this.tabId = +this.route.snapshot.paramMap.get("id");
    this.tabSettings = this.settingsService.getTabSettings(this.tabId);
    this.days = this.scheduleService.tabSchedule[this.tabId];

    if (this.days.length === 0 && this.tabSettings.searchParams.length !== 0) {
      await this.getSchedule();
    }
  }

  async presentModal () {
    const modal = await this.modalController.create({
      component: SearchParamsModalComponent,
      animated: true,
      swipeToClose: true,
      componentProps: {
        tabId: this.route.snapshot.paramMap.get("id"),
        searchParams: clone(this.tabSettings.searchParams)
      }
    });

    await modal.present();

    modal.onDidDismiss().then(async (overlayEventDetail) => {
      const searchParams: SearchParams[] = overlayEventDetail.data.searchParams;

      if (isEqual(this.tabSettings.searchParams, searchParams)) {
        return;
      }

      this.tabSettings.searchParams = searchParams;
      this.settingsService.setSearchParams(this.tabId, this.tabSettings.searchParams);

      await this.getSchedule();
    });
  }

  async getSchedule (event?) {
    const loading = event === undefined
      ? await this.loadingController.create({
        message: "Загрузка..."
      })
      : undefined;
    await loading?.present();

    this.scheduleService.getSchedule(this.tabSettings.searchParams).subscribe((days) => {
      this.days = days;

      this.days = this.sortDays(this.days);
      this.scheduleService.tabSchedule[this.tabId] = this.days;

      loading?.dismiss();
      event?.target.complete();
    }, (error) => {
      this.toastService.presentError("Не вдалося загрузити розклад");
      this.logService.error(error);
    });
  }

  private sortDays (days: Day[]) {
    days = days.sort((firstDay, secondDay) => {
      const firstDate = DateTime.fromFormat(firstDay.date, "dd.LL.yyyy");
      const secondDate = DateTime.fromFormat(secondDay.date, "dd.LL.yyyy");

      return firstDate.ordinal - secondDate.ordinal;
    });

    days = days.map((day) => {
      day.lessons = day.lessons.sort((firstLesson, secondLesson) => {
        return firstLesson.order - secondLesson.order;
      });

      return day;
    });

    return days;
  }
}
