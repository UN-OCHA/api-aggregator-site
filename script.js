/*
 * TODO: Put theme in the URL
 * TODO: Cluster menu created automatically based on RW taxonomy
 * Get blocks for : Headlines, , HPC data, , FTS funding by sector, , DSR, HPC?? , , CBPF API
 * Create breadcrumb
 * TODO: Allow multiple links (for HDX datasets)
 *  
 *  ba4cbf9286fd3e0b4eff4fe90bffc9fe8d49722b
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

function formatNumber(num) {
    var suffix = "";

    if (num > 1000 && num < 1000000) {
        num = num / 1000;
        num = Number.parseFloat(num).toFixed(2);
        suffix = " K";
    } else if (num => 1000000) {
        num = num / 1000000;
        num = Number.parseFloat(num).toFixed(2);
        suffix = " M";
    }
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + suffix;
}

function formatDate(date) {
    var options = {year: 'numeric', month: 'short', day: 'numeric'};
    var date_object = new Date(date);
    if (date_object.getTime()) {
        new_date = date_object.toLocaleDateString("en-US", options);
        return new_date;
    } else
        return date;
}

/* mapping tables */
const country_table = {
    // TODO: To fix HRINFO ID
    abw: {hrinfo_id: "193", fullname: "Aruba", shortname: "Aruba", cbpf_plan: ""},
    afg: {hrinfo_id: "82", fullname: "Afghanistan", shortname: "Afghanistan", hrinfo_op: true, cbpf_plan: "AFG23"},
    ago: {hrinfo_id: "187", fullname: "Angola", shortname: "Angola", cbpf_plan: ""},
    aia: {hrinfo_id: "188", fullname: "Anguilla", shortname: "Anguilla", cbpf_plan: ""},
    ala: {hrinfo_id: "182", fullname: "�land Islands", shortname: "Aland Islands", cbpf_plan: ""},
    alb: {hrinfo_id: "183", fullname: "Albania", shortname: "Albania", cbpf_plan: ""},
    and: {hrinfo_id: "186", fullname: "Andorra", shortname: "Andorra", cbpf_plan: ""},
    are: {hrinfo_id: "415", fullname: "United Arab Emirates", shortname: "United Arab Emirates", cbpf_plan: ""},
    arg: {hrinfo_id: "191", fullname: "Argentina", shortname: "Argentina", cbpf_plan: ""},
    arm: {hrinfo_id: "192", fullname: "Armenia", shortname: "Armenia", cbpf_plan: ""},
    asm: {hrinfo_id: "185", fullname: "American Samoa", shortname: "American Samoa", cbpf_plan: ""},
    ata: {hrinfo_id: "189", fullname: "Antarctica", shortname: "Antarctica", cbpf_plan: ""},
    atf: {hrinfo_id: "259", fullname: "French Southern and Antarctic Territories", shortname: "French Southern Territories", cbpf_plan: ""},
    atg: {hrinfo_id: "190", fullname: "Antigua and Barbuda", shortname: "Antigua and Barbuda", cbpf_plan: ""},
    aus: {hrinfo_id: "194", fullname: "Australia", shortname: "Australia", cbpf_plan: ""},
    aut: {hrinfo_id: "195", fullname: "Austria", shortname: "Austria", cbpf_plan: ""},
    aze: {hrinfo_id: "196", fullname: "Azerbaijan", shortname: "Azerbaijan", cbpf_plan: ""},
    bdi: {hrinfo_id: "62", fullname: "Burundi", shortname: "Burundi", hrinfo_op: true, cbpf_plan: ""},
    bel: {hrinfo_id: "202", fullname: "Belgium", shortname: "Belgium", cbpf_plan: ""},
    ben: {hrinfo_id: "204", fullname: "Benin", shortname: "Benin", cbpf_plan: ""},
    bes: {hrinfo_id: "209", fullname: "Bonaire, Sint Eustatius and Saba", shortname: "Bosnia and Herzegovina", cbpf_plan: ""},
    bfa: {hrinfo_id: "27", fullname: "Burkina Faso", shortname: "Burkina Faso", hrinfo_op: true, cbpf_plan: ""},
    bgd: {hrinfo_id: "2784", fullname: "Bangladesh", shortname: "Bangladesh", hrinfo_op: true, cbpf_plan: ""},
    bgr: {hrinfo_id: "215", fullname: "Bulgaria", shortname: "Bulgaria", cbpf_plan: ""},
    bhr: {hrinfo_id: "198", fullname: "Bahrain", shortname: "Bahrain", cbpf_plan: ""},
    bhs: {hrinfo_id: "197", fullname: "Bahamas", shortname: "Bahamas", cbpf_plan: ""},
    bih: {hrinfo_id: "208", fullname: "Bosnia and Herzegovina", shortname: "Bonaire, Saint Eustatius and Saba", cbpf_plan: ""},
    blm: {hrinfo_id: "366", fullname: "Saint Barth�lemy", shortname: "St. Barths", cbpf_plan: ""},
    blr: {hrinfo_id: "201", fullname: "Belarus", shortname: "Belarus", cbpf_plan: ""},
    blz: {hrinfo_id: "203", fullname: "Belize", shortname: "Belize", cbpf_plan: ""},
    bmu: {hrinfo_id: "205", fullname: "Bermuda", shortname: "Bermuda", cbpf_plan: ""},
    bol: {hrinfo_id: "207", fullname: "Bolivia (Plurinational State of)", shortname: "Bolivia", cbpf_plan: ""},
    bra: {hrinfo_id: "212", fullname: "Brazil", shortname: "Brazil", cbpf_plan: ""},
    brb: {hrinfo_id: "200", fullname: "Barbados", shortname: "Barbados", cbpf_plan: ""},
    brn: {hrinfo_id: "214", fullname: "Brunei Darussalam", shortname: "Brunei Darussalam", cbpf_plan: ""},
    btn: {hrinfo_id: "206", fullname: "Bhutan", shortname: "Bhutan", cbpf_plan: ""},
    bvt: {hrinfo_id: "211", fullname: "Bouvet Island", shortname: "Bouvet Island", cbpf_plan: ""},
    bwa: {hrinfo_id: "210", fullname: "Botswana", shortname: "Botswana", cbpf_plan: ""},
    caf: {hrinfo_id: "39", fullname: "Central African Republic", shortname: "Central African Republic", hrinfo_op: true, cbpf_plan: "CAR17"},
    can: {hrinfo_id: "220", fullname: "Canada", shortname: "Canada", cbpf_plan: ""},
    cck: {hrinfo_id: "228", fullname: "Cocos (Keeling) Islands", shortname: "Cocos (Keeling) Islands", cbpf_plan: ""},
    che: {hrinfo_id: "397", fullname: "Switzerland", shortname: "Switzerland", cbpf_plan: ""},
    chl: {hrinfo_id: "225", fullname: "Chile", shortname: "Channel Islands", cbpf_plan: ""},
    chn: {hrinfo_id: "226", fullname: "China", shortname: "Chile", cbpf_plan: ""},
    civ: {hrinfo_id: "235", fullname: "C�te d'Ivoire", shortname: "Cote d'Ivoire", cbpf_plan: ""},
    cmr: {hrinfo_id: "28", fullname: "Cameroon", shortname: "Cameroon", hrinfo_op: true, cbpf_plan: ""},
    cod: {hrinfo_id: "40", fullname: "Democratic Republic of the Congo", shortname: "DR Congo", hrinfo_op: true, cbpf_plan: "DRC24"},
    cog: {hrinfo_id: "231", fullname: "Congo", shortname: "Congo Republic", cbpf_plan: ""},
    cok: {hrinfo_id: "233", fullname: "Cook Islands", shortname: "Cook Islands", cbpf_plan: ""},
    col: {hrinfo_id: "77", fullname: "Colombia", shortname: "Colombia", hrinfo_op: true, cbpf_plan: "COL52"},
    com: {hrinfo_id: "230", fullname: "Comoros", shortname: "Comoros", cbpf_plan: ""},
    cpv: {hrinfo_id: "221", fullname: "Cabo Verde", shortname: "Cabo Verde", cbpf_plan: ""},
    cri: {hrinfo_id: "234", fullname: "Costa Rica", shortname: "Costa Rica", cbpf_plan: ""},
    cub: {hrinfo_id: "237", fullname: "Cuba", shortname: "Cuba", cbpf_plan: ""},
    cuw: {hrinfo_id: "238", fullname: "Cura�ao", shortname: "Curacao", cbpf_plan: ""},
    cxr: {hrinfo_id: "227", fullname: "Christmas Island", shortname: "Christmas Island", cbpf_plan: ""},
    cym: {hrinfo_id: "222", fullname: "Cayman Islands", shortname: "Cayman Islands", cbpf_plan: ""},
    cyp: {hrinfo_id: "239", fullname: "Cyprus", shortname: "Cyprus", cbpf_plan: ""},
    cze: {hrinfo_id: "240", fullname: "Czechia", shortname: "Czech Republic", cbpf_plan: ""},
    deu: {hrinfo_id: "263", fullname: "Germany", shortname: "Germany", cbpf_plan: ""},
    dji: {hrinfo_id: "242", fullname: "Djibouti", shortname: "Djibouti", cbpf_plan: ""},
    dma: {hrinfo_id: "243", fullname: "Dominica", shortname: "Dominica", cbpf_plan: ""},
    dnk: {hrinfo_id: "241", fullname: "Denmark", shortname: "Denmark", cbpf_plan: ""},
    dom: {hrinfo_id: "244", fullname: "Dominican Republic", shortname: "Dominican Republic", cbpf_plan: ""},
    dza: {hrinfo_id: "184", fullname: "Algeria", shortname: "Algeria", cbpf_plan: ""},
    ecu: {hrinfo_id: "245", fullname: "Ecuador", shortname: "Ecuador", cbpf_plan: ""},
    egy: {hrinfo_id: "246", fullname: "Egypt", shortname: "Egypt", cbpf_plan: ""},
    eri: {hrinfo_id: "64", fullname: "Eritrea", shortname: "Eritrea", hrinfo_op: true, cbpf_plan: ""},
    esh: {hrinfo_id: "427", fullname: "Western Sahara", shortname: "Western Sahara", cbpf_plan: ""},
    esp: {hrinfo_id: "389", fullname: "Spain", shortname: "Spain", cbpf_plan: ""},
    est: {hrinfo_id: "250", fullname: "Estonia", shortname: "Estonia", cbpf_plan: ""},
    eth: {hrinfo_id: "251", fullname: "Ethiopia", shortname: "Ethiopia", hrinfo_op: true, cbpf_plan: "ETH53"},
    fin: {hrinfo_id: "65", fullname: "Finland", shortname: "Finland", cbpf_plan: ""},
    fji: {hrinfo_id: "254", fullname: "Fiji", shortname: "Fiji", cbpf_plan: ""},
    flk: {hrinfo_id: "252", fullname: "Falkland Islands (Malvinas)", shortname: "Falkland Islands", cbpf_plan: ""},
    fra: {hrinfo_id: "256", fullname: "France", shortname: "France", cbpf_plan: ""},
    fro: {hrinfo_id: "253", fullname: "Faroe Islands", shortname: "Faeroe Islands", cbpf_plan: ""},
    fsm: {hrinfo_id: "325", fullname: "Micronesia (Federated States of)", shortname: "Micronesia, Fed. Sts.", cbpf_plan: ""},
    gab: {hrinfo_id: "260", fullname: "Gabon", shortname: "Gabon", cbpf_plan: ""},
    gbr: {hrinfo_id: "416", fullname: "United Kingdom of Great Britain and Northern Ireland", shortname: "United Kingdom", cbpf_plan: ""},
    geo: {hrinfo_id: "262", fullname: "Georgia", shortname: "Georgia", cbpf_plan: ""},
    ggy: {hrinfo_id: "272", fullname: "Guernsey", shortname: "Guernsey", cbpf_plan: ""},
    gha: {hrinfo_id: "264", fullname: "Ghana", shortname: "Ghana", cbpf_plan: ""},
    gib: {hrinfo_id: "265", fullname: "Gibraltar", shortname: "Gibraltar", cbpf_plan: ""},
    gin: {hrinfo_id: "273", fullname: "Guinea", shortname: "Guinea", cbpf_plan: ""},
    glp: {hrinfo_id: "269", fullname: "Guadeloupe", shortname: "Guadeloupe", cbpf_plan: ""},
    gmb: {hrinfo_id: "261", fullname: "Gambia", shortname: "Gambia", cbpf_plan: ""},
    gnb: {hrinfo_id: "274", fullname: "Guinea-Bissau", shortname: "Guinea-Bissau", cbpf_plan: ""},
    gnq: {hrinfo_id: "248", fullname: "Equatorial Guinea", shortname: "Equatorial Guinea", cbpf_plan: ""},
    grc: {hrinfo_id: "266", fullname: "Greece", shortname: "Greece", cbpf_plan: ""},
    grd: {hrinfo_id: "268", fullname: "Grenada", shortname: "Grenada", cbpf_plan: ""},
    grl: {hrinfo_id: "267", fullname: "Greenland", shortname: "Greenland", cbpf_plan: ""},
    gtm: {hrinfo_id: "271", fullname: "Guatemala", shortname: "Guatemala", cbpf_plan: ""},
    guf: {hrinfo_id: "257", fullname: "French Guiana", shortname: "French Guiana", cbpf_plan: ""},
    gum: {hrinfo_id: "270", fullname: "Guam", shortname: "Guam", cbpf_plan: ""},
    guy: {hrinfo_id: "275", fullname: "Guyana", shortname: "Guyana", cbpf_plan: ""},
    hkg: {hrinfo_id: "280", fullname: "China, Hong Kong Special Administrative Region", shortname: "Hong Kong", cbpf_plan: ""},
    hmd: {hrinfo_id: "277", fullname: "Heard Island and McDonald Islands", shortname: "Heard and McDonald Islands", cbpf_plan: ""},
    hnd: {hrinfo_id: "279", fullname: "Honduras", shortname: "Honduras", cbpf_plan: ""},
    hrv: {hrinfo_id: "236", fullname: "Croatia", shortname: "Croatia", cbpf_plan: ""},
    hti: {hrinfo_id: "78", fullname: "Haiti", shortname: "Haiti", hrinfo_op: true, cbpf_plan: "HTI54"},
    hun: {hrinfo_id: "281", fullname: "Hungary", shortname: "Hungary", cbpf_plan: ""},
    idn: {hrinfo_id: "83", fullname: "Indonesia", shortname: "Indonesia", hrinfo_op: true, cbpf_plan: ""},
    imn: {hrinfo_id: "288", fullname: "Isle of Man", shortname: "Isle of Man", cbpf_plan: ""},
    ind: {hrinfo_id: "283", fullname: "India", shortname: "India", cbpf_plan: ""},
    iot: {hrinfo_id: "213", fullname: "British Indian Ocean Territory", shortname: "British Indian Ocean Territory", cbpf_plan: ""},
    irl: {hrinfo_id: "287", fullname: "Ireland", shortname: "Ireland", cbpf_plan: ""},
    irn: {hrinfo_id: "285", fullname: "Iran (Islamic Republic of)", shortname: "Iran", cbpf_plan: ""},
    irq: {hrinfo_id: "2793", fullname: "Iraq", shortname: "Iraq", hrinfo_op: true, cbpf_plan: "IRQ72"},
    isl: {hrinfo_id: "282", fullname: "Iceland", shortname: "Iceland", cbpf_plan: ""},
    isr: {hrinfo_id: "289", fullname: "Israel", shortname: "Israel", cbpf_plan: ""},
    ita: {hrinfo_id: "290", fullname: "Italy", shortname: "Italy", cbpf_plan: ""},
    jam: {hrinfo_id: "291", fullname: "Jamaica", shortname: "Jamaica", cbpf_plan: ""},
    jey: {hrinfo_id: "293", fullname: "Jersey", shortname: "Jersey", cbpf_plan: ""},
    jor: {hrinfo_id: "294", fullname: "Jordan", shortname: "Jordan", cbpf_plan: "JOR73"},
    jpn: {hrinfo_id: "292", fullname: "Japan", shortname: "Japan", cbpf_plan: ""},
    kaz: {hrinfo_id: "295", fullname: "Kazakhstan", shortname: "Kazakhstan", cbpf_plan: ""},
    ken: {hrinfo_id: "296", fullname: "Kenya", shortname: "Kenya", cbpf_plan: ""},
    kgz: {hrinfo_id: "2781", fullname: "Kyrgyzstan", shortname: "Kyrgyz Republic", hrinfo_op: true, cbpf_plan: ""},
    khm: {hrinfo_id: "2783", fullname: "Cambodia", shortname: "Cambodia", hrinfo_op: true, cbpf_plan: ""},
    kir: {hrinfo_id: "297", fullname: "Kiribati", shortname: "Kiribati", cbpf_plan: ""},
    kna: {hrinfo_id: "368", fullname: "Saint Kitts and Nevis", shortname: "St. Kitts and Nevis", cbpf_plan: ""},
    kor: {hrinfo_id: "299", fullname: "Republic of Korea", shortname: "South Korea", cbpf_plan: ""},
    kwt: {hrinfo_id: "300", fullname: "Kuwait", shortname: "Kuwait", cbpf_plan: ""},
    lao: {hrinfo_id: "302", fullname: "Lao People's Democratic Republic", shortname: "Laos", cbpf_plan: ""},
    lbn: {hrinfo_id: "304", fullname: "Lebanon", shortname: "Lebanon", cbpf_plan: "LBN71"},
    lbr: {hrinfo_id: "306", fullname: "Liberia", shortname: "Liberia", cbpf_plan: ""},
    lby: {hrinfo_id: "2794", fullname: "Libya", shortname: "Libya", hrinfo_op: true, cbpf_plan: ""},
    lca: {hrinfo_id: "369", fullname: "Saint Lucia", shortname: "St. Lucia", cbpf_plan: ""},
    lie: {hrinfo_id: "308", fullname: "Liechtenstein", shortname: "Liechtenstein", cbpf_plan: ""},
    lka: {hrinfo_id: "390", fullname: "Sri Lanka", shortname: "Sri Lanka", cbpf_plan: ""},
    lso: {hrinfo_id: "49", fullname: "Lesotho", shortname: "Lesotho", hrinfo_op: true, cbpf_plan: ""},
    ltu: {hrinfo_id: "309", fullname: "Lithuania", shortname: "Lithuania", cbpf_plan: ""},
    lux: {hrinfo_id: "310", fullname: "Luxembourg", shortname: "Luxembourg", cbpf_plan: ""},
    lva: {hrinfo_id: "303", fullname: "Latvia", shortname: "Latvia", cbpf_plan: ""},
    mac: {hrinfo_id: "311", fullname: "China, Macao Special Administrative Region", shortname: "Macao", cbpf_plan: ""},
    maf: {hrinfo_id: "370", fullname: "Saint Martin (French part)", shortname: "St. Martin", cbpf_plan: ""},
    mar: {hrinfo_id: "331", fullname: "Morocco", shortname: "Morocco", cbpf_plan: ""},
    mco: {hrinfo_id: "327", fullname: "Monaco", shortname: "Monaco", cbpf_plan: ""},
    mda: {hrinfo_id: "326", fullname: "Republic of Moldova", shortname: "Moldova", cbpf_plan: ""},
    mdg: {hrinfo_id: "313", fullname: "Madagascar", shortname: "Madagascar", cbpf_plan: ""},
    mdv: {hrinfo_id: "316", fullname: "Maldives", shortname: "Maldives", cbpf_plan: ""},
    mex: {hrinfo_id: "324", fullname: "Mexico", shortname: "Mexico", cbpf_plan: ""},
    mhl: {hrinfo_id: "319", fullname: "Marshall Islands", shortname: "Marshall Islands", cbpf_plan: ""},
    mkd: {hrinfo_id: "312", fullname: "Republic of North Macedonia", shortname: "Macedonia", cbpf_plan: ""},
    mli: {hrinfo_id: "35", fullname: "Mali", shortname: "Mali", hrinfo_op: true, cbpf_plan: ""},
    mlt: {hrinfo_id: "318", fullname: "Malta", shortname: "Malta", cbpf_plan: ""},
    mmr: {hrinfo_id: "86", fullname: "Myanmar", shortname: "Myanmar", hrinfo_op: true, cbpf_plan: "MMR59"},
    mne: {hrinfo_id: "329", fullname: "Montenegro", shortname: "Montenegro", cbpf_plan: ""},
    mng: {hrinfo_id: "328", fullname: "Mongolia", shortname: "Mongolia", cbpf_plan: ""},
    mnp: {hrinfo_id: "346", fullname: "Northern Mariana Islands", shortname: "Northern Mariana Islands", cbpf_plan: ""},
    moz: {hrinfo_id: "53", fullname: "Mozambique", shortname: "Mozambique", hrinfo_op: true, cbpf_plan: ""},
    mrt: {hrinfo_id: "321", fullname: "Mauritania", shortname: "Mauritania", cbpf_plan: ""},
    msr: {hrinfo_id: "330", fullname: "Montserrat", shortname: "Montserrat", cbpf_plan: ""},
    mtq: {hrinfo_id: "320", fullname: "Martinique", shortname: "Martinique", cbpf_plan: ""},
    mus: {hrinfo_id: "322", fullname: "Mauritius", shortname: "Mauritius", cbpf_plan: ""},
    mwi: {hrinfo_id: "51", fullname: "Malawi", shortname: "Malawi", hrinfo_op: true, cbpf_plan: ""},
    mys: {hrinfo_id: "315", fullname: "Malaysia", shortname: "Malaysia", cbpf_plan: ""},
    myt: {hrinfo_id: "323", fullname: "Mayotte", shortname: "Mayotte", cbpf_plan: ""},
    nam: {hrinfo_id: "334", fullname: "Namibia", shortname: "Namibia", cbpf_plan: ""},
    ncl: {hrinfo_id: "339", fullname: "New Caledonia", shortname: "New Caledonia", cbpf_plan: ""},
    ner: {hrinfo_id: "37", fullname: "Niger", shortname: "Niger", hrinfo_op: true, cbpf_plan: ""},
    nfk: {hrinfo_id: "345", fullname: "Norfolk Island", shortname: "Norfolk Island", cbpf_plan: ""},
    nga: {hrinfo_id: "38", fullname: "Nigeria", shortname: "Nigeria", hrinfo_op: true, cbpf_plan: "NGA75"},
    nic: {hrinfo_id: "341", fullname: "Nicaragua", shortname: "Nicaragua", cbpf_plan: ""},
    niu: {hrinfo_id: "344", fullname: "Niue", shortname: "Niue", cbpf_plan: ""},
    nld: {hrinfo_id: "337", fullname: "Netherlands", shortname: "Netherlands", cbpf_plan: ""},
    nor: {hrinfo_id: "347", fullname: "Norway", shortname: "Norway", cbpf_plan: ""},
    npl: {hrinfo_id: "336", fullname: "Nepal", shortname: "Nepal", cbpf_plan: ""},
    nru: {hrinfo_id: "335", fullname: "Nauru", shortname: "Nauru", cbpf_plan: ""},
    nzl: {hrinfo_id: "340", fullname: "New Zealand", shortname: "New Zealand", cbpf_plan: ""},
    omn: {hrinfo_id: "348", fullname: "Oman", shortname: "Oman", cbpf_plan: ""},
    pak: {hrinfo_id: "81", fullname: "Pakistan", shortname: "Pakistan", hrinfo_op: true, cbpf_plan: "PAK60"},
    pan: {hrinfo_id: "352", fullname: "Panama", shortname: "Panama", cbpf_plan: ""},
    pcn: {hrinfo_id: "357", fullname: "Pitcairn", shortname: "Pitcairn", cbpf_plan: ""},
    per: {hrinfo_id: "355", fullname: "Peru", shortname: "Peru", cbpf_plan: ""},
    phl: {hrinfo_id: "84", fullname: "Philippines", shortname: "Philippines", hrinfo_op: true, cbpf_plan: ""},
    plw: {hrinfo_id: "350", fullname: "Palau", shortname: "Palau", hrinfo_op: true, cbpf_plan: ""},
    png: {hrinfo_id: "17395", fullname: "Papua New Guinea", shortname: "Papua New Guinea", hrinfo_op: true, cbpf_plan: ""},
    pol: {hrinfo_id: "358", fullname: "Poland", shortname: "Poland", cbpf_plan: ""},
    pri: {hrinfo_id: "360", fullname: "Puerto Rico", shortname: "Puerto Rico", cbpf_plan: ""},
    prk: {hrinfo_id: "298", fullname: "Democratic People's Republic of Korea", shortname: "North Korea", cbpf_plan: ""},
    prt: {hrinfo_id: "359", fullname: "Portugal", shortname: "Portugal", cbpf_plan: ""},
    pry: {hrinfo_id: "354", fullname: "Paraguay", shortname: "Paraguay", cbpf_plan: ""},
    pse: {hrinfo_id: "73", fullname: "State of Palestine", shortname: "Palestine", hrinfo_op: true, cbpf_plan: "PSE67"},
    pyf: {hrinfo_id: "258", fullname: "French Polynesia", shortname: "French Polynesia", cbpf_plan: ""},
    qat: {hrinfo_id: "361", fullname: "Qatar", shortname: "Qatar", cbpf_plan: ""},
    reu: {hrinfo_id: "362", fullname: "R�union", shortname: "Reunion", cbpf_plan: ""},
    rou: {hrinfo_id: "363", fullname: "Romania", shortname: "Romania", cbpf_plan: ""},
    rus: {hrinfo_id: "364", fullname: "Russian Federation", shortname: "Russia", cbpf_plan: ""},
    rwa: {hrinfo_id: "365", fullname: "Rwanda", shortname: "Rwanda", cbpf_plan: ""},
    sau: {hrinfo_id: "376", fullname: "Saudi Arabia", shortname: "Saudi Arabia", cbpf_plan: ""},
    sdn: {hrinfo_id: "392", fullname: "Sudan", shortname: "Sudan", cbpf_plan: "SUD15"},
    sen: {hrinfo_id: "70", fullname: "Senegal", shortname: "Senegal", hrinfo_op: true, cbpf_plan: ""},
    sgp: {hrinfo_id: "381", fullname: "Singapore", shortname: "Singapore", cbpf_plan: ""},
    sgs: {hrinfo_id: "388", fullname: "South Georgia and the South Sandwich Islands", shortname: "South Georgia and South Sandwich Islands", cbpf_plan: ""},
    shn: {hrinfo_id: "367", fullname: "Saint Helena", shortname: "St. Helena", cbpf_plan: ""},
    sjm: {hrinfo_id: "394", fullname: "Svalbard and Jan Mayen Islands", shortname: "Svalbard and Jan Mayen Islands", cbpf_plan: ""},
    slb: {hrinfo_id: "385", fullname: "Solomon Islands", shortname: "Solomon Islands", cbpf_plan: ""},
    sle: {hrinfo_id: "380", fullname: "Sierra Leone", shortname: "Sierra Leone", cbpf_plan: ""},
    slv: {hrinfo_id: "247", fullname: "El Salvador", shortname: "El Salvador", cbpf_plan: ""},
    smr: {hrinfo_id: "374", fullname: "San Marino", shortname: "San Marino", cbpf_plan: ""},
    som: {hrinfo_id: "68", fullname: "Somalia", shortname: "Somalia", hrinfo_op: true, cbpf_plan: "SOM21"},
    spm: {hrinfo_id: "371", fullname: "Saint Pierre and Miquelon", shortname: "St. Pierre and Miquelon", cbpf_plan: ""},
    srb: {hrinfo_id: "378", fullname: "Serbia", shortname: "Serbia", cbpf_plan: ""},
    ssd: {hrinfo_id: "69", fullname: "South Sudan", shortname: "South Sudan", hrinfo_op: true, cbpf_plan: "SSD19"},
    stp: {hrinfo_id: "375", fullname: "Sao Tome and Principe", shortname: "Sao Tome and Principe", cbpf_plan: ""},
    sur: {hrinfo_id: "393", fullname: "Suriname", shortname: "Suriname", cbpf_plan: ""},
    svk: {hrinfo_id: "383", fullname: "Slovakia", shortname: "Slovakia", cbpf_plan: ""},
    svn: {hrinfo_id: "384", fullname: "Slovenia", shortname: "Slovenia", cbpf_plan: ""},
    swe: {hrinfo_id: "396", fullname: "Sweden", shortname: "Sweden", cbpf_plan: ""},
    swz: {hrinfo_id: "395", fullname: "Kingdom of Eswatini", shortname: "Eswatini", cbpf_plan: ""},
    sxm: {hrinfo_id: "382", fullname: "Sint Maarten (Dutch part)", shortname: "Sint Maarten", cbpf_plan: ""},
    syc: {hrinfo_id: "379", fullname: "Seychelles", shortname: "Seychelles", cbpf_plan: ""},
    syr: {hrinfo_id: "74", fullname: "Syrian Arab Republic", shortname: "Syria", hrinfo_op: true, cbpf_plan: "SYR62"},
    tca: {hrinfo_id: "411", fullname: "Turks and Caicos Islands", shortname: "Turks and Caicos Islands", cbpf_plan: ""},
    tcd: {hrinfo_id: "43", fullname: "Chad", shortname: "Chad", hrinfo_op: true, cbpf_plan: ""},
    tgo: {hrinfo_id: "404", fullname: "Togo", shortname: "Togo", cbpf_plan: ""},
    tha: {hrinfo_id: "402", fullname: "Thailand", shortname: "Thailand", cbpf_plan: ""},
    tjk: {hrinfo_id: "400", fullname: "Tajikistan", shortname: "Tajikistan", cbpf_plan: ""},
    tkl: {hrinfo_id: "405", fullname: "Tokelau", shortname: "Tokelau", cbpf_plan: ""},
    tkm: {hrinfo_id: "410", fullname: "Turkmenistan", shortname: "Turkmenistan", cbpf_plan: ""},
    tls: {hrinfo_id: "403", fullname: "Timor-Leste", shortname: "Timor-Leste", cbpf_plan: ""},
    ton: {hrinfo_id: "406", fullname: "Tonga", shortname: "Tonga", cbpf_plan: ""},
    tto: {hrinfo_id: "407", fullname: "Trinidad and Tobago", shortname: "Trinidad and Tobago", cbpf_plan: ""},
    tun: {hrinfo_id: "408", fullname: "Tunisia", shortname: "Tunisia", cbpf_plan: ""},
    tur: {hrinfo_id: "409", fullname: "Turkey", shortname: "Turkey", cbpf_plan: "TUR70"},
    tuv: {hrinfo_id: "412", fullname: "Tuvalu", shortname: "Tuvalu", cbpf_plan: ""},
    twn: {hrinfo_id: "399", fullname: "Taiwan (Province of China)", shortname: "Taiwan", cbpf_plan: ""},
    tza: {hrinfo_id: "401", fullname: "United Republic of Tanzania", shortname: "Tanzania", cbpf_plan: ""},
    uga: {hrinfo_id: "413", fullname: "Uganda", shortname: "Uganda", cbpf_plan: ""},
    ukr: {hrinfo_id: "43184", fullname: "Ukraine", shortname: "Ukraine", hrinfo_op: true, cbpf_plan: "UKR81"},
    umi: {hrinfo_id: "418", fullname: "United States Minor Outlying Islands (the)", shortname: "United States Minor Outlying Islands", cbpf_plan: ""},
    ury: {hrinfo_id: "419", fullname: "Uruguay", shortname: "Uruguay", cbpf_plan: ""},
    usa: {hrinfo_id: "417", fullname: "United States of America", shortname: "United States", cbpf_plan: ""},
    uzb: {hrinfo_id: "420", fullname: "Uzbekistan", shortname: "Uzbekistan", cbpf_plan: ""},
    vat: {hrinfo_id: "278", fullname: "Holy See", shortname: "Holy See", cbpf_plan: ""},
    vct: {hrinfo_id: "372", fullname: "Saint Vincent and The Grenadines", shortname: "St. Vincent and the Grenadines", cbpf_plan: ""},
    ven: {hrinfo_id: "422", fullname: "Venezuela (Bolivarian Republic of)", shortname: "Venezuela", cbpf_plan: ""},
    vgb: {hrinfo_id: "424", fullname: "British Virgin Islands", shortname: "British Virgin Islands", cbpf_plan: ""},
    vir: {hrinfo_id: "425", fullname: "United States Virgin Islands", shortname: "United States Virgin Islands", cbpf_plan: ""},
    vnm: {hrinfo_id: "423", fullname: "Viet Nam", shortname: "Vietnam", cbpf_plan: ""},
    vut: {hrinfo_id: "421", fullname: "Vanuatu", shortname: "Vanuatu", cbpf_plan: ""},
    wlf: {hrinfo_id: "426", fullname: "Wallis and Futuna Islands", shortname: "Wallis and Futuna Islands", cbpf_plan: ""},
    wsm: {hrinfo_id: "373", fullname: "Samoa", shortname: "Samoa", cbpf_plan: ""},
    yem: {hrinfo_id: "75", fullname: "Yemen", shortname: "Yemen", hrinfo_op: true, cbpf_plan: "YEM64"},
    zaf: {hrinfo_id: "387", fullname: "South Africa", shortname: "South Africa", cbpf_plan: ""},
    zmb: {hrinfo_id: "429", fullname: "Zambia", shortname: "Zambia", cbpf_plan: ""},
    zwe: {hrinfo_id: "60", fullname: "Zimbabwe", shortname: "Zimbabwe", hrinfo_op: true, cbpf_plan: ""}
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
            "desnutrici�n aguda",
            "desnutrici�n cr�nica",
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
        this.hrinfo_events_url = this.create_hrinfo_events_query();
        this.hdx_datasets_url = this.create_hdx_datasets_query();
        this.reliefweb_allreports_url = this.create_reliefweb_reports_query();
        this.reliefweb_sitreps_url = this.create_reliefweb_reports_query(10);
        this.fts_plans_url = this.create_fts_plans_query(10);
        this.cbpf_funds_url = this.create_cbpf_funds_query();
    }

    create_hrinfo_events_query() {
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
        return url;
    }

    create_fts_plans_query() {
        // SAMPLE: https://api.hpc.tools/v1/public/plan/country/afg
        var api_parameters = {};
        api_parameters.base_url = "https://api.hpc.tools/v1/public/";
        api_parameters.endpoint = "plan/country/";
        var url = api_parameters.base_url + api_parameters.endpoint + this.country_iso3;
        return url;
    }

    create_cbpf_funds_query() {
        // SAMPLE: https://cbpfapi.unocha.org/vo1/odata/ProjectSummary?poolfundAbbrv=DRC24
        var api_parameters = {};
        api_parameters.base_url = "https://cbpfapi.unocha.org/vo1/odata/";
        api_parameters.endpoint = "ProjectSummary";
        var url = null;
        if (this.country_iso3 && (country_table[this.country_iso3].cbpf_plan !== ""))
        {
            var cbpf_plan = country_table[this.country_iso3].cbpf_plan;
            if (cbpf_plan !== null)
                var url = api_parameters.base_url +
                        api_parameters.endpoint +
                        "?poolfundAbbrv=" + cbpf_plan;
        }
        return url;
    }

    create_hdx_datasets_query() {
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

    create_reliefweb_reports_query(format) {
        var api_parameters = {};
        api_parameters.base_url = "https://api.reliefweb.int/v1/";
        api_parameters.endpoint = "reports";
        api_parameters.appname = "api-agg-demo";
        api_parameters.limit = config.number_items;
        api_parameters.include = "fields[include][]=body&fields[include][]=date.created&fields[include][]=source&fields[include][]=file&fields[include][]=url_alias";
        api_parameters.sort = "date:desc";
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
                "&sort=" + api_parameters.sort +
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
    if (country_iso3)
        title = country_table[country_iso3].fullname;
    else
        title = "All Countries";
    if (theme)
        title += " - " + element_clicked.innerText;
    title_block.innerText = title;
    /* Create the generic query */

    query_object = new query_builder(country_iso3, theme /*theme*/);
    /* List of countries */
    call_url = "https://vocabulary.unocha.org/json/beta-v3/countries.json";
    const element_countries = "countries";
    sendRequest(call_url, null, null, element_countries, plot_country_menu);
    // TODO: Remove title from the plot_XXX functions

    var display_block_id = null;
    /** Reliefweb - All reports */
    call_url = query_object.reliefweb_allreports_url;
    display_block_id = "latest-reports";
    sendRequest(call_url, "All Reports", "RW API All Reports", display_block_id, plot_reliefweb_reports);
    /** Reliefweb - Sitaution reports **/
    call_url = query_object.reliefweb_sitreps_url;
    display_block_id = "latest-sitreps";
    sendRequest(call_url, "All Situation Reports", "RW API SitReps", display_block_id, plot_reliefweb_reports);
    /** HDX Datasets **/
    call_url = query_object.hdx_datasets_url;
    display_block_id = "hdx-datasets";
    sendRequest(call_url, "Latests HDX Datasets", "HDX Datasets API", display_block_id, plot_hdx_datasets);
    /** HRinfo Events **/
    call_url = query_object.hrinfo_events_url;
    display_block_id = "hrinfo-events";
    sendRequest(call_url, "Next HRinfo events", "HRINFO Events API", display_block_id, plot_hrinfo_events);
    /* Reliefweb figures */
    call_url = "https://raw.githubusercontent.com/reliefweb/crisis-app-data/v2/edition/hdx/main.json";
    display_block_id = "reliefweb-figures";
    sendRequest(call_url, "Latest Reliefweb Figures", "RW Figures Dataset", display_block_id, plot_reliefweb_figures);
    /* FTS Plans */
    call_url = query_object.fts_plans_url;
    display_block_id = "fts-plans";
    sendRequest(call_url, "FTS Plans", "FTS Plans API", display_block_id, plot_fts_plans);
    /* CBPF FUND */
    call_url = query_object.cbpf_funds_url;
    display_block_id = "cbpf-funds";
    console.log(call_url);
    sendRequest(call_url, "CBPF Funds - draft", "CBPF Funds API", display_block_id, plot_cbpf_funds);

}

/* API CALLS */

function sendRequest(api_url, title, more_text, element, callback) {

    var data = {};
    if (api_url) {
        var request = new XMLHttpRequest();
        request.open('GET', api_url, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                data = JSON.parse(this.response);
            }
            callback(data, api_url, title, more_text, element);
        };
        request.send();
    } else {
        callback(data, api_url, title, more_text, element);
    }

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

        this.date = formatDate(event.date[0].value) + " - " + formatDate(event.date[0].value2);
        // TODO: Only first date of the event

        if (event.organizations[0])
            this.source = event.organizations[0].label;
        else
            this.source = "";
        this.link = event.url;
    }

    normalize_fts_plan(plan) {
        this.title = plan.planVersion.name;
        this.value = formatNumber(plan.revisedRequirements) + " USD";
        this.date = formatDate(plan.planVersion.endDate);
        this.link = "https://fts.unocha.org/appeals/" + plan.id + "/summary";
    }

    normalize_cbpf_fund(fund) {
        this.title = fund.PooledFundName;
        this.value = formatNumber(fund.PaidAmtLocal) + " " + fund.PaidAmtLocalCurrency +
                " of " + formatNumber(fund.PledgeAmtLocal) + " " + fund.PledgeAmtLocalCurrency;
        this.date = fund.AllocationYear;
        this.link = "https://pfbi.unocha.org/allocations-overview.html";
    }

    normalize_reliefweb_report(report) {
        this.link = report.fields.url_alias;
        this.title = report.fields.title;
        if (report.fields.body) {
            this.description = report.fields.body;
            this.short_description = report.fields.body.substring(0, 300);
            this.short_description = `${this.short_description}...`;
        }

        this.date = formatDate(report.fields.date.created);
        this.source = report.fields.source[0].shortname;
        // TODO: only first source
        if (report.fields.file && report.fields.file.length > 0 && report.fields.file[0].preview) {
            this.image = report.fields.file[0].preview["url-small"];
        }
    }

    normalize_country(country) {
        if (country.iso3) {
            this.link = "?country=" + country.iso3.toLowerCase();
            this.title = country.label["english-short"];
        }
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
        this.date = formatDate(dataset.dataset_date);
        this.source = dataset.organization.name;
        // TODO: only first source
    }

    normalize_reliefweb_figure(figure)
    {
        this.link = figure.url;
        this.title = figure.name;
        this.value = formatNumber(figure.value);
        this.date = formatDate(figure.date);
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

class resultset {
    constructor(data, title, more_text, url) {
        this.title = title;
        this.more_url = url;
        this.more_text = more_text;

        this.original_data = data;
        this.data = [];
    }

    normalize_countries() {
        // it is the only one not affected by number of items limit
        this.original_data = this.original_data.data;
        for (var i = 0; i < this.original_data.length; i++) {
            var item_original = this.original_data[i];
            var item = new plotable_object();
            item.normalize_country(item_original);
            if (item.title !== "")
                this.data.push(item);
        }
    }

    normalize_fts_plans() {
        this.original_data = this.original_data.data;
        // not limited to the number_items limit

        function compare(a, b) {
            if (a.planVersion.endDate < b.planVersion.endDate) {
                return 1;
            }
            if (a.planVersion.endDate > b.planVersion.endDate) {
                return -1;
            }
            return 0;
        }
        this.original_data.sort(compare);

        for (var i = 0; i < 1 && i < this.original_data.length; i++) {
            // TODO: Only add plan if endDate is more than today -- and remove the only "1" from the loop
            var item_original = this.original_data[i];
            var item = new plotable_object();
            item.normalize_fts_plan(item_original);
            this.data.push(item);
        }
    }

    normalize_cbpf_funds() {
        if (this.original_data.length > 0) {
            this.original_data = this.original_data.value;
            // not limited to the number_items limit

            // TODO: These dates don't work
            // Plan structure changes with years??
            function compare(a, b) {
                if (a.AllocationYear > b.AllocationYear) {
                    return 1;
                }
                if (a.AllocationYear < b.AllocationYear) {
                    return -1;
                }
                return 0;
            }
            this.original_data.sort(compare);
            for (var i = 0; i < config.number_items && i < this.original_data.length; i++) {
                // TODO: Displaying all the data
                var item_original = this.original_data[i];
                var item = new plotable_object();
                item.normalize_cbpf_fund(item_original);
                this.data.push(item);
            }
        }
    }

    normalize_reliefweb_reports() {
        this.original_data = this.original_data.data;
        for (var i = 0; i < config.number_items && i < this.original_data.length; i++) {
            var item_original = this.original_data[i];
            var item = new plotable_object();
            item.normalize_reliefweb_report(item_original);
            this.data.push(item);
        }
    }

    normalize_hdx_datasets() {
        this.original_data = this.original_data.result.results;
        for (var i = 0; i < config.number_items && i < this.original_data.length; i++) {
            var item_original = this.original_data[i];
            var item = new plotable_object();
            item.normalize_hdx_dataset(item_original);
            this.data.push(item);
        }
    }

    normalize_hrinfo_events() {
        this.original_data = this.original_data.data;
        for (var i = 0; i < config.number_items && i < this.original_data.length; i++) {
            var item_original = this.original_data[i];
            var item = new plotable_object();
            item.normalize_hrinfo_event(item_original);
            this.data.push(item);
        }
    }

    normalize_reliefweb_figures() {

        function compare(a, b) {
            if (a.date < b.date) {
                return 1;
            }
            if (a.date > b.date) {
                return -1;
            }
            return 0;
        }

        var found = this.original_data.find(function (element) {
            return (element.iso3.toLowerCase() === country_iso3);
        });
        if (found) {
            var country_figures = found.figures;
            // order figures by date
            country_figures.sort(compare);
            for (var i = 0; i < config.number_items && i < country_figures.length; i++) {
                var item_original = country_figures[i];
                var item = new plotable_object();
                item.normalize_reliefweb_figure(item_original);
                this.data.push(item);
            }
        }
    }

    plot_no_results(element)
    {
        var area = document.getElementById(element);
        const p = document.createElement('p');
        p.innerText = "No results found";
        area.appendChild(p);
    }

    plot_header(element) {
        var display_area = document.getElementById(element);
        // clean display area
        while (display_area.firstChild)
            display_area.removeChild(display_area.firstChild);
        const h2 = document.createElement('h2');
        h2.innerText = this.title;
        display_area.appendChild(h2);
    }

    plot_footer(element) {
        var display_area = document.getElementById(element);
        var more_link = document.createElement('a');
        more_link.setAttribute('href', this.more_url);
        more_link.innerText = this.more_text;
        display_area.appendChild(more_link);
    }

    plot_block(element) {
        this.plot_header(element);
        if (this.data.length > 0) {
            for (var i = 0; i < this.data.length; i++) {
                var plotable_item = this.data[i];
                plotable_item.plot(element);
            }
            this.plot_footer(element);
        } else {
            this.plot_no_results(element);
        }
    }
}

function plot_hrinfo_events(data, api_url, title, more_text, element) {
    results = new resultset(data, title, more_text, api_url);
    results.normalize_hrinfo_events();
    results.plot_block(element);
}

function plot_fts_plans(data, api_url, title, more_text, element) {
    results = new resultset(data, title, more_text, api_url);
    results.normalize_fts_plans();
    results.plot_block(element);
}

function plot_cbpf_funds(data, api_url, title, more_text, element) {
    results = new resultset(data, title, more_text, api_url);
    results.normalize_cbpf_funds();
    results.plot_block(element);
}

function plot_country_menu(data, api_url, title, more_text, element) {
    results = new resultset(data, title, more_text, api_url);
    results.normalize_countries();
    results.plot_block(element);
}

function plot_hdx_datasets(data, api_url, title, more_text, element) {
    results = new resultset(data, title, more_text, api_url);
    results.normalize_hdx_datasets();
    results.plot_block(element);
}

function plot_reliefweb_reports(data, api_url, title, more_text, element) {
    results = new resultset(data, title, more_text, api_url);
    results.normalize_reliefweb_reports();
    results.plot_block(element);
}

function plot_reliefweb_figures(data, api_url, title, more_text, element) {
    results = new resultset(data, title, more_text, api_url);
    results.normalize_reliefweb_figures();
    results.plot_block(element);
}



/* MAIN CALL */


refresh_page();
