import { filterSearch } from './_filterSearch.mjs';

export default {
	icon: 'fas fa-search',
	name: 'searchByFilter',
	label: 'Find module(s) by filter',
	description: 'Returns IDs of modules with a specified keyword in their connection filter conditions.',
	theme: '#EEEEEE',
	input: [
		{
			name: 'keyword',
			label: 'Keyword',
			type: 'text',
			help: 'A keyword to search for across all filter names and condition values.',
			required: true
		}
	],
	steps: [
		{
			type: 'javascript',
			code: `try {
				if (!parameters.keyword) return ['No keyword provided.'];
				var results = (${filterSearch.toString()})();
				return results.length ? results : ['No filters found matching "' + parameters.keyword + '".'];
			} catch (err) {
				console.error(err);
				return ['Something went wrong while searching filters.'];
			}`,
			response: {
				output: '{{result}}'
			}
		}
	]
};
