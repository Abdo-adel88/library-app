import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any[]> {
    return this.http
      .get<any>(`https://openlibrary.org/search.json?q=${query}`)
      .pipe(
        map((res) =>
          res.docs.map((doc: any) => ({
            title: doc.title,
            author: doc.author_name?.[0],
            cover: doc.cover_i
              ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
              : null,
            key: doc.key,
          }))
        )
      );
  }
    getBooksBySubject(subject: string, limit = 20) {
  return this.http.get(`https://openlibrary.org/subjects/${subject}.json?limit=${limit}`);
}
}
