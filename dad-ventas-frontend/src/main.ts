import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';
import { withFetch } from '@angular/common/http';

// Configurar la aplicación, incluyendo HttpClient con interceptores y fetch.
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
        withInterceptors([authInterceptor]),
        withFetch()  // Habilitar fetch
    ),
    provideRouter(routes)
  ]
});
