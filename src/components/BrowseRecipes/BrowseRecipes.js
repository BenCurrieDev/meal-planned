import { useSelector } from "react-redux";
import { selectCache } from "../../features/apiCalls/cachedSearchSlice";
import { useState } from "react";
import BrowseCard from "../BrowseCard/BrowseCard";
import SearchParams from "../SearchParams/SearchParams";



const BrowseRecipes = () => {
    const [showOther, setShowOther] = useState(false);
    const [query, setQuery] = useState('');
    const [diet, setDiet] = useState([]);
    const [intolerances, setIntolerances] = useState([]);
    const [maxReadyTime, setMaxReadyTime] = useState(0);
    const [disableSearch, setDisableSearch] = useState(true);
    const cache = useSelector(selectCache);
    
    return (
        <>
          <div>
            <SearchParams 
              showOther={showOther} setShowOther={setShowOther} 
              query={query} setQuery={setQuery} 
              diet={diet} setDiet={setDiet} 
              intolerances={intolerances} setIntolerances={setIntolerances} 
              maxReadyTime={maxReadyTime} setMaxReadyTime={setMaxReadyTime} 
              disableSearch={disableSearch} setDisableSearch={setDisableSearch} 
            />
          </div>
          <div>
            {cache.results.map((obj, index) => <BrowseCard key={index} searchResult={obj} />)}
          </div>
        </>
    )
}

export default BrowseRecipes;