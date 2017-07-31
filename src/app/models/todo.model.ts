import { uuidv4 } from 'uuid/v4'

export class TodoModel {
	completed : boolean;
	title : string;
	uid : string;
	user_uid : string;

	setTitle(title) {
		this.title = title.trim();
	}

	constructor(title) {
		this.uid = uuidv4();
		this.completed = false;
		this.title = title.trim();
	}
}