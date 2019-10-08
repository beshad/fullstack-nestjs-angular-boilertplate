import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from '../user/user.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>
    public currentUser: Observable<User>

    constructor(
        private http: HttpClient
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')))
        this.currentUser = this.currentUserSubject.asObservable()
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value
    }

    public get isLoggedIn() {
        if (this.currentUserValue == null) {
            return false
        }
        return true
    }

    public login(email: string, password: string) {
        return this.http.post<any>('/api/users/login', { email, password }).pipe(map(payload => {
            localStorage.setItem('currentUser', JSON.stringify(payload))
            this.currentUserSubject.next(payload)
            return payload
        }))
    }

    public logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser')
        this.currentUserSubject.next(null)
    }
}