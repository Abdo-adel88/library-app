import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {
    
  }

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
getAllBooks(limit = 20): Observable<any[]> {
  return this.http.get<any>(`https://openlibrary.org/subjects/fiction.json?limit=${limit}`).pipe(
    map((res) =>
      res.works.map((doc: any) => ({
        title: doc.title,
        author: doc.authors?.[0]?.name,
        cover_id: doc.cover_id,
        edition_count: doc.edition_count,
      }))
    )
  );
}
getBookDetails(workKey: string): Observable<any> {
  return this.http.get(`https://openlibrary.org${workKey}.json`);
}
getAuthorDetails(authorKey: string): Observable<any> {
  const cleanKey = authorKey.replace('/authors/', '');
  return this.http.get(`https://openlibrary.org/authors/${cleanKey}.json`);
}



}
