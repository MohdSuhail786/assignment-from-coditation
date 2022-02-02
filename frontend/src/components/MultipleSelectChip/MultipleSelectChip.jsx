import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";

export default function MultipleSelectChip({label,value,options,handleChange,disabled}) {

    return (
        <>
         <FormControl fullWidth>
            <InputLabel id="multiple-chip-label">{label}</InputLabel>
            <Select
                labelId="multiple-chip-label"
                id="multiple-chip"       
                disabled={disabled}
                multiple
                value={value}
                onChange={handleChange}
                input={<OutlinedInput id='select-multiple-chip' label={label} />}
                renderValue={selected => {
                    return <Box sx={{display:'flex',flexWrap:'wrap',gap:0.5}}>
                        {selected.map((value) => (
                            <Chip key={value._id} label={value.name} />
                        ))}
                    </Box>
                }}    
                >
                    {options.map((c,k)=>{
                        return <MenuItem
                            key={c._id+'1'}
                            value={c}
                        >
                            {c.name}
                        </MenuItem>
                    })}
                </Select>
                </FormControl>
        </>
    )
}