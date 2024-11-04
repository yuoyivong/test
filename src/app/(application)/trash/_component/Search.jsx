import { SearchNormal } from "iconsax-react";

const Search = ({ data, setFilteredData, searchTerm, setSearchTerm, currentSort  }) => {
    // const handleSearch = (e) => {
    //     const value = e.target.value;
    //     setSearchTerm(value);
    //
    //     // Filter data based on the input
    //     const filtered = data.filter(item =>
    //         item?.title.toLowerCase().includes(value.toLowerCase())
    //     );
    //     setFilteredData(filtered);
    // };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter data based on the input
        let filtered = data.filter(item =>
            item?.title.toLowerCase().includes(value.toLowerCase())
        );

        // Reapply the current sort after searching
        if (currentSort) {
            switch (currentSort) {
                case 'titleAsc':
                    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case 'titleDesc':
                    filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case 'private':
                    filtered = filtered.sort((a) => (a.status === 'private' ? -1 : 1));
                    break;
                case 'public':
                    filtered = filtered.sort((a) => (a.status === 'public' ? -1 : 1));
                    break;
                default:
                    break;
            }
        }

        setFilteredData(filtered);
    };

    return (
        <div className="min-w-[200px] lg:min-w-[300px] xl:min-w-[310px] 2xl:min-w-[500px] md:min-w-[250px] text-blackUi">
            <div className="relative">
                <SearchNormal
                    size="18"
                    color="#98A2B3"
                    className="absolute left-5 top-1/2 transform -translate-y-1/2"
                />
                <input
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full h-11 rounded-lg xl:rounded-radiusBorder bg-white border border-lessBlackUi border-opacity-50 placeholder:text-lessBlackUi text-blackUi text-xs sm:text-sm xl:text-base pl-12 pr-3 transition duration-300 ease focus:outline-none focus:border-radiusBorder"
                    placeholder="Search"
                />
            </div>
        </div>
    );
};

export default Search;
