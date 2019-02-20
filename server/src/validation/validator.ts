export class Validator {
	public validate(data: any) {
		let valid = true;
		for (let key in data) {
			try {
				if (data[key].trim() === '') {
					valid = false;
				}
			} catch (error) {
				valid = false;
			}
		}
		return valid;
	}
}
