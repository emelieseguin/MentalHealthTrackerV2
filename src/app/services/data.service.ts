import { Injectable } from '@angular/core';

// Create a Country Object
export class Country {

    constructor(public Country?: string, public Amount?: number,
        public SecondVal?: number, public ThirdVal?: number, public Impact?: number, public Year?: number) {
    }
}
let getFatigueMap = new Map([
    ['2019,7,9,10,33,15', 6],
    ['2019,7,8,10,33,15', 4],
    ['2019,7,8,10,33,15', 8] 
]);

let getHeadacheMap = new Map([
    ['2019,7,9,10,33,15', 1],
    ['2019,7,8,10,33,15', 8],
    ['2019,7,8,10,33,15', 10] 
]);

let getApathyMap = new Map([
    ['2019,7,9,10,33,15', 9],
    ['2019,7,8,10,33,15', 2],
    ['2019,7,8,10,33,15', 1] 
]);

// Symptom
export class Symptom {
    Name: string;
    Values?: Map<string, number>;
    Active: boolean;
}

// Mock of all symptoms a user has
let getMockedSymptoms: Symptom[] =
    [
        {
            Name: 'Fatigue',
            Values: getFatigueMap,
            Active: true
        },
        {
            Name: 'Headache',
            Values: getHeadacheMap,
            Active: true
        },
        {
            Name: 'Apathy',
            Values: getApathyMap,
            Active: true
        }
    ];

@Injectable({
    providedIn: 'root',
})
export class DataService {

    getCategoricalSource(): Country[] {
        return [
            { Country: "Germany", Amount: 15, SecondVal: 14, ThirdVal: 24, Impact: 0, Year: 0 },
            { Country: "France", Amount: 13, SecondVal: 23, ThirdVal: 25, Impact: 0, Year: 0 },
            { Country: "Bulgaria", Amount: 24, SecondVal: 17, ThirdVal: 23, Impact: 0, Year: 0 },
            { Country: "Spain", Amount: 11, SecondVal: 19, ThirdVal: 24, Impact: 0, Year: 0 },
            { Country: "USA", Amount: 18, SecondVal: 8, ThirdVal: 21, Impact: 0, Year: 0 }
        ];
    }

    getAllUserSymptoms(): Symptom[] {
        return getMockedSymptoms;
    }
}