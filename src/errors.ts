export class NameNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'NameNotFoundError';
    }
}

export class TagsNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'TagsNotFoundError';
    }
}
