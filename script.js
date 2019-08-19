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

/* mapping tables */

const country_table = {
    "afg": {hrinfo: 82},
    "nga": {hrinfo: 38},
    "moz": {hrinfo: 53}
};
// TODO: To complete country table

const theme_table = {
    // For HRINFO global clusters: https://www.humanitarianresponse.info/api/v1.0/global_clusters/
    // HRINFO Themes: https://www.humanitarianresponse.info/api/v1.0/themes
    // FOR RW: https://api.reliefweb.int/v1/references/themes?appname=vocabulary
    // for HDX tag:   https://data.humdata.org/api/3/action/package_search?facet.field=[%22tags%22]&facet.limit=100&rows=0        
    // and some manual matching

    "etc": {name: "Emergency Telecommunications",
        hrinfo: 5,
        hrinfo_theme: [[-999, "No theme defined in HRINFO"]],
        reliefweb: 4598, // Log and Telco
        // TODO: To refine more for ETC
        hdx_tag: [
            "emergency telecommunications",
            "telecommunication"
        ]
    },
    "fsc": {name: "Food Security",
        hrinfo: 6,
        hrinfo_theme: [
            [548, "Livelihood"], // duplicated with ery
            [62864, "Food/Nutrition Crisis"], // duplicated in fsc and nut
            [546, "Integrated Food Security Phase Classification (IPC)"]
        ],
        reliefweb: 4593, // Food and Nutrition 
        // TODO: To refine more for Food
        hdx_tag: [
            "cash assistance",
            "food security",
            "food",
            "acute food insecurity",
            "food and nutrition"
        ]
    },
    "hea": {name: "Health",
        hrinfo: 7,
        hrinfo_theme: [
            [519, "HIV/AIDS"],
            [76074, "HIV/AIDS"],
            [76075, "Pellagra"],
            [76076, "Cholera"],
            [76077, "Malaria"],
            [76077, "Ebola"]
        ],
        reliefweb: 4595, // TODO: TO include HIV/AIDS RW theme
        hdx_tag: [
            "health facilities",
            "hiv - aids",
            "health",
            "ebola",
            "infectious disease",
            "mortality",
            "malaria",
            "healthcare",
            "tuberculosis",
            "disease",
            "access to health services"
        ]
    },
    "log": {name: "Logistics",
        hrinfo: 8,
        hrinfo_theme: [[-999, "No theme defined in HRINFO"]],
        reliefweb: 4598, // Log and Telco
        // TODO: To refine more for ETC
        hdx_tag: [
            "mining",
            "transportation",
            "roads",
            "rivers",
            "hydrologie",
            "hydrology"
        ]
    },
    "nut": {name: "Nutrition",
        hrinfo: 9,
        hrinfo_theme: [
            [555, "Community Management of Acute Malnutrition"],
            [556, "Severe Acute Malnutrition Management"],
            [557, "Targeted Supplementary Feeding Programmes"],
            [558, "Blanket Supplementary Feeding Programmes"],
            [559, "Infant and Young Child Feeding"],
            [560, "Micronutrient Programmes"],
            [558, "Blanket Supplementary Feeding Programmes"],
            [62864, "Food/Nutrition Crisis"] // duplicated in fsc and nut
        ],
        reliefweb: 4593, // Food and Nutrition 
        // TODO: To refine more for Nutrition
        hdx_tag: [
            "nutrition",
            "acute malnutrition",
            "child nutrition",
            "chronique malnutrition",
            "desnutricion",
            "desnutrición aguda",
            "desnutrición crónica",
            "food and nutrition"
        ]
    },
    "pro": {name: "Protection",
        hrinfo: 10,
        hrinfo_theme: [
            [534, "Human Rights and IHL"],
            [523, "Mental Health / Psycho Social Support"],
            [539, "ProCap"],
            [63167, "Protection from Sexual Exploitation and Abuse (PSEA)"],
            [65081, "Child Protection"],
            [525, "Refugees and Returnees"],
            [522, "Internally Displaced People (IDPs)"]
        ],
        reliefweb: 4600,
        hdx_tag: [
            "migration",
            "human rights",
            "children",
            "mental health",
            "police",
            "child labour",
            "refugees",
            "gender",
            "military",
            "child protection",
            "protection"
        ]
    },
    "shl": {name: "Emergency Shelter and NFI",
        hrinfo: 4,
        hrinfo_theme: [[-999, "No theme defined in HRINFO"]],
        reliefweb: 4603,
        hdx_tag: [
            "shelter",
            "resettlement",
            "emergency shelter"
        ]
    },
    "wsh": {name: "Water, Sanitation and Hygiene",
        hrinfo: 11,
        hrinfo_theme: [[-999, "No theme defined in HRINFO"]],
        reliefweb: 4604,
        hdx_tag: [
            "wash",
            "ipc and wash",
            "hand washing",
            "solid waste",
            "hand washing",
            "access to water",
            "access to safewater",
            "access to improved water sources",
            "hygiene",
            "sanitation",
            "improved sanitation facilities",
            "waterbodies"

        ]
    },
    "ccm": {name: "Camp Coordination and Camp Management",
        hrinfo: 1,
        hrinfo_theme: [[-999, "No theme defined in HRINFO"]],
        reliefweb: 4603, // Shelter
        // TODO: To refine for CCCM
        hdx_tag: [
            "displaced persons locations - camps - shelters",
            "camp",
            "camp coordination and camp management",
            "camp coordination and management",
            "iom",
            "dtm"
        ]
    },
    "ery": {name: "Early Recovery",
        hrinfo: 2,
        hrinfo_theme: [
            [548, "Livelihood"], // duplicated with fsc
            [533, "Early Recovery"]
        ],
        reliefweb: 4601,
        hdx_tag: [
            "early recovery",
            "reconstruction",
            "recovery",
            "undp"
        ]
    },
    "edu": {name: "Education",
        hrinfo: 3,
        hrinfo_theme: [[-999, "No theme defined in HRINFO"]],
        reliefweb: 4592,
        hdx_tag: [
            "education",
            "education facilities"
        ]
    },
    "min": {name: "Mine Action",
        hrinfo: 5406,
        hrinfo_theme: [
            [524, "Mine Action"]
        ],
        reliefweb: 12033,
        hdx_tag: [
            "mine action",
            "landmines",
            "mine",
        ]
    },
    "coo": {name: "Coordination",
        hrinfo: "999", // NONE in HRINFO
        hrinfo_theme: [
            [510, "Civil-Military Coordination"],
            [511, "Communication with affected populations"],
            [515, "Field coordination"],
            [521, "Information Management"],
            [544, "Accountability to Affected Populations"],
            [532, "Contingency Planning"],
            [551, "Governance"],
            [535, "Humanitarian Access"],
            [530, "Inter-Cluster Coordination"],
            [552, "Monitoring and Evaluation"],
            [550, "Needs Assessment"],
            [553, "Regional Coordination"],
            [554, "Communicating with Communities"],
            [561, "Cash Transfer Programming"],
            [562, "Market Assessment"],
            [1018, "Multi-Cluster Initial Rapid Assessment"],
            [1021, "Humanitarian Profile"],
            [49542, "Resource Mobilisation"],
            [53115, "Rapid Response Mechanism"],
            [62065, "Humanitarian Country Team"],
            [70684, "Central Emergency Response Fund"]
        ],
        reliefweb: 4590,
        hdx_tag: [
            "aid funding",
            "socioeconomics",
            "demographics",
            "activities - projects",
            "casualties",
            "security incidents",
            "humanitarian access",
            "humanitarian access",
            "millennium development goals - mdg",
            "community perceptions and feedback",
            "3w",
            "4w",
            "5w",
            "coordination",
            "ocha"
        ]
    }
};
/* API QUERY BUILDERS */

