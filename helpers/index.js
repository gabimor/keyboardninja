function encodeAppName(name) {
    return name.toLowerCase().replace(new RegExp(' ', 'g'), '-');
}

function getAppIdByName(urlName, apps) {
    return apps.find(item => encodeAppName(item.name) === urlName).id
}

module.exports = {
    encodeAppName,
    getAppIdByName
}


