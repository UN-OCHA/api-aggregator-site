/*
 * TODO: Put theme in the URL
 * TODO: Cluster menu created automatically based on RW taxonomy
 * Get blocks for : Headlines, HRinfo events, HPC data, HDX datasets, FTS funding by sector, key figures, DSR, HPC?? , RW Figures, CBPF API
 * Show title of the page -- Country + Sector -- Create breadcrumb
 * show images for reports
 * TODO : LINKS BROKEN // IMAGE BROKEN
 * 
 */
var config = {};
config.number_items = 3;

/*Aux function*/
function getUrlVars() {
    var vars = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

/* API QUERY BUILDERS */

function createHRinfoEventsQuery(country_iso3) {
// TODO: Get the first events in the future from today
// TODO: Filter by global cluster - theme , with another conversion table
    var country_table =
            {"afg": {hrinfo: 82},
                "nga": {hrinfo: 38},
                "moz": {hrinfo: 53}};
    var api_parameters = {};
    api_parameters.base_url = "https://www.humanitarianresponse.info/api/v1.0/";
    api_parameters.endpoint = "events";
    api_parameters.limit = config.number_items;

    if (country_iso3)
        api_parameters.filter = "filter[operation]=" + country_table[country_iso3].hrinfo + "&";
    else
        api_parameters.filter = "";
    url = api_parameters.base_url + api_parameters.endpoint +
            "?" + api_parameters.filter +
            "range=" + api_parameters.limit +
            "sort=-date";
    return url;
}


function createHDXDatasetQuery(country_iso3) {
    var api_parameters = {};
    api_parameters.base_url = "https://data.humdata.org/api/3/";
    api_parameters.endpoint = "action/package_search";
    api_parameters.limit = config.number_items;

    if (country_iso3)
        api_parameters.filter = "fq=groups:" + country_iso3 + "&";
    else
        api_parameters.filter = "";
    url = api_parameters.base_url + api_parameters.endpoint +
            "?" + api_parameters.filter +
            "rows=" + api_parameters.limit;
    return url;
}

function createRWReportsQuery(country_iso3, theme, format) {
    var api_parameters = {};
    api_parameters.base_url = "https://api.reliefweb.int/v1/";
    api_parameters.endpoint = "reports";
    api_parameters.appname = "api-agg-demo";
    api_parameters.limit = config.number_items;
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
            api_parameters.filter = "theme.id%3A" + api_parameters.theme;
    if (api_parameters.format)
        if (api_parameters.filter)
            api_parameters.filter = api_parameters.filter + "%20AND%20" + "format.id%3A(" + api_parameters.format + ")";
        else
            api_parameters.filter = "format.id%3A(" + api_parameters.format + ")";
    if (api_parameters.filter)
        api_parameters.filter = "&query[value]=" + api_parameters.filter + "&query[operator]=AND";
    else
        api_parameters.filter = "";
    url = api_parameters.base_url + api_parameters.endpoint +
            "?appname=" + api_parameters.appname +
            "&" + api_parameters.include +
            "&limit=" + api_parameters.limit +
            api_parameters.filter;
    return url;
}

/* MAIN REFRESH METHOD */

function refresh_page(element_clicked) {

    if (element_clicked)
        theme = element_clicked.id;
    else
        theme = null;
    call_url = createRWReportsQuery(getUrlVars()["country"], theme /*theme*/, null /*format*/);
    const element_all_reports = "latest-reports";
    const element_all_reports_more = "latest-reports-link";
    sendRequest(call_url, "All Reports", element_all_reports, element_all_reports_more, plotRWReports);
    /** SITUATION REPORTS **/

    call_url = createRWReportsQuery(getUrlVars()["country"], theme /*theme*/, 10 /*format*/);
    const element_sitreps = "latest-sitreps";
    const element_sitreps_more = "latest-sitreps-link";
    sendRequest(call_url, "All Situation Reports", element_sitreps, element_sitreps_more, plotRWReports);
    /** HDX Datasets **/

    call_url = createHDXDatasetQuery(getUrlVars()["country"]);
    const element_datasets = "hdx-datasets";
    const element_datasets_more = "hdx-datasets-link";
    sendRequest(call_url, "Latests HDX Datasets", element_datasets, element_datasets_more, plotHDXDatasets);
    /** HRinfo reports **/

    call_url = createHRinfoEventsQuery(getUrlVars()["country"]);
    const element_events = "hrinfo-events";
    const element_events_more = "hrinfo-events-link";
    sendRequest(call_url, "Latests HRinfo events", element_events, element_events_more, plotHRinfoEvents);
}

/* API CALLS */

function sendRequest(api_url, title, element, element_link, callback) {

    var request = new XMLHttpRequest();
    request.open('GET', api_url, true);
    var data = {};
    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(this.response);
        }
        callback(data, api_url, title, element, element_link);
    };
    request.send();
}

