import { DateTime } from "luxon";
import { Component, Input, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { SearchParams } from "../../models/search-params.model";
import { ToastService } from "src/app/core/services/toast.service";

@Component({
  selector: "search-params-modal",
  templateUrl: "./search-params-modal.component.html",
  styleUrls: ["./search-params-modal.component.scss"]
})
export class SearchParamsModalComponent implements OnInit {
  @Input() tabId: number;
  @Input() searchParams: SearchParams[];

  private searchParamsLimit = 5;

  constructor (private modalController: ModalController,
    private toastService: ToastService) {
  }

  ngOnInit (): void {
  }

  async closeModal (): Promise<void> {
    this.searchParams = this.searchParams.filter((params) => {
      const startDate = DateTime.fromMillis(Date.parse(params.startDate));
      const endDate = DateTime.fromMillis(Date.parse(params.endDate));

      if (params.isForMonth || startDate < endDate) {
        return params.group || params.teacher;
      }

      return false;
    });

    await this.modalController.dismiss({
      searchParams: this.searchParams
    });
  }

  addSearchParams (): void {
    if (this.searchParams.length >= this.searchParamsLimit) {
      this.toastService.presentError(`Параметрів не може бути більше ${this.searchParamsLimit}`);
      return;
    }

    const lastElementId = this.searchParams[this.searchParams.length - 1]?.id || 0;
    this.searchParams.push(new SearchParams(lastElementId + 1));
  }

  saveSearchParams (searchParams: SearchParams): void {
    const params = this.searchParams.find((params) => params.id === searchParams.id);
    Object.assign(params, searchParams);
  }

  removeSearchParams (searchParams: SearchParams): void {
    const params = this.searchParams.find((params) => params.id === searchParams.id);
    this.searchParams.splice(this.searchParams.indexOf(params), 1);
  }
}
