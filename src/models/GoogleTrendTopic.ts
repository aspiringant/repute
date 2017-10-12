export default class GoogleTrendTopic {
    topic: string;
    strength: string;
    constructor(t: string, s: string) {
        this.topic = t;
        this.strength = s;
    }
    toString(): void {
        console.log(this.topic + "\n" + this.strength);
    }
}