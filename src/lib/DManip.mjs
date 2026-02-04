/**
 * @description Creates a new HTML element by the specified criteria
 * @param {string} tag A HTML tag name
 * @param {array} classes Array of classes to be asigned to the new element
 * @param {string} innerHTML Inner HTML to be set as a body of the element
 * @return {HTMLElement} A new HTML element
 */
export function createElement(tag, classes, innerHTML) {
	const e = document.createElement(tag);
	if (Array.isArray(classes)) {
		e.classList = classes.join(' ');
	}
	if (innerHTML) {
		e.innerHTML = innerHTML;
	}
	return e;
}

/**
 * @description Creates a new brick to be used in tab
 * @param {HTMLElement} dl List to append to
 * @param {string} label A key of the brick
 * @param {string} value Value to be shown in the editor
 */
function makeBrickEditor(dl, label, value) {
	const brickKey = createElement('dt', ['col-2', 'text-right', 'px-0'], label);
	const brickValue = createElement('dd', ['col-10', 'pr-4']);
	try {
		let content;
		if (typeof value === 'object') {
			content = JSON.stringify(value, null, 4);
		} else {
			content = JSON.stringify(JSON.parse(value), null, 4);
		}
		brickValue.appendChild(createElement('textarea', ['code-view'], content));
	} catch (e) {
		brickValue.appendChild(createElement('textarea', ['code-view'], value));
	}
	dl.appendChild(brickKey);
	dl.appendChild(brickValue);
}

/**
 * @description Creates a new brick to be used in tab without the describing key
 * @param {HTMLElement} dl List to append to
 * @param {string} value Value to be shown in the editor
 */
function makeBrickEditorFull(dl, value) {
	const brickValue = createElement('dd', ['col-12', 'mb-0']);
	try {
		let content;
		if (typeof value === 'object') {
			content = JSON.stringify(value, null, 4);
		} else {
			content = JSON.stringify(JSON.parse(value), null, 4);
		}
		brickValue.appendChild(createElement('textarea', ['code-view'], content));
	} catch (e) {
		brickValue.appendChild(createElement('textarea', ['code-view'], value));
	}
	dl.appendChild(brickValue);
}

/**
 * @description Creates a new brick to be used in tab without the describing key
 * @param {HTMLElement} dl List to append to
 * @param {string} value Value to be shown in the editor
 * @param {string} id Editor ID
 * @param {boolean} yaml Use YAML
 */
function makeBrickEditorFullEditable(dl, value, id, yaml) {
	const brickValue = createElement('dd', ['col-12', 'mb-0', 'cursor-enable']);
	try {
		let content;
		if (yaml) {
			// eslint-disable-next-line no-undef
			content = jsyaml.safeDump(value);
		} else if (typeof value === 'object') {
			content = JSON.stringify(value, null, 4);
		} else {
			content = JSON.stringify(JSON.parse(value), null, 4);
		}
		const textArea = createElement('textarea', ['code-edit'], content);
		if (yaml) {
			textArea.classList.add('yaml-editor');
		}
		textArea.setAttribute('id', id);
		brickValue.appendChild(textArea);
	} catch (e) {
		const textArea = createElement('textarea', ['code-edit'], value);
		textArea.setAttribute('id', id);
		brickValue.appendChild(textArea);
	}
	dl.appendChild(brickValue);
}


/**
 * @description Creates a new brick to be used in the tab
 * @param {HTMLElement} dl List to append to
 * @param {string} label A key of the brick
 * @param {string} value Value to be shown
 */
function makeBrick(dl, label, value) {
	const brickKey = createElement('dt', ['col-2', 'text-right', 'px-0', 'mb-2'], label);
	const brickValue = createElement('dd', ['col-10', 'pr-4', 'mb-2', 'selectable'], value);
	dl.appendChild(brickKey);
	dl.appendChild(brickValue);
}

/**
 * @description Creates a new brick with error message
 * @param {HTMLElement} dl List to append to
 * @param {string} value Value to be shown
 */
function makeBrickError(dl, value) {
	const brickValue = createElement('dd', ['col-12', 'pr-4', 'mb-2', 'selectable', 'text-center', 'font-italic', 'text-danger'], value);
	dl.appendChild(brickValue);
}

/**
 * @description Sets attributes for tab link
 * @param {HTMLElement} tabLink TabLink to modify
 * @param {string} id Id base  
 * @param {number} index Unique numeric index 
 * @param {boolean} selected If should be selected. Default false 
 * @return {HTMLElement} Modified tablink
 */
