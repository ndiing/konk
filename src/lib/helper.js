const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const TAC = [
    { tac: "01124500", manufacturer: "Apple", model: "", internal_model_number: "" },
    // { tac: "01130000", manufacturer: "", model: "", internal_model_number: "" },
    { tac: "01136400", manufacturer: "Apple", model: "", internal_model_number: "" },
    { tac: "01154600", manufacturer: "Apple", model: "iPhone", internal_model_number: "MB384LL" },
    { tac: "01161200", manufacturer: "Apple", model: "iPhone 3G", internal_model_number: "" },
    { tac: "01174400", manufacturer: "Apple", model: "iPhone 3G", internal_model_number: "MB496RS" },
    { tac: "01180800", manufacturer: "Apple", model: "iPhone 3G", internal_model_number: "MB704LL" },
    { tac: "01181200", manufacturer: "Apple", model: "iPhone 3G", internal_model_number: "MB496B" },
    { tac: "01193400", manufacturer: "Apple", model: "iPhone 3G", internal_model_number: "" },
    { tac: "01194800", manufacturer: "Apple", model: "iPhone 3GS", internal_model_number: "" },
    { tac: "01215800", manufacturer: "Apple", model: "iPhone 3GS", internal_model_number: "" },
    { tac: "01215900", manufacturer: "Apple", model: "iPhone 3GS", internal_model_number: "MC131B" },
    { tac: "01216100", manufacturer: "Apple", model: "iPhone 3GS", internal_model_number: "" },
    { tac: "01226800", manufacturer: "Apple", model: "iPhone 3GS", internal_model_number: "" },
    { tac: "01233600", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "MC608LL" },
    { tac: "01233700", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "MC603B" },
    { tac: "01233800", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "MC610LL" },
    { tac: "01241700", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "" },
    { tac: "01242000", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "" },
    { tac: "01243000", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "MC603KS" },
    { tac: "01253600", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "MC610LL/A" },
    { tac: "01254200", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "" },
    { tac: "01300600", manufacturer: "Apple", model: "iPhone 4S", internal_model_number: "MD260C" },
    // { tac: "01326300", manufacturer: "Apple", model: "iPhone 4", internal_model_number: "MD198HN/A" },
    { tac: "01332700", manufacturer: "Apple", model: "iPhone 5", internal_model_number: "MD642C" },
    { tac: "01388300", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "ME297C/A" },
    { tac: "35875105", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35875205", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35875305", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35875405", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35875505", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35875605", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35875705", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35875805", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35875905", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35876005", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35880005", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1507" },
    { tac: "35880105", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1507" },
    { tac: "35880205", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1507" },
    { tac: "35880305", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1507" },
    { tac: "35880405", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1507" },
    { tac: "35880505", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35880605", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35880705", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35951406", manufacturer: "Samsung", model: "Galaxy Tab E", internal_model_number: "SM-T5613474" },
    { tac: "35880805", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35880905", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1453" },
    { tac: "35881005", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35881105", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35881205", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35881305", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35881405", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1533" },
    { tac: "35881505", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1456" },
    { tac: "35881605", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1456" },
    { tac: "35881705", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1456" },
    { tac: "35881805", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1456" },
    { tac: "35881905", manufacturer: "Apple", model: "iPhone 5C", internal_model_number: "A1456" },
    { tac: "35201906", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1457" },
    { tac: "35925406", manufacturer: "Apple", model: "iPhone 6", internal_model_number: "A1549" },
    { tac: "35438506", manufacturer: "Apple", model: "iPhone 6", internal_model_number: "A1522" },
    { tac: "35325807", manufacturer: "Apple", model: "iPhone A86s", internal_model_number: "A1633" },
    { tac: "35299209", manufacturer: "Apple", model: "iPhone 8", internal_model_number: "A1905" },
    // { "tac": "350151", "manufacturer": "Nokia", "model": "3330", "internal_model_number": "" },
    { tac: "35705623", manufacturer: "Nokia", model: "FastMile 5G Gateway 3.2", internal_model_number: "5G15-12W" },
    { tac: "35089080", manufacturer: "Nokia", model: "3410", internal_model_number: "NHM-2NX" },
    { tac: "35099480", manufacturer: "Nokia", model: "3410", internal_model_number: "NHM-2NX" },
    { tac: "35148420", manufacturer: "Nokia", model: "3410", internal_model_number: "NHM-2NX" },
    { tac: "35148820", manufacturer: "Nokia", model: "6310i", internal_model_number: "NPL-1" },
    { tac: "35151304", manufacturer: "Nokia", model: "E72-1", internal_model_number: "RM-530" },
    { tac: "35154900", manufacturer: "Nokia", model: "6310i", internal_model_number: "NPL-1" },
    { tac: "35171005", manufacturer: "Sony Ericsson", model: "Xperia S", internal_model_number: "" },
    { tac: "35174605", manufacturer: "Google", model: "Galaxy Nexus", internal_model_number: "Samsung GT-I9250, Samsung GT-I9250TSGGEN" },
    { tac: "35191405", manufacturer: "Motorola", model: "Defy Mini", internal_model_number: "" },
    { tac: "35226005", manufacturer: "Samsung", model: "Galaxy SIII", internal_model_number: "" },
    { tac: "35044670", manufacturer: "Siemens", model: "A50", internal_model_number: "" },
    { tac: "35238402", manufacturer: "Sony Ericsson", model: "K770i", internal_model_number: "" },
    { tac: "35274901", manufacturer: "Nokia", model: "6233", internal_model_number: "" },
    { tac: "35291402", manufacturer: "Nokia", model: "6210 Navigator", internal_model_number: "" },
    { tac: "35316004", manufacturer: "ZTE", model: "Blade", internal_model_number: "" },
    { tac: "35316605", manufacturer: "Samsung", model: "Galaxy S3", internal_model_number: "GT-I9300" },
    { tac: "35332705", manufacturer: "Samsung", model: "Galaxy SII", internal_model_number: "GT-I9100" },
    { tac: "35328504", manufacturer: "Samsung", model: "Galaxy S", internal_model_number: "GT-I9000" },
    { tac: "32930400", manufacturer: "Samsung", model: "Galaxy S7", internal_model_number: "" },
    { tac: "35351200", manufacturer: "Motorola", model: "V300", internal_model_number: "" },
    { tac: "35357800", manufacturer: "Samsung", model: "SGH-A800", internal_model_number: "" },
    { tac: "35376800", manufacturer: "Nokia", model: "6230", internal_model_number: "" },
    { tac: "35391805", manufacturer: "Google", model: "Nexus 4", internal_model_number: "LG E960" },
    { tac: "35405600", manufacturer: "Wavecom", model: "M1306B", internal_model_number: "" },
    { tac: "35421803", manufacturer: "Nokia", model: "5310", internal_model_number: "RM-303" },
    { tac: "35433004", manufacturer: "Nokia", model: "C5-00", internal_model_number: "RM-645" },
    { tac: "35450502", manufacturer: "GlobeTrotter", model: "HSDPA Modem", internal_model_number: "" },
    { tac: "35511405", manufacturer: "Sony Ericsson", model: "Xperia U", internal_model_number: "" },
    { tac: "35524803", manufacturer: "Nokia", model: "2330C-2", internal_model_number: "RM-512" },
    { tac: "35566600", manufacturer: "Nokia", model: "6230", internal_model_number: "" },
    { tac: "35569500", manufacturer: "Nokia", model: "1100", internal_model_number: "" },
    { tac: "35679404", manufacturer: "Samsung", model: "Galaxy Mini", internal_model_number: "GT-S5570" },
    { tac: "35685702", manufacturer: "Nokia", model: "6300", internal_model_number: "" },
    { tac: "35693803", manufacturer: "Nokia", model: "N900", internal_model_number: "" },
    { tac: "35694603", manufacturer: "Nokia", model: "2700", internal_model_number: "" },
    { tac: "35699601", manufacturer: "Nokia", model: "N95", internal_model_number: "" },
    { tac: "35700804", manufacturer: "Nokia", model: "C1", internal_model_number: "" },
    { tac: "35714904", manufacturer: "Huawei", model: "E398U-15 LTE Stick", internal_model_number: "" },
    { tac: "35733104", manufacturer: "Samsung", model: "Galaxy Gio", internal_model_number: "" },
    { tac: "35739804", manufacturer: "Nokia", model: "N8", internal_model_number: "" },
    { tac: "35744105", manufacturer: "Samsung", model: "Galaxy S4", internal_model_number: "GT-I9505" },
    { tac: "35765206", manufacturer: "Sony", model: "Xperia Z3 Compact", internal_model_number: "D5803" },
    { tac: "35788104", manufacturer: "Nokia", model: "N950", internal_model_number: "" },
    { tac: "35803106", manufacturer: "HTC", model: "HTC One M8s", internal_model_number: "" },
    { tac: "35824005", manufacturer: "Google", model: "Nexus 5", internal_model_number: "LG D820/D821" },
    { tac: "35828103", manufacturer: "Nokia", model: "6303C", internal_model_number: "" },
    { tac: "35836800", manufacturer: "Nokia", model: "6230i", internal_model_number: "" },
    { tac: "35837501", manufacturer: "XDA", model: "Orbit 2", internal_model_number: "" },
    { tac: "35837800", manufacturer: "Nokia", model: "N6030", internal_model_number: "RM-74" },
    { tac: "35838706", manufacturer: "LG", model: "G Stylo", internal_model_number: "LG-H631" },
    { tac: "35850000", manufacturer: "Nokia", model: "Lumia 720", internal_model_number: "" },
    { tac: "35851004", manufacturer: "Sony Ericsson", model: "Xperia Active", internal_model_number: "" },
    { tac: "35853704", manufacturer: "Samsung", model: "Galaxy SII", internal_model_number: "" },
    { tac: "35869205", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "MF353TA/A" },
    { tac: "35876105", manufacturer: "Apple", model: "iPhone 5S", internal_model_number: "A1457" },
    { tac: "35896704", manufacturer: "HTC", model: "Desire S", internal_model_number: "" },
    { tac: "35902803", manufacturer: "HTC", model: "Wildfire", internal_model_number: "" },
    { tac: "35903908", manufacturer: "Samsung", model: "Galaxy S8", internal_model_number: "SM-G950F" },
    { tac: "35909205", manufacturer: "Samsung", model: "Galaxy Note III", internal_model_number: "SM-N9000, SM-N9005, SM-N900" },
    { tac: "35918804", manufacturer: "HTC", model: "One X", internal_model_number: "" },
    { tac: "35920605", manufacturer: "Nokia", model: "Lumia 625", internal_model_number: "" },
    { tac: "35447909", manufacturer: "Nokia", model: "Nokia 1", internal_model_number: "TA-1079" },
    { tac: "35604008", manufacturer: "Nokia", model: "Nokia 2", internal_model_number: "TA-1023" },
    { tac: "35602508", manufacturer: "Nokia", model: "Nokia 5", internal_model_number: "TA-1027" },
    { tac: "35929005", manufacturer: "Motorola", model: "Moto G", internal_model_number: "XT1039" },
    { tac: "35933005", manufacturer: "OROD", model: "6468", internal_model_number: "" },
    { tac: "35935003", manufacturer: "Nokia", model: "2720A-2", internal_model_number: "RM-519" },
    { tac: "35972100", manufacturer: "Lobster", model: "544", internal_model_number: "" },
    { tac: "35974101", manufacturer: "GlobeTrotter", model: "HSDPA Modem", internal_model_number: "" },
    { tac: "35979504", manufacturer: "Samsung", model: "Galaxy Note", internal_model_number: "" },
    // { "tac": "449337", "manufacturer": "Nokia", "model": "6210", "internal_model_number": "" },
    { tac: "86107402", manufacturer: "Quectel", model: "Queclink GV200", internal_model_number: "" },
    { tac: "86217001", manufacturer: "Quectel", model: "Queclink GV200", internal_model_number: "" },
    { tac: "86723902", manufacturer: "ZTE Corporation", model: "Rook from EE, Orange Dive 30, Blade A410", internal_model_number: "" },
    { tac: "86813001", manufacturer: "Jiayu", model: "G3S", internal_model_number: "JY-G3" },
    // { tac: "00000000", manufacturer: "N/A", model: "typical fake TAC codes, usually in software damaged phones", internal_model_number: "" },
    // { tac: "01234567", manufacturer: "N/A", model: "typical fake TAC codes, usually in software damaged phones", internal_model_number: "" },
    // { tac: "12345678", manufacturer: "N/A", model: "typical fake TAC codes, usually in software damaged phones", internal_model_number: "" },
    // { tac: "13579024", manufacturer: "N/A", model: "typical fake TAC codes, usually in software damaged phones", internal_model_number: "" },
    // { tac: "88888888", manufacturer: "N/A", model: "typical fake TAC codes, usually in software damaged phones", internal_model_number: "" },
    { tac: "01333200", manufacturer: "Apple", model: "iPhone 5", internal_model_number: "" },
    { tac: "99000481", manufacturer: "Samsung", model: "Galaxy note 4 GM-N910V", internal_model_number: "" },
    { tac: "35808005", manufacturer: "Sony", model: "Sony C6833 - XPERIA Z ULTRA", internal_model_number: "" },
    { tac: "35815207", manufacturer: "Samsung", model: "Samsung S7", internal_model_number: "" },
    { tac: "35415808", manufacturer: "Samsung", model: "Samsung J7 Prime" },
    { tac: "35664906", manufacturer: "Samsung", model: "Xcover 271", internal_model_number: "GT-B2710" },
    { tac: "35330509", manufacturer: "Samsung", model: "Galaxy S9", internal_model_number: "SM-G960U" },
    { tac: "35326907", manufacturer: "Apple", model: "iPhone 6s", internal_model_number: "A1688" },
    { tac: "35197310", manufacturer: "irisguard", model: "EyePay Phone" },
    { tac: "35664906", manufacturer: "Samsung", model: "Xcover 271", internal_model_number: "GT-B2710" },
    { tac: "35314409", manufacturer: "Go Mobile", model: "GO Onyx LTE", internal_model_number: "GO1004" },
    { tac: "86092103", manufacturer: "Huawei", model: "P9 Lite 2016", internal_model_number: "" },
    { tac: "35293708", manufacturer: "Samsung", model: "Galaxy A5 2016", internal_model_number: "SM-A510F" },
    { tac: "35684610", manufacturer: "Samsung", model: "Galaxy Fold 5G", internal_model_number: "" },
    { tac: "01459300", manufacturer: "WondaLink", model: "T-Mobile LineLink", internal_model_number: "ML700" },
    { tac: "86881303", manufacturer: "Xiaomi", model: "Redmi Note 5", internal_model_number: "" },
    { tac: "35620409", manufacturer: "Samsung", model: "Galaxy J7 2017", internal_model_number: "" },
    { tac: "35253108", manufacturer: "Google", model: "Google Pixel", internal_model_number: "" },
    { tac: "35803408", manufacturer: "Google", model: "Google Pixel 2 XL (Verizon", internal_model_number: "G011C" },
    { tac: "35803508", manufacturer: "Google", model: "Google Pixel 2 XL (Unlocked", internal_model_number: "G011C" },
    { tac: "35964309", manufacturer: "Google", model: "Google Pixel 3a XL", internal_model_number: "" },
    { tac: "35751110", manufacturer: "Google", model: "Google Pixel 4a", internal_model_number: "" },
    { tac: "35751310", manufacturer: "Google", model: "Google Pixel 4a", internal_model_number: "" },
    { tac: "86551004", manufacturer: "OnePlus", model: "OnePlus 7 Pro (T-Mobile", internal_model_number: "GM1915" },
];

function read(file, data = {}) {
    try {
        data = fs.readFileSync(file);
        if (file.includes(".gz")) {
            data = zlib.gunzipSync(data);
        }
        if (file.includes(".json")) {
            data = JSON.parse(data);
        } else {
            data = data.toString();
        }
    } catch (error) {
        write(file, data);
    }
    return data;
}

function write(file, data) {
    const dir = path.dirname(file);
    try {
        fs.readdirSync(dir);
    } catch (error) {
        fs.mkdirSync(dir, {
            recursive: true,
        });
    }

    if (file.includes(".json")) {
        data = JSON.stringify(data);
    }
    if (file.includes(".gz")) {
        data = zlib.gzipSync(data);
    }
    fs.writeFileSync(file, data);
}

function toPascalCase(string) {
    return string
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .replace(/(^| )([a-zA-Z])/g, ($, $1, $2) => $2.toUpperCase())
        .replace(/[^a-zA-Z0-9]+$/, "");
}
function toCamelCase(string) {
    return string
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .replace(/(^| )([a-zA-Z])/g, ($, $1, $2, i) => (i == 0 ? $2.toLowerCase() : $2.toUpperCase()))
        .replace(/[^a-zA-Z0-9]+$/, "");
}
function toKebabCase(string) {
    return string
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "")
        .toLowerCase();
}
function toSnakeCase(string) {
    return string
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[^a-zA-Z0-9]+/g, "_")
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "")
        .toLowerCase();
}
function toTitleCase(string) {
    return string
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .replace(/(^| )([a-zA-Z])/g, ($, $1, $2) => $1 + $2.toUpperCase())
        .replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
}

function parseTable(response) {
    return Array.from(response.matchAll(/<table[^>]*>([\s\S]*?)<\/table>/g), ([, table]) => {
        return Array.from(table.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g), ([, tr]) => {
            return Array.from(tr.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g), ([, td]) => {
                return td.replace(/<\/?[^>]*>/g, "").replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
            });
        });
    });
}
function parseList(response) {
    return Array.from(response.matchAll(/<[ou]l[^>]*>([\s\S]*?)<\/[ou]l>/g), ([, ul]) => {
        return Array.from(ul.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g), ([, li]) => {
            return li.replace(/<\/?[^>]*>/g, "").replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "");
        });
    });
}
function parseAttribute(attribute, init = {}) {
    return Array.from(attribute.matchAll(/([^= ]*)="([^"]*)"/g)).reduce((p, c) => {
        let [, name, value] = c;
        p[name] = value;
        return p;
    }, init);
}
function parseSelect(response) {
    return Array.from(response.matchAll(/<select([^>]*)>([\s\S]*?)<\/select>/g), ([, attribute, select]) => {
        return parseAttribute(attribute, {
            options: Array.from(select.matchAll(/<option([^>]*)>(([\s\S]*?)<\/option>)?/g), ([, attribute, , option]) => {
                return parseAttribute(attribute, {
                    label: option.replace(/<\/?[^>]*>/g, "").replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, ""),
                });
            }),
        });
    });
}
function parseTextarea(response) {
    return Array.from(response.matchAll(/<textarea([^>]*)>([\s\S]*?)<\/textarea>/g), ([, attribute, textarea]) => {
        return parseAttribute(attribute, {
            value: textarea.replace(/<\/?[^>]*>/g, "").replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, ""),
        });
    });
}
function parseInput(response) {
    return Array.from(response.matchAll(/<input([^>]*)\/?>/g), ([, attribute, input]) => {
        return parseAttribute(attribute);
    });
}
function parseForm(response) {
    return Array.from(response.matchAll(/<form[^>]*>([\s\S]*?)<\/form>/g), ([, form]) => {
        return [].concat(parseSelect(form)).concat(parseTextarea(form)).concat(parseInput(form));
    });
}

function parseMoney(string) {
    const [, prefix, , suffix = "0"] = string.match(/^(.*?)([\,\.](\d{1,2}))?$/);
    return parseFloat(prefix.replace(/[^\d]/g, "") + ("." + suffix));
}

function parsePhone(string, prefix = "", suffix = "") {
    return prefix + string.match(/^\+?(0|62)(\d+)/)[2] + suffix;
}

function arrayTable(array, converter = {}, defaultConverter = (value) => value) {
    let columns = array[0];
    let rows = array.slice(1);
    return rows.reduce((p, c) => {
        let cc = columns.reduce((pp, cc, ii) => {
            let name = toSnakeCase(cc);
            let value = c[ii];
            pp[name] = (converter[name] || defaultConverter)(value);
            return pp;
        }, {});
        p.push(cc);
        return p;
    }, []);
}
function objectTable(array, converter = {}, defaultConverter = (value) => value) {
    return array.reduce((p, c) => {
        let [name, ...values] = c;
        name = toSnakeCase(name);
        let value = values[values.length - 1];
        p[name] = (converter[name] || defaultConverter)(value);
        return p;
    }, {});
}

function randomUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function randomIMEI() {
    let tacData = TAC;
    const randomTAC = tacData[Math.floor(Math.random() * tacData.length)];
    const serialNumber = Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0");
    let imei = randomTAC.tac + serialNumber;
    let luhnSum = 0;
    let isEven = true;
    for (let i = imei.length - 1; i >= 0; i--) {
        let digit = parseInt(imei.charAt(i), 10);
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        luhnSum += digit;
        isEven = !isEven;
    }
    let checkDigit = (10 - (luhnSum % 10)) % 10;
    imei += checkDigit;
    return imei;
}

function getChromePath() {
    const dirPath = [process.env.LOCALAPPDATA, process.env.ProgramFiles, process.env["ProgramFiles(x86)"]];
    const basePath = ["/Google/Chrome/Application/chrome.exe", "/Google/Chrome Beta/Application/chrome.exe", "/Google/Chrome SxS/Application/chrome.exe", "/Chromium/Application/chrome.exe"];
    for (const dir of dirPath) {
        for (const base of basePath) {
            try {
                const file = path.join(dir, base);
                fs.accessSync(file);
                return file;
            } catch (error) {}
        }
    }
    return null;
}

module.exports = {
    read,
    write,

    toPascalCase,
    toCamelCase,
    toKebabCase,
    toSnakeCase,
    toTitleCase,

    parseTable,
    parseList,
    parseAttribute,
    parseSelect,
    parseTextarea,
    parseInput,
    parseForm,

    parseMoney,
    parsePhone,

    arrayTable,
    objectTable,

    randomUUID,
    randomIMEI,

    getChromePath,
};

// console.log(getChromePath());

// console.log(randomUUID());

// console.log(randomIMEI());

// var phones=[
//     '+6281935155404',
//     '081935155404',
//     '6281935155404',
//     '+6281935155404@s.whatsapp.net',
//     '081935155404@s.whatsapp.net',
//     '6281935155404@s.whatsapp.net',
// ]
// console.log(phones.map(phone=>parsePhone(phone,'62')))

// var response = `
// <table>
//     <thead>
//         <tr>
//             <th>Pariatur!</th>
//             <th>Praesentium.</th>
//             <th>Price</th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td>Vitae, quam.</td>
//             <td>Iusto, <a href="/labore">labore.</a></td>
//             <td>Rp 10.000,00</td>
//         </tr>
//         <tr>
//             <td>A, repellendus.</td>
//             <td>Labore, <a href="/iste">iste.</a></td>
//             <td>Rp 10,000.00</td>
//         </tr>
//         <tr>
//             <td>Quaerat, praesentium?</td>
//             <td>Officia, <a href="/autem">autem.</a></td>
//             <td>Rp 10.000</td>
//         </tr>
//         <tr>
//             <td>Ea, error.</td>
//             <td>Vero, <a href="/itaque">itaque!</a></td>
//             <td>Rp 10,000</td>
//         </tr>
//         <tr>
//             <td>Nam, hic.</td>
//             <td>Nemo, <a href="/explicabo">explicabo!</a></td>
//             <td>Rp 10000</td>
//         </tr>
//     </tbody>
// </table>
// <table>
//     <thead>
//         <tr>
//             <th>    Pariatur!   </th>
//             <th>    Praesentium.    </th>
//             <th>    Price   </th>
//         </tr>
//     </thead>
//     <tbody>
//         <tr>
//             <td>    Vitae,<br /> quam.    </td>
//             <td>    Iusto, <a href="/labore">labore.</a>    </td>
//             <td>    Rp 10.000,00    </td>
//         </tr>
//         <tr>
//             <td>    A,<br /> repellendus. </td>
//             <td>    Labore, <a href="/iste">iste.</a>   </td>
//             <td>    Rp 10,000.00    </td>
//         </tr>
//         <tr>
//             <td>    Quaerat,<br /> praesentium?   </td>
//             <td>    Officia, <a href="/autem">autem.</a>    </td>
//             <td>    Rp 10.000   </td>
//         </tr>
//         <tr>
//             <td>    Ea,<br /> error.  </td>
//             <td>    Vero, <a href="/itaque">itaque!</a> </td>
//             <td>    Rp 10,000   </td>
//         </tr>
//         <tr>
//             <td>    Nam,<br /> hic.   </td>
//             <td>    Nemo, <a href="/explicabo">explicabo!</a>   </td>
//             <td>    Rp 10000    </td>
//         </tr>
//     </tbody>
// </table>
// <ul>
//     <li><a href="/product/1">Lorem.</a></li>
//     <li><a href="/product/2">Beatae.</a></li>
//     <li><a href="/product/3">Architecto.</a></li>
//     <li><a href="/product/4">Quo.</a></li>
//     <li><a href="/product/5">Omnis.</a></li>
// </ul>
// <ol>
//     <li><a href="/product/1">Lorem.</a></li>
//     <li><a href="/product/2">Beatae.</a></li>
//     <li><a href="/product/3">Architecto.</a></li>
//     <li><a href="/product/4">Quo.</a></li>
//     <li><a href="/product/5">Omnis.</a></li>
// </ol>
// <form action="/form">
//     <input type="text" name="text" value="text">
//     <input type="password" name="password" value="password">
//     <textarea name="textarea" id="" cols="30" rows="10">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab, fugiat?</textarea>
//     <select name="select" id="select">
//         <option value="1">Lorem.</option>
//         <option value="2">In.</option>
//         <option value="3">Tempora?</option>
//         <option value="4">Dignissimos!</option>
//         <option value="5">Cumque.</option>
//     </select>
// </form>
// `;
// console.log(parseTable(response))
// console.log(parseList(response))
// console.log(parseSelect(response)[0])
// console.log(parseTextarea(response))
// console.log(parseInput(response))
// console.log(parseForm(response))

// console.log(arrayTable(parseTable(response)[0],{
//     price:parseMoney
// }));
// console.log(objectTable(parseTable(response)[0],{
//     pariatur:value=>value
// },parseMoney));

// var words=[
//     'PascalCasePascalCase',
//     'camelCaseCamelCase',
//     'kebab-case-kebab-case',
//     'snake-case-snake-case',
//     'Title Case Title Case',
//     '-PascalCasePascalCase',
//     '_camelCaseCamelCase',
//     ' kebab-case-kebab-case',
//     'snake-case-snake-case-',
//     'Title Case Title Case_',
//     'PascalCasePascalCase ',
// ]

// console.log(words.map(toPascalCase))
// console.log(words.map(toCamelCase))
// console.log(words.map(toKebabCase))
// console.log(words.map(toSnakeCase))
// console.log(words.map(toTitleCase))
