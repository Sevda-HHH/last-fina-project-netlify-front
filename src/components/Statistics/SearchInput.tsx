import { TextField } from '@material-ui/core'
import { ChangeEvent } from 'react'
interface IProps {
    searchInput: string,
    handleChangeSearchInput: (evt: ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput: React.FC<IProps> = ({ searchInput, handleChangeSearchInput }) => {
    return (
        <form action="">
            <TextField
                value={searchInput}
                onChange={handleChangeSearchInput}
                id="standard-basic"
                label="Search for a Country" />
        </form>
    )
}
