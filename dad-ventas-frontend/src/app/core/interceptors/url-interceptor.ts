import { HttpInterceptorFn } from '@angular/common/http';
import {environment} from "../../environments/environment";

export const UrlInterceptor: HttpInterceptorFn = (req, next) => {
  const baseUrl = environment.apiUrl; // Cambia según tu API

  // Si la URL no empieza con http o https, se le añade la base URL
  if (!req.url.startsWith('http')) {
    const apiReq = req.clone({ url: baseUrl + req.url });
    return next(apiReq);
  }

  return next(req);
}