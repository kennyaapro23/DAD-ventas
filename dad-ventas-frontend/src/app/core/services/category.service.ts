
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Category} from "../models/category.model";
import {Observable} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'http://localhost:8085/Category';
    constructor(private http: HttpClient){}

    getCategories(){
        return this.http.get<Category[]>(this.apiUrl);
    }
    getCategoryById(id: number){
        return this.http.get<Category>(`${this.apiUrl}/${id}`);
    }
    createCategory(category: Category){
        return this.http.post<Category>(this.apiUrl, category);
    }
    updateCategory(category: Category){
        return this.http.put<Category>(this.apiUrl, category);
    }
    deleteCategory(id: number){
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    // ✅ Nuevo: subir imagen
    uploadImage(file: File): Observable<string> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post(this.apiUrl + '/upload-image', formData, {
            responseType: 'text',
        });
    }
}

