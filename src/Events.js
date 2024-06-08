/**
 * Class representing an event system.
 */
class Events {
    constructor() {
        this.callbacks = [];
        this.nextId = 0;
    }

    /**
     * Emit an event, triggering all callbacks subscribed to this event.
     * @param {string} eventName - The name of the event to emit.
     * @param {*} value - The value to pass to the event callback.
     */
    emit(eventName, value) {
        this.callbacks.forEach(stored => {
            if (stored.eventName === eventName) {
                stored.callback(value);
            }
        });
    }

    /**
     * Subscribe to an event.
     * @param {string} eventName - The name of the event to subscribe to.
     * @param {*} caller - The caller subscribing to the event.
     * @param {function} callback - The callback function to execute when the event is emitted.
     * @returns {number} The ID of the subscription.
     */
    on(eventName, caller, callback) {
        this.nextId += 1;
        this.callbacks.push({
            id: this.nextId,
            eventName,
            caller,
            callback,
        });
        return this.nextId;
    }

    /**
     * Unsubscribe from an event by ID.
     * @param {number} id - The ID of the subscription to remove.
     */
    off(id) {
        this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
    }

    /**
     * Unsubscribe all events associated with a specific caller.
     * @param {*} caller - The caller to unsubscribe.
     */
    unsubscribe(caller) {
        this.callbacks = this.callbacks.filter(
            (stored) => stored.caller !== caller,
        );
    }
}

/** The singleton instance of the Events class. */
export const events = new Events();
