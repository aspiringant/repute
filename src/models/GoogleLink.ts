export default class GoogleLink {
    links: string;
    text: string;
    cite: string;
    review: string;
    constructor(l: string, t: string, c: string, r: string) {
        this.links = l;
        this.text = t;
        this.cite = c;
        this.review = r;
    }
    toString(): void {
        if (this.review != undefined)
            console.log(this.links + "\n" + this.text + "\n" + this.cite + "\n" + this.review);
        else
            console.log(this.links + "\n" + this.text + "\n" + this.cite);
    }
}