import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(
    private http: HttpClient,
    private toastController: ToastController
  ) { }

  // @LocalStorage() orders: Order[] = [];
  // orders$ = new BehaviorSubject<Order[]>(this.orders);

  getOrder(orderId) {
    return this.http
      .get<Order.Order>(`${environment.api_url}/orders/${orderId}`)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  addOrder(order: Order.Order) {
    return this.http
      .post<Order.Order>(`${environment.api_url}/orders`, order)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  getOrders(params: Order.SearchParams) {

    const p = {
      ...{
        page: '0',
        size: '10',
        sort: 'lastModifiedDate,desc',
      }, ...params,
    };
console.log(p)
    let search = '';

    if (params.term) {
      search = `/_search/${params.term}`;
    }

    const c = {};
    for (const propName in p) {
      if (p[propName] !== null && p[propName] !== undefined) {
        c[propName] = p[propName].toString();
      }
    }

    return this.http
      .get<Order.Order[]>(`${environment.api_url}/orders${search}`, { params: c })
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  getOrderTemplates() {
    return this.http
      .get<Order.Template[]>(`${environment.api_url}/order-templates`)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }


  getNetwork(params: { pending: boolean }) {
    return this.http
      .get<Network.NetworkResp>(`${environment.api_url}/network?pending=${params.pending}`)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  getCompany(id) {
    return this.http
      .get<Network.Company>(`${environment.api_url}/companies/${id}`)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  getDocuments(orderId: string) {
    return this.http
      .get<Order.Documents>(`${environment.api_url}/orders/${orderId}/documents`)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  getDocument(orderId: string, docId: string) {
    return this.http
      .get<Blob>(`${environment.api_url}/orders/${orderId}/documents/${docId}`, {
        responseType: 'blob' as 'json',
      })
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  removeDocument(orderId: string, docId: string) {
    return this.http
      .delete(`${environment.api_url}/orders/${orderId}/documents/${docId}`)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  getEvents(orderId: string, params?: any) {
    return this.http
      .get<Order.Event[]>(`${environment.api_url}/orders/${orderId}/events?page=0&size=1000&sort=createdAt,desc`)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  getComments(orderId: string, params?: any) {
    return this.http
      .get<Order.Comment[]>(`${environment.api_url}/orders/${orderId}/comments?page=0&size=1000&sort=createdAt,desc`)
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }

  sendComment(orderId: string, params?: any) {
    return this.http
      .post<Order.Comment[]>(`${environment.api_url}/orders/${orderId}/comments`, {
        orderId,
        text:  params.text,
        mentions : params.mentions
      })
      .pipe(
        catchError((err) => {
          this.toastController
            .create({
              message: err.message,
              color: 'danger',
              duration: 2000
            })
            .then((toast) => {
              toast.present();
            });
          return throwError(err);
        }),
      );
  }
}
