import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export default function BasicSelect({value,options,handleChange,label}) {

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={label}
                onChange={handleChange}
                >
                {
                    options.map((v,k)=>{
                        return <MenuItem key={v._id} value={v._id}>{v.name}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}