function setAttributesTabLink(tabLink, id, index, selected = false) {
	tabLink.setAttribute('id', `${id}${index}Tab`);
	tabLink.setAttribute('data-toggle', 'tab');
	tabLink.setAttribute('href', `#${id}${index}Content`);
	tabLink.setAttribute('role', 'tab');
	tabLink.setAttribute('aria-controls', `${id}`);
	tabLink.setAttribute('aria-selected', selected);
	return tabLink;
}

/**
 * @description Sets attributes for tab content
 * @param {HTMLElement} tabContent TabContent to modify
 * @param {string} id Id base
 * @param {number} index Unique numeric index
 * @return {HTMLElement} Modified tabcontent
 */
function setAttributesTabContent(tabContent, id, index) {
	tabContent.setAttribute('id', `${id}${index}Content`);
	tabContent.setAttribute('role', 'tabpanel');
	tabContent.setAttribute('aria-labelledby', `${id}${index}Tab`);
	return tabContent;
}

/**
 * @description Strinifies JSON or returns the original
 * @param {any} raw Raw content to be stringified
 * @returns {string} Stringified Content
 */
function safeStringify(raw) {
	try {
		return JSON.stringify(raw, null, 4);
	} catch (err) {
		return raw;
	}
}

/**
 * @description Generates new tabs layout for request
 * @param {pbject} request Request Object
 * @param {object} index Nth element for pairing
 * @return {HTMLElement} New layout object
 */
export function makeRequestTabs(request, index) {
	const tabs = createElement('div');
	const tabsHeader = createElement('ul', ['nav', 'nav-tabs', 'pl-3']);
	tabsHeader.setAttribute('role', 'tablist');
	const tabsContent = createElement('div', ['tab-content']);

	const requestHeadersTab = createElement('li', ['nav-item']);
	requestHeadersTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'active', 'py-1', 'px-2'], 'Request Headers'), 'requestHeaders', index, true));
	const requestBodyTab = createElement('li', ['nav-item']);
	requestBodyTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'py-1', 'px-2'], 'Request Body'), 'requestBody', index));
	const responseHeadersTab = createElement('li', ['nav-item']);
	responseHeadersTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'py-1', 'px-2'], 'Response Headers'), 'responseHeaders', index));
	const responseBodyTab = createElement('li', ['nav-item']);
	responseBodyTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'py-1', 'px-2'], 'Response Body'), 'responseBody', index));

	const requestHeadersContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'show', 'active', 'p-1', 'pt-2'], '<dl class="row my-0"></dl>'), 'requestHeaders', index);
	const requestBodyContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'p-3'], '<dl class="row my-0"></dl>'), 'requestBody', index);
	const responseHeadersContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'p-1', 'pt-2'], '<dl class="row my-0"></dl>'), 'responseHeaders', index);
	const responseBodyContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'p-3'], '<dl class="row my-0"></dl>'), 'responseBody', index);

	makeBrick(requestHeadersContent.firstChild, 'URL: ', request.url);
	makeBrick(requestHeadersContent.firstChild, 'Method: ', request.method.toUpperCase());
	makeBrick(requestHeadersContent.firstChild, 'Called at: ', request._engineData ? request._engineData.calledAt : 'Not available');
	makeBrickEditor(requestHeadersContent.firstChild, 'Headers: ', request.headers);
	makeBrickEditor(requestHeadersContent.firstChild, 'Query String: ', request.qs);

	makeBrickEditorFull(requestBodyContent.firstChild, request.body);

	if (request.response !== false) {
		makeBrick(responseHeadersContent.firstChild, 'Status code: ', request.response.status);
		makeBrick(responseHeadersContent.firstChild, 'Completed at: ', request.response._engineData ? request.response._engineData.calledAt : 'Not available');
		makeBrick(responseHeadersContent.firstChild, 'Call duration: ', (request.response._engineData && request._engineData.calledAt) ? `${(0.001 * (request.response._engineData.calledAt - request._engineData.calledAt)).toFixed(3)} s` : 'Not available');
		makeBrickEditor(responseHeadersContent.firstChild, 'Headers: ', request.response.headers);

		// Show additional headers in response body
		[
			{ name: 'content-type', label: 'Content Type: ' },
			{ name: 'content-length', label: 'Content Length: ' },
			{ name: 'content-encoding', label: 'Content Encoding: ' },
			{ name: 'content-md5', label: 'Content MD5: ' }
		].forEach(header => {
			if (request.response.headers && request.response.headers[Object.keys(request.response.headers).find(k => k.toLowerCase() === header.name)]) {
				makeBrick(responseBodyContent.firstChild, header.label, request.response.headers[Object.keys(request.response.headers).find(k => k.toLowerCase() === header.name)]);
			}
		});

		makeBrickEditor(responseBodyContent.firstChild, 'Body: ', request.response.body);
	} else {
		responseBodyContent.classList.remove('p-3');
		responseBodyContent.classList.add('pt-2');
		responseBodyContent.classList.add('p-1');
		makeBrickError(responseHeadersContent.firstChild, 'A response for this request was not received.');
		makeBrickError(responseBodyContent.firstChild, 'A response for this request was not received.');
	}

	tabsHeader.appendChild(requestHeadersTab);
	tabsHeader.appendChild(requestBodyTab);
	tabsHeader.appendChild(responseHeadersTab);
	tabsHeader.appendChild(responseBodyTab);

	tabsContent.appendChild(requestHeadersContent);
	tabsContent.appendChild(requestBodyContent);
	tabsContent.appendChild(responseHeadersContent);
	tabsContent.appendChild(responseBodyContent);

	tabs.appendChild(tabsHeader);
	tabs.appendChild(tabsContent);
	return tabs;
}

