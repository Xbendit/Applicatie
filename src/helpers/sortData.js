function sortData (data,key,order="asc") {
    return [...data].sort((a, b) => {
        const DataA = parseFloat(a[key]);
        const DataB = parseFloat(b[key]);

        if (order === "asc") {
            return DataA - DataB
        } else if (order === "desc") {
            return DataB - DataA
        }
    });
}

export default sortData;