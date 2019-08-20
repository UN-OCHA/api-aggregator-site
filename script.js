/*
 * TODO: Put theme in the URL
 * TODO: Cluster menu created automatically based on RW taxonomy
 * Get blocks for : Headlines, HRinfo events, HPC data, HDX datasets, FTS funding by sector, key figures, DSR, HPC?? , RW Figures, CBPF API
 * Create breadcrumb
 * 
 */
var config = {};
config.number_items = 3;
var theme = null;
var country_iso3 = null;
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
    // TODO: To fix HRINFO ID
//    abw: {hrinfo_id: "193", fullname: "Aruba", shortname: "Aruba"},
    afg: {hrinfo_id: "82", fullname: "Afghanistan", shortname: "Afghanistan"}, // right HRINFO
//    ago: {hrinfo_id: "187", fullname: "Angola", shortname: "Angola"},
//    aia: {hrinfo_id: "188", fullname: "Anguilla", shortname: "Anguilla"},
    //  ala: {hrinfo_id: "182", fullname: "Åland Islands", shortname: "Aland Islands"},
    // alb: {hrinfo_id: "183", fullname: "Albania", shortname: "Albania"},
    //and: {hrinfo_id: "186", fullname: "Andorra", shortname: "Andorra"},
    //are: {hrinfo_id: "415", fullname: "United Arab Emirates", shortname: "United Arab Emirates"},
    //arg: {hrinfo_id: "191", fullname: "Argentina", shortname: "Argentina"},
    //arm: {hrinfo_id: "192", fullname: "Armenia", shortname: "Armenia"},
    //  asm: {hrinfo_id: "185", fullname: "American Samoa", shortname: "American Samoa"},
    //  ata: {hrinfo_id: "189", fullname: "Antarctica", shortname: "Antarctica"},
    //  atf: {hrinfo_id: "259", fullname: "French Southern and Antarctic Territories", shortname: "French Southern Territories"},
    //  atg: {hrinfo_id: "190", fullname: "Antigua and Barbuda", shortname: "Antigua and Barbuda"},
    //  aus: {hrinfo_id: "194", fullname: "Australia", shortname: "Australia"},
    //  aut: {hrinfo_id: "195", fullname: "Austria", shortname: "Austria"},
    //  aze: {hrinfo_id: "196", fullname: "Azerbaijan", shortname: "Azerbaijan"},
    bdi: {hrinfo_id: "62", fullname: "Burundi", shortname: "Burundi"},
    //  bel: {hrinfo_id: "202", fullname: "Belgium", shortname: "Belgium"},
    //  ben: {hrinfo_id: "204", fullname: "Benin", shortname: "Benin"},
    //  bes: {hrinfo_id: "209", fullname: "Bonaire, Sint Eustatius and Saba", shortname: "Bosnia and Herzegovina"},
    bfa: {hrinfo_id: "27", fullname: "Burkina Faso", shortname: "Burkina Faso"},
    bgd: {hrinfo_id: "2784", fullname: "Bangladesh", shortname: "Bangladesh"},
    //  bgr: {hrinfo_id: "215", fullname: "Bulgaria", shortname: "Bulgaria"},
    // bhr: {hrinfo_id: "198", fullname: "Bahrain", shortname: "Bahrain"},
    //bhs: {hrinfo_id: "197", fullname: "Bahamas", shortname: "Bahamas"},
    // bih: {hrinfo_id: "208", fullname: "Bosnia and Herzegovina", shortname: "Bonaire, Saint Eustatius and Saba"},
    // blm: {hrinfo_id: "366", fullname: "Saint Barthélemy", shortname: "St. Barths"},
//    blr: {hrinfo_id: "201", fullname: "Belarus", shortname: "Belarus"},
//    blz: {hrinfo_id: "203", fullname: "Belize", shortname: "Belize"},
//    bmu: {hrinfo_id: "205", fullname: "Bermuda", shortname: "Bermuda"},
//    bol: {hrinfo_id: "207", fullname: "Bolivia (Plurinational State of)", shortname: "Bolivia"},
//    bra: {hrinfo_id: "212", fullname: "Brazil", shortname: "Brazil"},
    //brb: {hrinfo_id: "200", fullname: "Barbados", shortname: "Barbados"},
    //brn: {hrinfo_id: "214", fullname: "Brunei Darussalam", shortname: "Brunei Darussalam"},