class query_builder
{
    constructor(country_iso3, theme) {
        this.country_iso3 = null;
        if (country_iso3)
            this.country_iso3 = country_iso3.toLowerCase();
        this.theme = null;
        if (theme)
            this.theme = theme.toLowerCase();
        this.hrinfo_events_url = this.createHRinfoEventsQuery();
        this.hdx_datasets_url = this.createHDXDatasetQuery();
        this.reliefweb_allreports_url = this.createRWGenericReportsQuery();
        this.reliefweb_sitreps_url = this.createRWGenericReportsQuery(10);
    }

    createHRinfoEventsQuery() {
// TODO: Get the first events in the future from today
// TODO: Filter by global cluster - theme , with another conversion table
        var api_parameters = {};
        api_parameters.base_url = "https://www.humanitarianresponse.info/api/v1.0/";
        api_parameters.endpoint = "events";
        api_parameters.limit = config.number_items;
        api_parameters.filter = "";
        if (this.country_iso3)
            api_parameters.filter += "filter[operation]=" + country_table[this.country_iso3].hrinfo + "&";
        // theme filter
        // by global cluster
        /*
         if (this.theme)
         api_parameters.filter += "filter[global_clusters]=" + theme_table[this.theme].hrinfo + "&";
         */
        // by theme
        if (this.theme)
        {
            var theme_array = theme_table[this.theme].hrinfo_theme;
            theme_array.forEach(theme => {
                api_parameters.filter += "filter[themes]=" + theme[0] + "&";
            }
            );
        }

        // date filter
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        api_parameters.filter += "filter[date][value][0]=" + today + '&filter[date][operator][0]=">="&';
        var url = api_parameters.base_url + api_parameters.endpoint +
                "?" + api_parameters.filter +
                "range=" + api_parameters.limit + "&" +
                "sort=date";
        return url;
    }

