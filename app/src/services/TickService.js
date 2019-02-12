import { Subject } from 'rxjs';

const REFRESH_TIME = 1000;

class TickService extends Subject {
    constructor() {
        super();
        this.subCount = 0;
    }

    startTimer() {
        this.intervalId = setInterval(() => this.next(new Date()), REFRESH_TIME);
    }

    stopTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    }

    subscribe(observer) {
        this.subCount++;
        const subscription = super.subscribe(observer);

        if (this.subCount === 1) {
            this.startTimer();
        }

        return () => {
            this.subCount--;
            subscription.unsubscribe();

            if (this.subCount <= 0) {
                this.stopTimer();
            }
        };
    }
}

const singleton = new TickService();
export default singleton;