//    btn: {hrinfo_id: "206", fullname: "Bhutan", shortname: "Bhutan"},
//    bvt: {hrinfo_id: "211", fullname: "Bouvet Island", shortname: "Bouvet Island"},
    //bwa: {hrinfo_id: "210", fullname: "Botswana", shortname: "Botswana"},
    caf: {hrinfo_id: "39", fullname: "Central African Republic", shortname: "Central African Republic"},
//    can: {hrinfo_id: "220", fullname: "Canada", shortname: "Canada"},
//    cck: {hrinfo_id: "228", fullname: "Cocos (Keeling) Islands", shortname: "Cocos (Keeling) Islands"},
  //  che: {hrinfo_id: "397", fullname: "Switzerland", shortname: "Switzerland"},
//    chl: {hrinfo_id: "225", fullname: "Chile", shortname: "Channel Islands"},
//    chn: {hrinfo_id: "226", fullname: "China", shortname: "Chile"},
    //civ: {hrinfo_id: "235", fullname: "Côte d'Ivoire", shortname: "Cote d'Ivoire"},
    cmr: {hrinfo_id: "28", fullname: "Cameroon", shortname: "Cameroon"},
    cod: {hrinfo_id: "40", fullname: "Democratic Republic of the Congo", shortname: "DR Congo"},
//    cog: {hrinfo_id: "231", fullname: "Congo", shortname: "Congo Republic"},
    //cok: {hrinfo_id: "233", fullname: "Cook Islands", shortname: "Cook Islands"},
    col: {hrinfo_id: "77", fullname: "Colombia", shortname: "Colombia"},
    //com: {hrinfo_id: "230", fullname: "Comoros", shortname: "Comoros"},
//    cpv: {hrinfo_id: "221", fullname: "Cabo Verde", shortname: "Cabo Verde"},
//    cri: {hrinfo_id: "234", fullname: "Costa Rica", shortname: "Costa Rica"},
    //cub: {hrinfo_id: "237", fullname: "Cuba", shortname: "Cuba"},
    //cuw: {hrinfo_id: "238", fullname: "Curaçao", shortname: "Curacao"},
    //cxr: {hrinfo_id: "227", fullname: "Christmas Island", shortname: "Christmas Island"},
    //cym: {hrinfo_id: "222", fullname: "Cayman Islands", shortname: "Cayman Islands"},
    //cyp: {hrinfo_id: "239", fullname: "Cyprus", shortname: "Cyprus"},
    //cze: {hrinfo_id: "240", fullname: "Czechia", shortname: "Czech Republic"},
    //deu: {hrinfo_id: "263", fullname: "Germany", shortname: "Germany"},
    //dji: {hrinfo_id: "242", fullname: "Djibouti", shortname: "Djibouti"},
//    dma: {hrinfo_id: "243", fullname: "Dominica", shortname: "Dominica"},
//    dnk: {hrinfo_id: "241", fullname: "Denmark", shortname: "Denmark"},
//    dom: {hrinfo_id: "244", fullname: "Dominican Republic", shortname: "Dominican Republic"},
//    dza: {hrinfo_id: "184", fullname: "Algeria", shortname: "Algeria"},
//    ecu: {hrinfo_id: "245", fullname: "Ecuador", shortname: "Ecuador"},
//    egy: {hrinfo_id: "246", fullname: "Egypt", shortname: "Egypt"},
    eri: {hrinfo_id: "64", fullname: "Eritrea", shortname: "Eritrea"},
//    esh: {hrinfo_id: "427", fullname: "Western Sahara", shortname: "Western Sahara"},
//    esp: {hrinfo_id: "389", fullname: "Spain", shortname: "Spain"},
//    est: {hrinfo_id: "250", fullname: "Estonia", shortname: "Estonia"},
    eth: {hrinfo_id: "251", fullname: "Ethiopia", shortname: "Ethiopia"},
