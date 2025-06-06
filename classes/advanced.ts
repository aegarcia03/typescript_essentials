class User {
    private _firstName: string = '';
    private _lastName: string = '';

    // setting values (often with validation or transformation)
    set firstName(name: string){
        if (name.trim() === ''){
            throw new Error('Invalid name.');
        }
        this._firstName = name;
    }

    set lastName(name: string){
        if (name.trim() === ''){
            throw new Error('Invalid name.');
        }
        this._lastName = name;
    }

    //  getting values (usually just returning them)
    get fullName() {
        return this._firstName + ' ' + this._lastName;
    }
}
const max = new User();
max.firstName = 'Max';
max.lastName = 'Garcia';
console.log(max.fullName);