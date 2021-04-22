import Slugify from 'slugify'
import serialize from 'form-serialize'

export default {
	strHash () {
		return (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
	},

	selectText (el) {
		if (document.body.createTextRange) {
			const range = document.body.createTextRange();
			
			range.moveToElementText(el);
			range.select();
    } else if (window.getSelection) {
			const selection = window.getSelection();
			const range = document.createRange();
			
			range.selectNodeContents(el);
			selection.removeAllRanges();
			selection.addRange(range);
    } else {
			console.warn("Could not select text in element: Unsupported browser.");
    }
	},

	findItemIndex (arr, key, val) {
		let result = undefined;

		arr.forEach((item, index) => {
			if(item[key].trim() == val.trim()) {
				result = index;
			}
		});

		return result;
	},

	slugify (str) {
		str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
		
		str = Slugify(str, {
			replacement: '-',
			remove: /[*#{}?\\//[\];/,^$%+~.()'"!:@]/g,
			lower: true,
			strict: true,
		});

		str.replace(/[^\w-]+/g, '')
			.replace(/--+/g, '-')
			.replace(/^-+/, '')
			.trim();

		return str;
	},

	canDisplayCvSection (context, cvField) {
		const section = context.$store.state.curriculum[cvField];
		const notHidden = !context.$store.state.curriculum.hiddenSections.includes(context.$options._componentTag);
		const isEmptyOnView = !context.$editing && section.items.length === 0 && !section.introduction;
		
		return ( notHidden && !isEmptyOnView );		
	},

	bytesToMB (b) {
		return (b > 0) ? (b / 1024 / 1024).toFixed(2) : 0;
	},

	nonReactive(obj) {
		return JSON.parse(JSON.stringify(obj));
	},

	hydrateForm (form, data) {
		Object.keys(data).forEach(key => {
			const value = data[key];
			const input = form.elements[key];

			if (input) {			
				switch(input.type) {
					case 'radio': 
					case 'checkbox':
						input.checked = !!value;
						break;
					
					default:
						input.value = value;
						break;
				}
			}
		});
	},

	serializeForm (form, empties = true) {
		return serialize(form, { hash: true, empty: empties });
	},

	isUrl (str) {
		return /(http[s]?:\/\/)?[^\s(["<,>]*\.[^\s[",><]*/.test(str);
	},

	isEmail (str) {
		const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		return regex.test(str);
	},

	isCvUserUrl (url) {
		const urlParts = url.split('/cv/');

		return urlParts.filter(k => k.trim().length).length === 2;
	}	
}