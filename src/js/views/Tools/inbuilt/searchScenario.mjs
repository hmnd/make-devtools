import { filterSearch } from './_filterSearch.mjs';

export default {
	icon: 'fas fa-search-plus',
	name: 'searchScenario',
	label: 'Search Scenario',
	description: 'Searches for a keyword across the entire scenario — both module mappings and connection filter conditions.',
	theme: '#EEEEEE',
	input: [
		{
			name: 'keyword',
			label: 'Keyword',
			type: 'text',
			help: 'A keyword to search for.',
			required: true
		},
		{
			name: 'useOnlyValues',
			label: 'Use Only Values',
			type: 'boolean',
			required: true,
			default: true,
			help: 'For the mapping search: when checked, only values are searched. If unchecked, keys are also considered.'
		}
	],
	steps: [
		{
			type: 'api',
			method: 'searchByConfig',
			response: {
				temp: {
					mappingResults: '{{result}}'
				}
			}
		},
		{
			type: 'javascript',
			code: `try { return (${filterSearch.toString()})(); } catch (err) { console.error(err); return []; }`,
			response: {
				temp: {
					filterResults: '{{result}}'
				}
			}
		},
		{
			type: 'javascript',
			code: `return null`,
			response: {
				output: {
					'Modules by mapping': '{{temp.mappingResults}}',
					'Modules by filter': '{{temp.filterResults}}'
				}
			}
		}
	]
};
