import { Input } from "@/components/ui/input"
import { filterCapsule, setSearchTerm } from "@/features/capsules/capsuleSlice";
import { useDispatch } from "react-redux"

export function Search() {
  const dispatch = useDispatch()
  const handleSearch = (event) => {
    dispatch(filterCapsule(event.target.value));
  };
  return (
    <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
        onChange={handleSearch}
      />
    </div>
  )
}