/**
 * @description Generates new tabs layout for query
 * @param {pbject} query Query Object
 * @param {object} index Nth element for pairing
 * @return {HTMLElement} New layout object
 */
export function makeQueryTabs(query, index) {
	const tabs = createElement('div');
	const tabsHeader = createElement('ul', ['nav', 'nav-tabs', 'pl-3']);
	tabsHeader.setAttribute('role', 'tablist');
	const tabsContent = createElement('div', ['tab-content']);

	const queryTab = createElement('li', ['nav-item']);
	queryTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'active', 'py-1', 'px-2'], 'Query'), 'query', index, true));
	const resultTab = createElement('li', ['nav-item']);
	resultTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'py-1', 'px-2'], 'Result'), 'result', index));

	const queryContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'show', 'active', 'p-1', 'pt-2'], '<dl class="row my-0"></dl>'), 'query', index);
	const resultContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'p-1', 'pt-2'], '<dl class="row my-0"></dl>'), 'result', index);

	makeBrickEditor(queryContent.firstChild, 'Command: ', query.command);
	if (query.response.input !== undefined) {
		makeBrickEditor(queryContent.firstChild, 'Input: ', safeStringify(query.input));
	}

	if (query.result !== false) {
		makeBrick(resultContent.firstChild, 'Code: ', query.response.code);
		makeBrickEditor(resultContent.firstChild, 'Result: ', safeStringify(query.response.result));
		if (query.response.output !== undefined) {
			makeBrickEditor(resultContent.firstChild, 'Output: ', safeStringify(query.response.output));
		}
	} else {
		makeBrickError(resultContent.firstChild, 'A result for this query was not received.');
	}

	tabsHeader.appendChild(queryTab);
	tabsHeader.appendChild(resultTab);

	tabsContent.appendChild(queryContent);
	tabsContent.appendChild(resultContent);

	tabs.appendChild(tabsHeader);
	tabs.appendChild(tabsContent);
	return tabs;
}

/**
 * @description Generates new tabs layout for response without request
 * @param {pbject} response Response Object
 * @param {object} index Nth element for pairing
 * @return {HTMLElement} New layout object
 */
