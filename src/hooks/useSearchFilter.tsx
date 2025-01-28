import { useEffect, useState } from 'react'

const useSearchFilter = (itemsArray = []) => {
    const [searchTerm, setSearchTerm] = useState(null)
    const [filteredData, setFilteredData] = useState(null)

    useEffect(() => {
        if (!itemsArray.length) {
            return
        }
        if (searchTerm) {
            const filteredItemsArray = itemsArray.filter((item) =>
                item.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredData(filteredItemsArray)
        } else {
            setFilteredData(itemsArray)
        }
    }, [searchTerm, itemsArray])

    return {
        searchTerm,
        setSearchTerm,
        filteredData,
    }
}

export default useSearchFilter
