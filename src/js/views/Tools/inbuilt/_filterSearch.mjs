/**
 * Core filter search logic. Serialized via .toString() and evaluated remotely.
 * Expects `parameters.keyword` and `Inspector` to exist in the execution context.
 * @return {Array<{moduleId: number, detail: string}>} Matching results (empty array if no matches)
 */
export const filterSearch = () => {
	const kw = (parameters.keyword || '').toLowerCase();
	if (!kw) return [];

	const blueprint = Inspector.instance.scenario.toJSON();
	if (!blueprint) return [];

	const flows = [
		blueprint.flow || [],
		...(blueprint.metadata?.designer?.orphans || [])
	];
	const results = [];

	const searchConditions = (conditions, moduleId, filterName) => {
		if (!Array.isArray(conditions)) return;
		for (const orGroup of conditions) {
			if (!Array.isArray(orGroup)) continue;
			for (const cond of orGroup) {
				for (const field of ['a', 'b']) {
					if (cond[field] && String(cond[field]).toLowerCase().includes(kw)) {
						results.push({ moduleId: moduleId, detail: '"' + filterName + '" \u2014 matched "' + cond[field] + '" in condition field "' + field + '"' });
					}
				}
			}
		}
	};

	const iterate = (flow) => {
		for (const m of flow) {
			if (m.filter) {
				const filterName = m.filter.name || '(unnamed)';
				if (filterName.toLowerCase().includes(kw)) {
					results.push({ moduleId: m.id, detail: 'matched filter name "' + filterName + '"' });
				}
				searchConditions(m.filter.conditions, m.id, filterName);
			}
			const nested = (m.routes || []).filter(r => r.flow).map(r => r.flow);
			if (m.onerror) nested.push(m.onerror);
			for (const f of nested) iterate(f);
		}
	};

	for (const flow of flows) iterate(flow);
	return results;
};