/* DISPLAYING THE DATA */

function plotHeader(element, title) {
    display_area = document.getElementById(element);
    // clean display area
    while (display_area.firstChild)
        display_area.removeChild(display_area.firstChild);
    const h3 = document.createElement('h3');
    h3.innerText = title;
    display_area.appendChild(h3);
}

function plotFooter(element, link) {
    display_area = document.getElementById(element);
    reports_more = document.createElement('a');
    reports_more.setAttribute('href', link);
    reports_more.innerText = "View More";
    display_area.appendChild(reports_more);
}

class plotable_object
{
    constructor() {
        this.title = "";
        this.description = "";
        this.short_description = "";
        this.date = "";
        this.url = "";
        this.source = "";
    }

    normalize_hrinfo_event(event) {
        console.log(event);
        this.title = event.label;
        if (event["body-html"]) {
            this.description = event["body-html"];
            this.short_description = event["body-html"].substring(0, 300);
            this.short_description = `${this.short_description}...`;
        }

        this.date = event.date[0].value + " - " + event.date[0].value2;
        // TODO: Only first date of the event

        if (event.organizations[0])
            this.source = event.organizations[0].label;
        else
            this.source = "";
        this.link = event.url;
    }

    normalize_reliefweb_report(report) {
        this.link = report.fields.url_alias;
        this.title = report.fields.title;

        if (report.fields.body) {
            this.description = report.fields.body;
            this.short_description = report.fields.body.substring(0, 300);
            this.short_description = `${this.short_description}...`;
        }

        this.date = report.fields.date.created;
        this.source = report.fields.source[0].shortname;
        // TODO: only first source
        if (report.fields.file)
            this.image = report.fields.file[0].preview["url-thumb"];      
    }

    normalize_hdx_dataset(dataset)
    {
        this.link = dataset.resources[0].url;
        // only getting the first field to offer a link to something

        this.title = dataset.title;
        if (dataset.notes) {
            this.description = dataset.notes;
            this.short_description = dataset.notes.substring(0, 300);
            this.short_description = `${this.short_description}...`;
        }

        this.date = dataset.dataset_date;
        this.source = dataset.organization.name;
        // TODO: only first source

    }

    plot(element) {
        var area = document.getElementById(element);
        const link = document.createElement('a');
        link.setAttribute('href', event.url);
        // only getting the first field to offer a link to something

        const card = document.createElement('figure');
        card.setAttribute('class', 'standard');
        const h1 = document.createElement('figcaption');
        h1.textContent = this.title;

        const image = document.createElement('image');
        console.log(this.image);
        image.setAttribute('src', this.image);

        const div = document.createElement('div');
        const p = document.createElement('p');
        const footer = document.createElement('footer');
        const time = document.createElement('time');
        const source = document.createElement('cite');
        const source_span = document.createElement('span');
        time.textContent = this.date;
        source_span.textContent = this.source;
        area.appendChild(link);
        link.appendChild(card);
        card.appendChild(image);

        card.appendChild(h1);
        //card.appendChild(div)
        div.appendChild(p);
        card.appendChild(footer);
        footer.appendChild(time);
        footer.appendChild(source);
        source.appendChild(source_span);
    }
}


function plotHRinfoEvents(data, api_url, title, element) {
    plotHeader(element, title);
    data = data.data;
    data.forEach(event => {
        plot_event = new plotable_object();
        plot_event.normalize_hrinfo_event(event);
        plot_event.plot(element);
    }
    );
    plotFooter(element, api_url);
}

function plotHDXDatasets(data, api_url, title, element) {
    plotHeader(element, title);
    data = data.result.results;
    data.forEach(dataset => {
        plot_dataset = new plotable_object();
        plot_dataset.normalize_hdx_dataset(dataset);
        plot_dataset.plot(element);
    }
    );
    plotFooter(element, api_url);
}

function plotRWReports(data, api_url, title, element) {

    plotHeader(element, title);
    data = data.data;
    data.forEach(report => {
        plot_report = new plotable_object();
        plot_report.normalize_reliefweb_report(report);
        plot_report.plot(element);
    }
    );

    plotFooter(element, api_url);
}

/* MAIN CALL */

refresh_page();
