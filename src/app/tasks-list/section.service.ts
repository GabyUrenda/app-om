import { Injectable } from '@angular/core';
import { ISection } from './section.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { IStatus } from './status.interface';
import { ITeamMember } from './team-member.interface';



@Injectable({
    providedIn: 'root'
})
export class SectionService {
    private url = 'api/sections.json';

    constructor(private http: HttpClient) {};

    getSectionList(): Observable<ISection[]> {
        return this.http.get<ISection[]>(this.url).pipe(
            catchError(this.handleError)
        )
    }

    getStatus(): Observable<IStatus[]> {
        return this.http.get<IStatus[]>('api/status.json').pipe(
            catchError(this.handleError)
        )
    }

    getTeamMembers(): Observable<ITeamMember[]> {
        return this.http.get<IStatus[]>('api/teamMembers.json').pipe(
            catchError(this.handleError)
        )
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';

        if(err.error instanceof ErrorEvent) {
            errorMessage = `An error ocurred: ${err.error.message}`;
        } else {
            errorMessage = `Server returnes code ${err.status}, error message is: ${err.message}`
        };

        console.error(errorMessage);
        return throwError(errorMessage);
        
    }

}