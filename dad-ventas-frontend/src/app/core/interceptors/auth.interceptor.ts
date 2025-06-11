import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = localStorage.getItem('access_token');

    if (token) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            },
            withCredentials: false // o true si usás cookies, JWT normalmente es false
        });

        console.log('✅ Interceptor: token agregado al header');

        return next(cloned);
    }

    console.warn('⚠️ Interceptor: no se encontró token en localStorage');
    return next(req);
};