//    fin: {hrinfo_id: "65", fullname: "Finland", shortname: "Finland"},
//    fji: {hrinfo_id: "254", fullname: "Fiji", shortname: "Fiji"},
//    flk: {hrinfo_id: "252", fullname: "Falkland Islands (Malvinas)", shortname: "Falkland Islands"},
//    fra: {hrinfo_id: "256", fullname: "France", shortname: "France"},
//    fro: {hrinfo_id: "253", fullname: "Faroe Islands", shortname: "Faeroe Islands"},
//    fsm: {hrinfo_id: "325", fullname: "Micronesia (Federated States of)", shortname: "Micronesia, Fed. Sts."},
//    gab: {hrinfo_id: "260", fullname: "Gabon", shortname: "Gabon"},
//    gbr: {hrinfo_id: "416", fullname: "United Kingdom of Great Britain and Northern Ireland", shortname: "United Kingdom"},
//    geo: {hrinfo_id: "262", fullname: "Georgia", shortname: "Georgia"},
//    ggy: {hrinfo_id: "272", fullname: "Guernsey", shortname: "Guernsey"},
//    gha: {hrinfo_id: "264", fullname: "Ghana", shortname: "Ghana"},
//    gib: {hrinfo_id: "265", fullname: "Gibraltar", shortname: "Gibraltar"},
//    gin: {hrinfo_id: "273", fullname: "Guinea", shortname: "Guinea"},
//    glp: {hrinfo_id: "269", fullname: "Guadeloupe", shortname: "Guadeloupe"},
//    gmb: {hrinfo_id: "261", fullname: "Gambia", shortname: "Gambia"},
//    gnb: {hrinfo_id: "274", fullname: "Guinea-Bissau", shortname: "Guinea-Bissau"},
//    gnq: {hrinfo_id: "248", fullname: "Equatorial Guinea", shortname: "Equatorial Guinea"},
//    grc: {hrinfo_id: "266", fullname: "Greece", shortname: "Greece"},
//    grd: {hrinfo_id: "268", fullname: "Grenada", shortname: "Grenada"},
//    grl: {hrinfo_id: "267", fullname: "Greenland", shortname: "Greenland"},
//    gtm: {hrinfo_id: "271", fullname: "Guatemala", shortname: "Guatemala"},
//    guf: {hrinfo_id: "257", fullname: "French Guiana", shortname: "French Guiana"},
//    gum: {hrinfo_id: "270", fullname: "Guam", shortname: "Guam"},
//    guy: {hrinfo_id: "275", fullname: "Guyana", shortname: "Guyana"},
//    hkg: {hrinfo_id: "280", fullname: "China, Hong Kong Special Administrative Region", shortname: "Hong Kong"},
//    hmd: {hrinfo_id: "277", fullname: "Heard Island and McDonald Islands", shortname: "Heard and McDonald Islands"},
//    hnd: {hrinfo_id: "279", fullname: "Honduras", shortname: "Honduras"},
//    hrv: {hrinfo_id: "236", fullname: "Croatia", shortname: "Croatia"},
    hti: {hrinfo_id: "78", fullname: "Haiti", shortname: "Haiti"},
//    hun: {hrinfo_id: "281", fullname: "Hungary", shortname: "Hungary"},
    idn: {hrinfo_id: "83", fullname: "Indonesia", shortname: "Indonesia"},
//    imn: {hrinfo_id: "288", fullname: "Isle of Man", shortname: "Isle of Man"},
//    ind: {hrinfo_id: "283", fullname: "India", shortname: "India"},
//    iot: {hrinfo_id: "213", fullname: "British Indian Ocean Territory", shortname: "British Indian Ocean Territory"},
//    irl: {hrinfo_id: "287", fullname: "Ireland", shortname: "Ireland"},
//    irn: {hrinfo_id: "285", fullname: "Iran (Islamic Republic of)", shortname: "Iran"},
    irq: {hrinfo_id: "2793", fullname: "Iraq", shortname: "Iraq"},
