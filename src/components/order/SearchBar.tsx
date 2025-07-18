import React from "react";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="relative">
            <input
            type="text"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
            className="w-full p-2 pl-10 rounded shadow-sm bg-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <SearchIcon fontSize="small" />
            </span>
        </div>
    );
};

export default SearchBar;