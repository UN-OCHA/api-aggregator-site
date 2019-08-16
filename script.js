/*
 * TODO: Put theme in the URL
 * TODO: Cluster menu created automatically based on RW taxonomy
 * Get blocks for : Headlines, HRinfo events, HPC data, HDX datasets, FTS funding by sector, key figures, DSR, HPC?? 
 * Show title of the page -- Country + Sector -- Create breadcrumb
 * show images for reports
 */

/*Aux function*/
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
function  createRWReportsQuery(country_iso3, theme, format) {
    var api_parameters = {};

    api_parameters.base_url = "https://api.reliefweb.int/v1/";
    api_parameters.endpoint = "reports";
    api_parameters.appname = "api-agg-demo";
    api_parameters.limit = 3;
    api_parameters.include = "fields[include][]=body&fields[include][]=date.created&fields[include][]=source&fields[include][]=file&fields[include][]=url_alias";

    /* Build the filters */
    api_parameters.country_iso3 = country_iso3;
    api_parameters.theme = theme;
    api_parameters.format = format;
    api_parameters.filter = null;
    if (api_parameters.country_iso3)
        api_parameters.filter = "primary_country.iso3%3A" + api_parameters.country_iso3;
    if (api_parameters.theme)
        if (api_parameters.filter)
            api_parameters.filter = api_parameters.filter + "%20AND%20" + "theme.id%3A" + api_parameters.theme;
        else
            api_parameter.filter = "theme.id%3A" + api_parameters.theme;
    if (api_parameters.format)
        if (api_parameters.filter)
            api_parameters.filter = api_parameters.filter + "%20AND%20" + "format.id%3A(" + api_parameters.format + ")";
        else
            api_parameter.filter = "format.id%3A(" + api_parameters.format + ")";
    if (api_parameters.filter)
        api_parameters.filter = "&query[value]=" + api_parameters.filter + "&query[operator]=AND";
    else
        api_parameters.filter = "";
    

    url = api_parameters.base_url + api_parameters.endpoint +
            "?appname=" + api_parameters.appname +
            "&" + api_parameters.include +
            "&limit=" + api_parameters.limit +
            api_parameters.filter;
    console.log(url);
    return url;
}

function refresh_page(element_clicked) {

    if (element_clicked)
        theme = element_clicked.id;
    else
        theme = null;

    call_url = createRWReportsQuery(getUrlVars()["country"], theme /*theme*/, null /*format*/);

    const element_all_reports = "latest-reports";
    const element_link_all_reports = "latest-reports-link";

    sendRequest(call_url, "All Reports", element_all_reports, element_link_all_reports, plotData);

    /** SITUATION REPORTS **/

    call_url = createRWReportsQuery(getUrlVars()["country"], theme /*theme*/, 10 /*format*/);

    const element_sitreps = "latest-sitreps";
    const element_link_sitreps = "latest-sitreps-link";

    sendRequest(call_url, "All Situation Reports", element_sitreps, element_link_sitreps, plotData);
}


function sendRequest(api_url, title, element, element_link, callback) {

    var request = new XMLHttpRequest();
    request.open('GET', api_url, true);
    var data = {};

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(this.response);
            data = data.data;
        }
        callback(data, api_url, title, element, element_link);
    };
    request.send();

}

function plotData(data, api_url, title, element, element_link) {

    display_area = document.getElementById(element);

    // clean display area
    while (display_area.firstChild)
        display_area.removeChild(display_area.firstChild);


    const h3 = document.createElement('h3');
    h3.innerText = title;
    display_area.appendChild(h3);

    data.forEach(report => {
        const link = document.createElement('a');
        link.setAttribute('href', report.fields.url_alias);

        const card = document.createElement('figure');
        card.setAttribute('class', 'standard');

        const h1 = document.createElement('figcaption');
        h1.textContent = report.fields.title;

        const div = document.createElement('div');
        const p = document.createElement('p');

        if (report.fields.body) {
            report.description = report.fields.body.substring(0, 300);
            p.textContent = `${report.description}...`;
        }

        report.date = report.fields.date.created;
        report.source = report.fields.source[0].shortname;
        // TODO: only first source

        const footer = document.createElement('footer');
        const time = document.createElement('time');
        const source = document.createElement('cite');
        const source_span = document.createElement('span');

        time.textContent = report.date;
        source_span.textContent = report.source;

        const image = document.createElement('image');
        if (report.fields.file)
            image.setAttribute("src", report.fields.file[0].preview["url-thumb"]);


        display_area.appendChild(link);
        // link.appendChild (image)
        link.appendChild(card);
        card.appendChild(h1);
        //card.appendChild(div)
        div.appendChild(p);
        card.appendChild(footer);
        footer.appendChild(time);
        footer.appendChild(source);
        source.appendChild(source_span);
    }
    );

    reports_more = document.createElement('a');
    reports_more.setAttribute('href', api_url);
    reports_more.innerText = "View More";

    display_area.appendChild(reports_more);

}

refresh_page();

