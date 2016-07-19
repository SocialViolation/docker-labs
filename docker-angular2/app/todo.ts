export class TodoItem {
	private _id: String;
	title: String;

	completed: Boolean;
	editing: Boolean;

    get id() {
        return this._id;
    }
	set id(value: String) {
		this._id = value.trim();
	}

	constructor(title: String) {
		this.title = title.trim();
		this.completed = false;
		this.editing = false;
	}
}
