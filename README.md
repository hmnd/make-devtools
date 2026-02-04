# Make DevTool+

A fork of the official [Make DevTool extension by Celonis s.r.o](https://chromewebstore.google.com/detail/make-devtool/ainnemkhpnjgkhcdkfbhmlenkhehmfhi), with quality of life improvements.

# Changes from the official extension

## Find module(s) by filter

A new Tool, allowing you to search for module filter conditions containing a value.

There is an additional Search Scenario tool which provides a combined output of both the _Find module(s) by mapping_ and _Find module(s) by filter tools_.

## Focus _Find module(s)_ results

Instead of the previously cumbersome raw JSON output, _Make DevTool+_ provides _Focus_ buttons next to each module result, allowing you to quickly focus the relevant modules without losing your search results.

## Branding

### Colors and logo

All bundled assets are stored in `/src/static/*`.

Color scheme is controled by Bootstrap.
If a change of the color scheme is needed, the file `/src/static/css/bootstrap4.min.css` has to be updated.

Logo is stored in `src/static/img/logo-light.svg`.
You can change the displayed logo by replacing this file.

### Font Awesome

Because of the license, the FontAwesome **can't be embedded into the DevTool** and it has to be loaded directly from the **Instance**.
You can change the source of FontAwesome in `src/html/index.html` file in the link in the `<head>` section.
Also you might need to change the `content_security_policy` string in the `mainfest.json` file to allow loading FA from a custom target.