export function makeResponseTabs(response, index) {
	const tabs = createElement('div');
	const tabsHeader = createElement('ul', ['nav', 'nav-tabs', 'pl-3']);
	tabsHeader.setAttribute('role', 'tablist');
	const tabsContent = createElement('div', ['tab-content']);

	const requestHeadersTab = createElement('li', ['nav-item']);
	requestHeadersTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'active', 'py-1', 'px-2'], 'Request Headers'), 'requestHeaders', index, true));
	const requestBodyTab = createElement('li', ['nav-item']);
	requestBodyTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'py-1', 'px-2'], 'Request Body'), 'requestBody', index));
	const responseHeadersTab = createElement('li', ['nav-item']);
	responseHeadersTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'py-1', 'px-2'], 'Response Headers'), 'responseHeaders', index));
	const responseBodyTab = createElement('li', ['nav-item']);
	responseBodyTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'py-1', 'px-2'], 'Response Body'), 'responseBody', index));

	const requestHeadersContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'show', 'active', 'p-1', 'pt-2'], '<dl class="row my-0"></dl>'), 'requestHeaders', index);
	const requestBodyContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'p-3'], '<dl class="row my-0"></dl>'), 'requestBody', index);
	const responseHeadersContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'p-1', 'pt-2'], '<dl class="row my-0"></dl>'), 'responseHeaders', index);
	const responseBodyContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'p-3'], '<dl class="row my-0"></dl>'), 'responseBody', index);

	requestBodyContent.classList.remove('p-3');
	requestBodyContent.classList.add('pt-2');
	requestBodyContent.classList.add('p-1');
	makeBrickError(requestHeadersContent.firstChild, 'This response has no preceding request loged.');
	makeBrickError(requestBodyContent.firstChild, 'This response has no preceding request loged.');

	makeBrick(responseHeadersContent.firstChild, 'Status code: ', response.status);
	makeBrickEditor(responseHeadersContent.firstChild, 'Headers: ', response.headers);

	makeBrickEditorFull(responseBodyContent.firstChild, response.body);

	tabsHeader.appendChild(requestHeadersTab);
	tabsHeader.appendChild(requestBodyTab);
	tabsHeader.appendChild(responseHeadersTab);
	tabsHeader.appendChild(responseBodyTab);

	tabsContent.appendChild(requestHeadersContent);
	tabsContent.appendChild(requestBodyContent);
	tabsContent.appendChild(responseHeadersContent);
	tabsContent.appendChild(responseBodyContent);

	tabs.appendChild(tabsHeader);
	tabs.appendChild(tabsContent);
	return tabs;
}

/**
 * @description Generates new tabs layout for result
 * @param {pbject} result Result Object
 * @param {object} index Nth element for pairing
 * @return {HTMLElement} New layout object
 */
export function makeResultTabs(result, index) {
	const tabs = createElement('div');
	const tabsHeader = createElement('ul', ['nav', 'nav-tabs', 'pl-3']);
	tabsHeader.setAttribute('role', 'tablist');
	const tabsContent = createElement('div', ['tab-content']);

	const queryTab = createElement('li', ['nav-item']);
	queryTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'active', 'py-1', 'px-2'], 'Query'), 'query', index, true));
	const resultTab = createElement('li', ['nav-item']);
	resultTab.appendChild(setAttributesTabLink(createElement('a',
		['nav-link', 'py-1', 'px-2'], 'Result'), 'result', index));

	const queryContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'show', 'active', 'p-1', 'pt-2'], '<dl class="row my-0"></dl>'), 'query', index);
	const resultContent = setAttributesTabContent(createElement('div',
		['tab-pane', 'p-1', 'pt-2'], '<dl class="row my-0"></dl>'), 'result', index);

	makeBrickError(queryContent.firstChild, 'This result has no preceding query loged.');

	makeBrick(resultContent.firstChild, 'Code: ', result.code);
	makeBrickEditor(resultContent.firstChild, 'Result: ', safeStringify(result.result));
	if (result.output !== undefined) {
		makeBrickEditor(resultContent.firstChild, 'Output: ', safeStringify(result.output));
	}

	tabsHeader.appendChild(queryTab);
	tabsHeader.appendChild(resultTab);

	tabsContent.appendChild(queryContent);
	tabsContent.appendChild(resultContent);

	tabs.appendChild(tabsHeader);
	tabs.appendChild(tabsContent);
	return tabs;
}

/**
 * @description Generates new layout for Message object
 * @param {object} message Message object
 * @return {HTMLElement} New layout object
 */
export function makeMessageTab(message) {
	const singleTab = createElement('div', ['p-3'], '<dl class="row my-0"></dl>');
	makeBrickEditorFull(singleTab.firstChild, message.args);
	return singleTab;
}

/**
 * @description Generates new layout with plain content
 * @param {object} plainContent Plain content, object or string
 * @return {HTMLElement} New layout object
 */
export function makePlainEditorTab(plainContent) {
	const singleTab = createElement('div', ['p-3'], '<dl class="row my-0"></dl>');
	makeBrickEditorFull(singleTab.firstChild, plainContent);
	return singleTab;
}

/**
 * @description Generates new layout for Profile object
 * @param {object} profile Profile object
 * @return {HTMLElement} New layout object
 */
export function makeProfileTab(profile) {
	const singleTab = createElement('div', ['p-1', 'pt-2'], '<dl class="row my-0"></dl>');
	makeBrick(singleTab.firstChild, 'Name: ', profile.name);
	makeBrick(singleTab.firstChild, 'Duration: ', profile.duration);
	return singleTab;
}

