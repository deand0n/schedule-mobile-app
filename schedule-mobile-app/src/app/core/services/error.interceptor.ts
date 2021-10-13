import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ToastService } from "./toast.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor (private toastService: ToastService) {
  }

  intercept (request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === -3) {
            this.toastService.presentError("Немає з'єднання з інтернетом");
          } else {
            this.toastService.presentError(error.message);
          }

          return throwError(error);
        })
      );
  }
}
