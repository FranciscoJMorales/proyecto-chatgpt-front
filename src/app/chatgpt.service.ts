import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ChatGptService {

    constructor(private http: HttpClient) { }

    /**
     * Send prompt
     *
     * @param {string} prompt - Prompt
     */
    async chat(prompt: string): Promise<any> {
        try {
            const res = await lastValueFrom(this.http.post('http://localhost:4000/chat', { prompt }));
            const data = JSON.parse(JSON.stringify(res));
            return data;
        }
        catch (error: any) {
            return error.error;
        }
    }
}