/**
 * @description Generates new layout for Error object
 * @param {object} error Error object
 * @return {HTMLElement} New layout object
 */
export function makeErrorTab(error) {
	const singleTab = createElement('div', ['p-1', 'pt-2'], '<dl class="row my-0"></dl>');
	makeBrick(singleTab.firstChild, 'Name: ', error.name);
	makeBrick(singleTab.firstChild, 'Message: ', error.message);
	makeBrick(singleTab.firstChild, 'External:', String(error.external));
	return singleTab;
}

/**
 * @description Refreshes all CodeMirrors
 */
export function refreshMirrors() {
	window.editors.forEach(e => {
		e.refresh();
	});
}

/**
 * @description Generates a new article for the main content
 * @param {string} template Template to set as inner HTML
 * @param {string} id View ID
 * @param {boolean} focused Should be focused
 * @return {HTMLElement} Article
 */
export function makeArticle(template, id, focused = false) {
	const article = createElement('article', ['row', 'mx-0'], template);
	if (!focused) {
		article.classList.add('inactive');
	}
	article.setAttribute('id', `${id}View`);
	return article;
}

/**
 * @description Generates a new control for the main content
 * @param {string} id View ID
 * @param {string} label Label of the entity
 * @param {array} iconClasses Array of icon classes to set the icon
 * @param {boolean} active Should be active
 * @return {HTMLElement} Control
 */
export function makeControl(id, label, iconClasses, active = false) {
	const control = createElement('span',
		['nav-item d-flex'], `<div class="nav-icon"><i class="${iconClasses.join(' ')}"></i></div><div class="d-flex"><p class="my-0">${label}</p></div>`);
	if (active) {
		control.classList.add('active');
	}
	control.setAttribute('id', `${id}Control`);
	return control;
}

/**
 * @description Extracts a numeric module ID from various search result formats
 * @param {any} item A search result item (number, string, or object)
 * @return {number|null} The extracted module ID, or null if none found
 */
function extractModuleId(item) {
	if (typeof item === 'number') return item;
	if (typeof item === 'string') {
		return /^\d+$/.test(item.trim()) ? parseInt(item, 10) : null;
	}
	if (typeof item === 'object' && item !== null) {
		if (typeof item.moduleId === 'number') return item.moduleId;
		if (typeof item.id === 'number') return item.id;
		if (typeof item.module === 'number') return item.module;
	}
	return null;
}

/**
 * @description Formats a search result item as display text
 * @param {any} item A search result item
 * @return {string} Human-readable text
 */
function formatResultItem(item) {
	if (typeof item === 'number') return `Module ${item}`;
	if (typeof item === 'string') return item;
	if (typeof item === 'object' && item !== null) {
		if (item.moduleId !== undefined && item.detail) return `Module ${item.moduleId}: ${item.detail}`;
		if (item.moduleId !== undefined) return `Module ${item.moduleId}`;
		if (item.id !== undefined) return `Module ${item.id}`;
		return JSON.stringify(item);
	}
	return String(item);
}

/**
 * @description Renders a list of search result items with optional Focus buttons
 * @param {HTMLElement} container Container to append the list to
 * @param {array} items Array of result items
 * @param {function} onFocus Callback receiving a module ID when Focus is clicked
 */
