const constructorHelper = {
    orderJsonObject(properties) {
        let sortedProperties = {}
        let propsArray = Object.entries(properties).sort((a, b) => a[1].order > b[1].order ? 1 : -1)
        propsArray.forEach(element => {
            sortedProperties[element[0]] = element[1]
        });
        
        return sortedProperties
    },
    parseDetailtype(detailtype) {
        if (detailtype) {
            let parsedDetailtypeData
            if (typeof detailtype.data === "string") {
                parsedDetailtypeData = JSON.parse(detailtype.data);
            } else {
                parsedDetailtypeData = detailtype.data
            }
            parsedDetailtypeData.properties = this.orderJsonObject(
                parsedDetailtypeData.properties
            );
            detailtype.data = parsedDetailtypeData;

            return detailtype
        }

        return null
    }, 
}

export default constructorHelper;