    createHDXDatasetQuery() {
        // SAMPLE: https://data.humdata.org/api/3/action/package_search?q=+tags:(food security OR hxl)%20AND%20+groups:nga&rows=3   
        var api_parameters = {};
        api_parameters.base_url = "https://data.humdata.org/api/3/";
        api_parameters.endpoint = "action/package_search";
        api_parameters.limit = config.number_items;
        api_parameters.filter = "";

        var country_filter = "";
        var theme_filter = "";

        if (this.country_iso3)
            country_filter = "+groups:" + this.country_iso3;

        if (this.theme) {
            theme_filter = "+tags:(";
            var theme_array = theme_table[this.theme].hdx_tag;
            console.log(theme_table);
            for (var i = 0; i < theme_array.length; i++) {
                theme_filter += "\"" + theme_array[i] + "\"";
                if (i < theme_array.length - 1)
                    theme_filter += " OR ";
            }
            if (i === 0)
                theme_filter += "no_values_for_HDX_tags_for_that_theme";
            theme_filter += ")";
        }
        console.log(this.country_iso3);
        console.log(this.theme);


        if ((this.country_iso3) && (!this.theme))
            api_parameters.filter = "q=" + country_filter;
        if ((this.theme) && (!this.country_iso3))
            api_parameters.filter = "q=" + theme_filter;
        if ((this.theme) && (this.country_iso3))
            api_parameters.filter = "q=" + country_filter + "%20AND" + theme_filter;

        var url = api_parameters.base_url + api_parameters.endpoint +
                "?" + api_parameters.filter + "&" +
                "rows=" + api_parameters.limit;
        console.log(url);

        return url;
    }

    createRWGenericReportsQuery(format) {
        var api_parameters = {};
        api_parameters.base_url = "https://api.reliefweb.int/v1/";
        api_parameters.endpoint = "reports";
        api_parameters.appname = "api-agg-demo";
        api_parameters.limit = config.number_items;
        api_parameters.include = "fields[include][]=body&fields[include][]=date.created&fields[include][]=source&fields[include][]=file&fields[include][]=url_alias";
        /* Build the filters */
        api_parameters.country_iso3 = this.country_iso3;
        if (this.theme)
            api_parameters.theme = theme_table[this.theme].reliefweb;
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
        var url = api_parameters.base_url + api_parameters.endpoint +
                "?appname=" + api_parameters.appname +
                "&" + api_parameters.include +
                "&limit=" + api_parameters.limit +
                api_parameters.filter;
        return url;
    }
}

/* MAIN REFRESH METHOD */

function refresh_page(element_clicked) {

    if (element_clicked)
        theme = element_clicked.id;
    else
        theme = null;
    var country_iso3 = getUrlVars()["country"];
    query_object = new query_builder(country_iso3, theme /*theme*/);
    call_url = query_object.reliefweb_allreports_url;
    const element_all_reports = "latest-reports";
    const element_all_reports_more = "latest-reports-link";
    sendRequest(call_url, "All Reports", element_all_reports, element_all_reports_more, plotRWReports);
    /** SITUATION REPORTS **/

    call_url = query_object.reliefweb_sitreps_url;
    const element_sitreps = "latest-sitreps";
    const element_sitreps_more = "latest-sitreps-link";
    sendRequest(call_url, "All Situation Reports", element_sitreps, element_sitreps_more, plotRWReports);
    /** HDX Datasets **/

    call_url = query_object.hdx_datasets_url;
    const element_datasets = "hdx-datasets";
    const element_datasets_more = "hdx-datasets-link";
    sendRequest(call_url, "Latests HDX Datasets", element_datasets, element_datasets_more, plotHDXDatasets);
    /** HRinfo reports **/

    call_url = query_object.hrinfo_events_url;
    const element_events = "hrinfo-events";
    const element_events_more = "hrinfo-events-link";
    sendRequest(call_url, "Next HRinfo events", element_events, element_events_more, plotHRinfoEvents);
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
        // TODO: only getting the first resource to offer a link to something

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
        link.setAttribute('href', this.link);
        // only getting the first field to offer a link to something

        const card = document.createElement('figure');
        card.setAttribute('class', 'standard');
        const h1 = document.createElement('figcaption');
        h1.textContent = this.title;
        const image = document.createElement('img');
        // TODO: To include images for reports
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
        card.appendChild(h1);
        //card.appendChild(div)
        card.appendChild(image);
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