function renderResultList(container, items, onFocus) {
	const list = createElement('div', ['list-group', 'tool-result-list']);
	for (const item of items) {
		const moduleId = extractModuleId(item);
		const text = formatResultItem(item);
		const listItem = createElement('div', ['list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'tool-result-item']);
		const textSpan = createElement('span', ['selectable', 'mr-2']);
		textSpan.textContent = text;
		listItem.appendChild(textSpan);
		if (moduleId !== null) {
			const focusBtn = createElement('button', ['btn', 'btn-sm', 'btn-outline-primary', 'tool-result-focus']);
			focusBtn.setAttribute('type', 'button');
			focusBtn.textContent = 'Focus';
			focusBtn.addEventListener('click', () => onFocus(moduleId));
			listItem.appendChild(focusBtn);
		}
		list.appendChild(listItem);
	}
	container.appendChild(list);
}

/**
 * @description Generates an interactive tool response card with focusable search results
 * @param {object} response Response data (array or object with array values)
 * @param {function} onFocus Callback receiving a module ID when Focus is clicked
 * @param {function} done Call when done clicked
 * @param {object} lastActive Last active object storage
 * @return {HTMLElement} Response card
 */
export function makeToolResponseInteractive(response, onFocus, done, lastActive) {
	const card = createElement('div', ['card', 'fullheight']);
	const finishBody = createElement('div', ['d-flex', 'flex-column'], `
		<div class="card">
			<div class="card-body d-flex justify-content-center pb-0">
				<span class="tool-finished"><i class="fa-fw far fa-check-circle"></i></span><p class="ml-2 lead my-auto">Run completed</p>
			</div>
		</div>
	`);
	card.appendChild(finishBody);
	const cardBody = createElement('div', ['row', 'm-0', 'p-0']);
	const cardBodyContent = createElement('dl', ['row', 'col-12', 'm-0', 'p-0', 'pt-3']);
	cardBodyContent.appendChild(createElement('dt', ['col-2', 'font-weight-bold', 'pb-1'], 'Output: '));
	const resultContainer = createElement('dd', ['col-12', 'mb-0', 'px-3']);

	if (Array.isArray(response)) {
		if (response.length === 0) {
			resultContainer.appendChild(createElement('p', ['text-secondary', 'font-italic'], 'No results found.'));
		} else {
			renderResultList(resultContainer, response, onFocus);
		}
	} else if (typeof response === 'object' && response !== null) {
		for (const [sectionName, sectionResults] of Object.entries(response)) {
			const header = createElement('h6', ['font-weight-bold', 'mt-2', 'mb-1']);
			header.textContent = sectionName;
			resultContainer.appendChild(header);
			if (Array.isArray(sectionResults)) {
				if (sectionResults.length === 0) {
					resultContainer.appendChild(createElement('p', ['text-secondary', 'font-italic', 'ml-2', 'mb-2'], 'No results.'));
				} else {
					renderResultList(resultContainer, sectionResults, onFocus);
				}
			} else {
				renderResultList(resultContainer, [sectionResults], onFocus);
			}
		}
	} else {
		const fallback = createElement('p', ['selectable']);
		fallback.textContent = String(response);
		resultContainer.appendChild(fallback);
	}

	cardBodyContent.appendChild(resultContainer);
	const button = createElement('button', ['btn', 'btn-success'], 'Done');
	button.setAttribute('type', 'button');
	button.addEventListener('click', async () => {
		done(lastActive);
	});
	cardBody.appendChild(cardBodyContent);
	const buttonWrapper = createElement('dt', ['col-3', 'pt-2']);
	buttonWrapper.appendChild(button);
	cardBodyContent.appendChild(buttonWrapper);
	card.appendChild(cardBody);
	return card;
}

/**
 * @description Generates a tool response card
 * @param {object} response Reponse
 * @param {function} done Call when done clicked
 * @param {object} lastActive Last active object storage
 * @return {HTMLElement} Response card
 */
export function makeToolResponse(response, done, lastActive) {
	const card = createElement('div', ['card', 'fullheight']);
	const finishBody = createElement('div', ['d-flex', 'flex-column'], `
		<div class="card">
			<div class="card-body d-flex justify-content-center pb-0">
				<span class="tool-finished"><i class="fa-fw far fa-check-circle"></i></span><p class="ml-2 lead my-auto">Run completed</p>
			</div>
		</div>
	`);
	card.appendChild(finishBody);
	const cardBody = createElement('div', ['row', 'm-0', 'p-0']);
	const cardBodyContent = createElement('dl', ['row', 'col-12', 'm-0', 'p-0', 'pt-3']);
	cardBodyContent.appendChild(createElement('dt', ['col-2', 'font-weight-bold', 'pb-1'], 'Output: '));
	makeBrickEditorFull(cardBodyContent, response);
	const button = createElement('button', ['btn', 'btn-success'], 'Done');
	button.setAttribute('type', 'button');
	button.addEventListener('click', async () => {
		done(lastActive);
	});
	cardBody.appendChild(cardBodyContent);
	const buttonWrapper = createElement('dt', ['col-3', 'pt-2']);
	buttonWrapper.appendChild(button);
	cardBodyContent.appendChild(buttonWrapper);
	card.appendChild(cardBody);
	return card;
}

/**
 * @description Makes tool editor
 * @param {string} content Source of tool to edit
 * @return {HTMLElement} Tool editor
 */
export function makeToolEditor(content) {
	const editorWrapper = createElement('dl', ['row', 'col-12', 'm-0', 'p-0', 'pt-3']);
	makeBrickEditorFullEditable(editorWrapper, content, 'tool-edit', true);
	return editorWrapper;
}