//    isl: {hrinfo_id: "282", fullname: "Iceland", shortname: "Iceland"},
    //isr: {hrinfo_id: "289", fullname: "Israel", shortname: "Israel"},
//    ita: {hrinfo_id: "290", fullname: "Italy", shortname: "Italy"},
    //jam: {hrinfo_id: "291", fullname: "Jamaica", shortname: "Jamaica"},
//    jey: {hrinfo_id: "293", fullname: "Jersey", shortname: "Jersey"},
//    jor: {hrinfo_id: "294", fullname: "Jordan", shortname: "Jordan"},
//    jpn: {hrinfo_id: "292", fullname: "Japan", shortname: "Japan"},
//    kaz: {hrinfo_id: "295", fullname: "Kazakhstan", shortname: "Kazakhstan"},
//    ken: {hrinfo_id: "296", fullname: "Kenya", shortname: "Kenya"},
    kgz: {hrinfo_id: "2781", fullname: "Kyrgyzstan", shortname: "Kyrgyz Republic"},
    khm: {hrinfo_id: "2783", fullname: "Cambodia", shortname: "Cambodia"},
    //kir: {hrinfo_id: "297", fullname: "Kiribati", shortname: "Kiribati"},
//    kna: {hrinfo_id: "368", fullname: "Saint Kitts and Nevis", shortname: "St. Kitts and Nevis"},
    kor: {hrinfo_id: "299", fullname: "Republic of Korea", shortname: "South Korea"},
    kwt: {hrinfo_id: "300", fullname: "Kuwait", shortname: "Kuwait"},
    lao: {hrinfo_id: "302", fullname: "Lao People's Democratic Republic", shortname: "Laos"},
    lbn: {hrinfo_id: "304", fullname: "Lebanon", shortname: "Lebanon"},
    lbr: {hrinfo_id: "306", fullname: "Liberia", shortname: "Liberia"},
    lby: {hrinfo_id: "2794", fullname: "Libya", shortname: "Libya"},
    lca: {hrinfo_id: "369", fullname: "Saint Lucia", shortname: "St. Lucia"},
    lie: {hrinfo_id: "308", fullname: "Liechtenstein", shortname: "Liechtenstein"},
    lka: {hrinfo_id: "390", fullname: "Sri Lanka", shortname: "Sri Lanka"},
    lso: {hrinfo_id: "49", fullname: "Lesotho", shortname: "Lesotho"},
    ltu: {hrinfo_id: "309", fullname: "Lithuania", shortname: "Lithuania"},
    lux: {hrinfo_id: "310", fullname: "Luxembourg", shortname: "Luxembourg"},
    lva: {hrinfo_id: "303", fullname: "Latvia", shortname: "Latvia"},
    mac: {hrinfo_id: "311", fullname: "China, Macao Special Administrative Region", shortname: "Macao"},
    maf: {hrinfo_id: "370", fullname: "Saint Martin (French part)", shortname: "St. Martin"},
    mar: {hrinfo_id: "331", fullname: "Morocco", shortname: "Morocco"},
    mco: {hrinfo_id: "327", fullname: "Monaco", shortname: "Monaco"},
    mda: {hrinfo_id: "326", fullname: "Republic of Moldova", shortname: "Moldova"},
    mdg: {hrinfo_id: "313", fullname: "Madagascar", shortname: "Madagascar"},
    mdv: {hrinfo_id: "316", fullname: "Maldives", shortname: "Maldives"},
    mex: {hrinfo_id: "324", fullname: "Mexico", shortname: "Mexico"},
    mhl: {hrinfo_id: "319", fullname: "Marshall Islands", shortname: "Marshall Islands"},
    mkd: {hrinfo_id: "312", fullname: "Republic of North Macedonia", shortname: "Macedonia"},
    mli: {hrinfo_id: "35", fullname: "Mali", shortname: "Mali"},
    mlt: {hrinfo_id: "318", fullname: "Malta", shortname: "Malta"},
    mmr: {hrinfo_id: "86", fullname: "Myanmar", shortname: "Myanmar"},
    mne: {hrinfo_id: "329", fullname: "Montenegro", shortname: "Montenegro"},
    mng: {hrinfo_id: "328", fullname: "Mongolia", shortname: "Mongolia"},
    mnp: {hrinfo_id: "346", fullname: "Northern Mariana Islands", shortname: "Northern Mariana Islands"},
    moz: {hrinfo_id: "53", fullname: "Mozambique", shortname: "Mozambique"},
    mrt: {hrinfo_id: "321", fullname: "Mauritania", shortname: "Mauritania"},
    msr: {hrinfo_id: "330", fullname: "Montserrat", shortname: "Montserrat"},
    mtq: {hrinfo_id: "320", fullname: "Martinique", shortname: "Martinique"},
    mus: {hrinfo_id: "322", fullname: "Mauritius", shortname: "Mauritius"},
    mwi: {hrinfo_id: "51", fullname: "Malawi", shortname: "Malawi"},
    mys: {hrinfo_id: "315", fullname: "Malaysia", shortname: "Malaysia"},
    myt: {hrinfo_id: "323", fullname: "Mayotte", shortname: "Mayotte"},
    nam: {hrinfo_id: "334", fullname: "Namibia", shortname: "Namibia"},
    ncl: {hrinfo_id: "339", fullname: "New Caledonia", shortname: "New Caledonia"},
    ner: {hrinfo_id: "37", fullname: "Niger", shortname: "Niger"},
    nfk: {hrinfo_id: "345", fullname: "Norfolk Island", shortname: "Norfolk Island"},
    nga: {hrinfo_id: "38", fullname: "Nigeria", shortname: "Nigeria"},
    nic: {hrinfo_id: "341", fullname: "Nicaragua", shortname: "Nicaragua"},
    niu: {hrinfo_id: "344", fullname: "Niue", shortname: "Niue"},
    nld: {hrinfo_id: "337", fullname: "Netherlands", shortname: "Netherlands"},
    nor: {hrinfo_id: "347", fullname: "Norway", shortname: "Norway"},
    npl: {hrinfo_id: "336", fullname: "Nepal", shortname: "Nepal"},
    nru: {hrinfo_id: "335", fullname: "Nauru", shortname: "Nauru"},
    nzl: {hrinfo_id: "340", fullname: "New Zealand", shortname: "New Zealand"},
    omn: {hrinfo_id: "348", fullname: "Oman", shortname: "Oman"},
    pak: {hrinfo_id: "81", fullname: "Pakistan", shortname: "Pakistan"},
    pan: {hrinfo_id: "352", fullname: "Panama", shortname: "Panama"},
    pcn: {hrinfo_id: "357", fullname: "Pitcairn", shortname: "Pitcairn"},
    per: {hrinfo_id: "355", fullname: "Peru", shortname: "Peru"},
    phl: {hrinfo_id: "84", fullname: "Philippines", shortname: "Philippines"},
    plw: {hrinfo_id: "350", fullname: "Palau", shortname: "Palau"},
    png: {hrinfo_id: "17395", fullname: "Papua New Guinea", shortname: "Papua New Guinea"},
    pol: {hrinfo_id: "358", fullname: "Poland", shortname: "Poland"},
    pri: {hrinfo_id: "360", fullname: "Puerto Rico", shortname: "Puerto Rico"},
    prk: {hrinfo_id: "298", fullname: "Democratic People's Republic of Korea", shortname: "North Korea"},
    prt: {hrinfo_id: "359", fullname: "Portugal", shortname: "Portugal"},
    pry: {hrinfo_id: "354", fullname: "Paraguay", shortname: "Paraguay"},
    pse: {hrinfo_id: "73", fullname: "State of Palestine", shortname: "Palestine"},
    pyf: {hrinfo_id: "258", fullname: "French Polynesia", shortname: "French Polynesia"},
    qat: {hrinfo_id: "361", fullname: "Qatar", shortname: "Qatar"},
    reu: {hrinfo_id: "362", fullname: "Réunion", shortname: "Reunion"},
    rou: {hrinfo_id: "363", fullname: "Romania", shortname: "Romania"},
    rus: {hrinfo_id: "364", fullname: "Russian Federation", shortname: "Russia"},
    rwa: {hrinfo_id: "365", fullname: "Rwanda", shortname: "Rwanda"},
    sau: {hrinfo_id: "376", fullname: "Saudi Arabia", shortname: "Saudi Arabia"},
    sdn: {hrinfo_id: "392", fullname: "Sudan", shortname: "Sudan"},
    sen: {hrinfo_id: "70", fullname: "Senegal", shortname: "Senegal"},
    sgp: {hrinfo_id: "381", fullname: "Singapore", shortname: "Singapore"},
    sgs: {hrinfo_id: "388", fullname: "South Georgia and the South Sandwich Islands", shortname: "South Georgia and South Sandwich Islands"},
    shn: {hrinfo_id: "367", fullname: "Saint Helena", shortname: "St. Helena"},
    sjm: {hrinfo_id: "394", fullname: "Svalbard and Jan Mayen Islands", shortname: "Svalbard and Jan Mayen Islands"},
    slb: {hrinfo_id: "385", fullname: "Solomon Islands", shortname: "Solomon Islands"},
    sle: {hrinfo_id: "380", fullname: "Sierra Leone", shortname: "Sierra Leone"},
    slv: {hrinfo_id: "247", fullname: "El Salvador", shortname: "El Salvador"},
    smr: {hrinfo_id: "374", fullname: "San Marino", shortname: "San Marino"},
    som: {hrinfo_id: "68", fullname: "Somalia", shortname: "Somalia"},
    spm: {hrinfo_id: "371", fullname: "Saint Pierre and Miquelon", shortname: "St. Pierre and Miquelon"},
    srb: {hrinfo_id: "378", fullname: "Serbia", shortname: "Serbia"},
    ssd: {hrinfo_id: "69", fullname: "South Sudan", shortname: "South Sudan"},
    stp: {hrinfo_id: "375", fullname: "Sao Tome and Principe", shortname: "Sao Tome and Principe"},
    sur: {hrinfo_id: "393", fullname: "Suriname", shortname: "Suriname"},
    svk: {hrinfo_id: "383", fullname: "Slovakia", shortname: "Slovakia"},
    svn: {hrinfo_id: "384", fullname: "Slovenia", shortname: "Slovenia"},
    swe: {hrinfo_id: "396", fullname: "Sweden", shortname: "Sweden"},
    swz: {hrinfo_id: "395", fullname: "Kingdom of Eswatini", shortname: "Eswatini"},
    sxm: {hrinfo_id: "382", fullname: "Sint Maarten (Dutch part)", shortname: "Sint Maarten"},
    syc: {hrinfo_id: "379", fullname: "Seychelles", shortname: "Seychelles"},
    syr: {hrinfo_id: "74", fullname: "Syrian Arab Republic", shortname: "Syria"},
    tca: {hrinfo_id: "411", fullname: "Turks and Caicos Islands", shortname: "Turks and Caicos Islands"},
    tcd: {hrinfo_id: "43", fullname: "Chad", shortname: "Chad"},
    tgo: {hrinfo_id: "404", fullname: "Togo", shortname: "Togo"},
    tha: {hrinfo_id: "402", fullname: "Thailand", shortname: "Thailand"},
    tjk: {hrinfo_id: "400", fullname: "Tajikistan", shortname: "Tajikistan"},
    tkl: {hrinfo_id: "405", fullname: "Tokelau", shortname: "Tokelau"},
    tkm: {hrinfo_id: "410", fullname: "Turkmenistan", shortname: "Turkmenistan"},
    tls: {hrinfo_id: "403", fullname: "Timor-Leste", shortname: "Timor-Leste"},
    ton: {hrinfo_id: "406", fullname: "Tonga", shortname: "Tonga"},
    tto: {hrinfo_id: "407", fullname: "Trinidad and Tobago", shortname: "Trinidad and Tobago"},
    tun: {hrinfo_id: "408", fullname: "Tunisia", shortname: "Tunisia"},
    tur: {hrinfo_id: "409", fullname: "Turkey", shortname: "Turkey"},
    tuv: {hrinfo_id: "412", fullname: "Tuvalu", shortname: "Tuvalu"},
    twn: {hrinfo_id: "399", fullname: "Taiwan (Province of China)", shortname: "Taiwan"},
    tza: {hrinfo_id: "401", fullname: "United Republic of Tanzania", shortname: "Tanzania"},
    uga: {hrinfo_id: "413", fullname: "Uganda", shortname: "Uganda"},
    ukr: {hrinfo_id: "43184", fullname: "Ukraine", shortname: "Ukraine"},
    umi: {hrinfo_id: "418", fullname: "United States Minor Outlying Islands (the)", shortname: "United States Minor Outlying Islands"},
    ury: {hrinfo_id: "419", fullname: "Uruguay", shortname: "Uruguay"},
    usa: {hrinfo_id: "417", fullname: "United States of America", shortname: "United States"},
    uzb: {hrinfo_id: "420", fullname: "Uzbekistan", shortname: "Uzbekistan"},
    vat: {hrinfo_id: "278", fullname: "Holy See", shortname: "Holy See"},
    vct: {hrinfo_id: "372", fullname: "Saint Vincent and The Grenadines", shortname: "St. Vincent and the Grenadines"},
    ven: {hrinfo_id: "422", fullname: "Venezuela (Bolivarian Republic of)", shortname: "Venezuela"},
    vgb: {hrinfo_id: "424", fullname: "British Virgin Islands", shortname: "British Virgin Islands"},
    vir: {hrinfo_id: "425", fullname: "United States Virgin Islands", shortname: "United States Virgin Islands"},
    vnm: {hrinfo_id: "423", fullname: "Viet Nam", shortname: "Vietnam"},
    vut: {hrinfo_id: "421", fullname: "Vanuatu", shortname: "Vanuatu"},
    wlf: {hrinfo_id: "426", fullname: "Wallis and Futuna Islands", shortname: "Wallis and Futuna Islands"},
    wsm: {hrinfo_id: "373", fullname: "Samoa", shortname: "Samoa"},
    yem: {hrinfo_id: "75", fullname: "Yemen", shortname: "Yemen"},
    zaf: {hrinfo_id: "387", fullname: "South Africa", shortname: "South Africa"},
    zmb: {hrinfo_id: "429", fullname: "Zambia", shortname: "Zambia"},
    zwe: {hrinfo_id: "60", fullname: "Zimbabwe", shortname: "Zimbabwe"}
};
// It fill automatically later

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
            api_parameters.filter += "filter[operation]=" + country_table[this.country_iso3].hrinfo_id + "&";
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
        console.log(url);
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
            for (var i = 0; i < theme_array.length; i++) {
                theme_filter += "\"" + theme_array[i] + "\"";
                if (i < theme_array.length - 1)
                    theme_filter += " OR ";
            }
            if (i === 0)
                theme_filter += "no_values_for_HDX_tags_for_that_theme";
            theme_filter += ")";
        }

        if ((this.country_iso3) && (!this.theme))
            api_parameters.filter = "q=" + country_filter;
        if ((this.theme) && (!this.country_iso3))
            api_parameters.filter = "q=" + theme_filter;
        if ((this.theme) && (this.country_iso3))
            api_parameters.filter = "q=" + country_filter + "%20AND" + theme_filter;

        var url = api_parameters.base_url + api_parameters.endpoint +
                "?" + api_parameters.filter + "&" +
                "rows=" + api_parameters.limit;

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
    country_iso3 = getUrlVars()["country"];

    /* Plot the title */
    title_block = document.getElementById("main_title");
    title = country_table[country_iso3].fullname;
    if (theme)
        title += " - " + element_clicked.innerText;
    title_block.innerText = title;

    /* Create the generic query */

    query_object = new query_builder(country_iso3, theme /*theme*/);

    /* List of countries */
    call_url = "https://vocabulary.unocha.org/json/beta-v3/countries.json";
    const element_countries = "countries";
    const element_countries_more = null;
    sendRequest(call_url, null, element_countries, element_countries_more, plotCountryMenu);

    /** Reliefweb - All reports */
    call_url = query_object.reliefweb_allreports_url;
    const element_all_reports = "latest-reports";
    const element_all_reports_more = "latest-reports-link";
    sendRequest(call_url, "All Reports", element_all_reports, element_all_reports_more, plotRWReports);

    /** Reliefweb - Sitaution reports **/
    call_url = query_object.reliefweb_sitreps_url;
    const element_sitreps = "latest-sitreps";
    const element_sitreps_more = "latest-sitreps-link";
    sendRequest(call_url, "All Situation Reports", element_sitreps, element_sitreps_more, plotRWReports);

    /** HDX Datasets **/
    call_url = query_object.hdx_datasets_url;
    const element_datasets = "hdx-datasets";
    const element_datasets_more = "hdx-datasets-link";
    sendRequest(call_url, "Latests HDX Datasets", element_datasets, element_datasets_more, plotHDXDatasets);

    /** HRinfo Events **/
    call_url = query_object.hrinfo_events_url;
    const element_events = "hrinfo-events";
    const element_events_more = "hrinfo-events-link";
    sendRequest(call_url, "Next HRinfo events", element_events, element_events_more, plotHRinfoEvents);

    /* Reliefweb figures */
    call_url = "https://raw.githubusercontent.com/reliefweb/crisis-app-data/v2/edition/hdx/main.json";
    const element_figures = "reliefweb-figures";
    const element_figures_more = "reliefweb-figures-link";
    sendRequest(call_url, "Latest Reliefweb Figures", element_figures, element_figures_more, plotRWFigures);

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
    const h2 = document.createElement('h2');
    h2.innerText = title;
    display_area.appendChild(h2);
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
        this.value = "";
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

    normalize_country(country) {
        this.link = "?country=" + country.iso3.toLowerCase();
        this.title = country.label["english-short"];
    }

    normalize_hdx_dataset(dataset)
    {
        dataset.link = null;
        if (dataset.resources[0])
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

    normalize_rw_figure(figure)
    {
        this.link = figure.url;
        this.title = figure.name;
        this.value = figure.value;
        this.date = figure.date;
        this.source = figure.source;
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
        const div = document.createElement('div');
        const p = document.createElement('p');
        p.innerText = this.value;
        const footer = document.createElement('footer');
        const time = document.createElement('time');
        const source = document.createElement('cite');
        const source_span = document.createElement('span');
        time.textContent = this.date;
        source_span.textContent = this.source;
        area.appendChild(link);
        link.appendChild(card);

        card.appendChild(h1);
        card.appendChild(div);
        if (this.image) {
            const image = document.createElement('img');
            image.setAttribute('src', this.image);
            card.appendChild(image);
        }
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

function plotCountryMenu(data, api_url, title, element) {
    plotHeader(element, title);
    data = data.data;
    data.forEach(country => {
        if (country.iso3)
        {
            country_iso3 = country.iso3.toLowerCase();

            /* Populate the country table */
            /* TODO: Created manually
             * As the rest of the "blocks" have to wait to create the country_table element, if it is asynchronous it doesn't work properly
             */
            /*
             country_table[country_iso3] = {
             "hrinfo_id": country.hrinfo_id,
             "fullname": country.label.default,
             "shortname": country.label["english-short"]
             };
             */

            /* Plot the menu */
            plot_event = new plotable_object();
            plot_event.normalize_country(country);
            plot_event.plot(element);
        }
    });
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

function plotRWFigures(data, api_url, title, element) {

    var found = data.find(function (element) {
        return (element.iso3.toLowerCase() === country_iso3);
    });
    if (found) {
        data = found.figures;

        // order figures by date
        function compare(a, b) {
            if (a.date < b.date) {
                return 1;
            }
            if (a.date > b.date) {
                return -1;
            }
            return 0;
        }
        data.sort(compare);
        console.log(data);
        plotHeader(element, title);
        for (i = 0; i < config.number_items; i++) {
            figure = data[i];
            plot_dataset = new plotable_object();
            plot_dataset.normalize_rw_figure(figure);
            plot_dataset.plot(element);
        }
        ;
        plotFooter(element, api_url);
    }
}

/* MAIN CALL */


refresh_page();
